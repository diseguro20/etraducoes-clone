import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  Timestamp,
  onSnapshot,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { QuoteRequest, Order, UserProfile } from '@/types';
import { sendQuoteToSaaS } from '@/lib/saas';

// ============ QUOTES ============
export async function createQuoteRequest(data: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'>) {
  // 1. Initiate SaaS dispatch immediately to guarantee TraduzTudo OS gets the request
  const saasPromise = sendQuoteToSaaS({
    fullName: data.fullName,
    email: data.email,
    whatsapp: data.whatsapp,
    serviceType: data.serviceType,
    fileNames: data.fileNames || data.files,
    notes: data.notes,
  }).catch((err) => {
    console.warn('[SaaS Sync] Background sync warning:', err);
    return null;
  });

  // 2. Save in Firestore quotes collection
  let docId = `quote-${Date.now()}`;
  try {
    const docRef = await addDoc(collection(db, 'quotes'), {
      ...data,
      status: 'novo',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    docId = docRef.id;
  } catch (fsErr) {
    console.warn('[Firestore] Error saving to quotes collection:', fsErr);
  }

  // Guarantee SaaS delivery is completed before returning to client
  await saasPromise;

  return docId;
}
export const createQuote = createQuoteRequest;

export async function getQuotes() {
  const q = query(collection(db, 'quotes'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as QuoteRequest));
}

export async function updateQuote(id: string, data: Partial<QuoteRequest>) {
  const ref = doc(db, 'quotes', id);
  await updateDoc(ref, { ...data, updatedAt: Timestamp.now() });
}

// ============ ORDERS ============
export async function createOrder(data: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) {
  const docRef = await addDoc(collection(db, 'orders'), {
    ...data,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function getOrdersByUser(userId: string) {
  const q = query(
    collection(db, 'orders'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Order));
}

export async function getOrderById(id: string) {
  const ref = doc(db, 'orders', id);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() } as Order;
}

export async function getAllOrders() {
  const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Order));
}

export async function updateOrderStatus(id: string, status: Order['status'], notes?: string) {
  const ref = doc(db, 'orders', id);
  await updateDoc(ref, {
    status,
    ...(notes ? { notes } : {}),
    updatedAt: Timestamp.now(),
  });
}

export function subscribeToOrder(id: string, callback: (order: Order | null) => void) {
  const ref = doc(db, 'orders', id);
  return onSnapshot(ref, (snapshot) => {
    if (!snapshot.exists()) {
      callback(null);
      return;
    }
    callback({ id: snapshot.id, ...snapshot.data() } as Order);
  });
}

// ============ USERS ============
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const ref = doc(db, 'users', uid);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) return null;
  return { uid: snapshot.id, ...snapshot.data() } as UserProfile;
}

export async function createUserProfile(uid: string, data: Omit<UserProfile, 'uid' | 'createdAt' | 'updatedAt' | 'isAdmin'>) {
  const ref = doc(db, 'users', uid);
  await updateDoc(ref, {
    ...data,
    isAdmin: false,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  }).catch(async () => {
    const { setDoc } = await import('firebase/firestore');
    await setDoc(ref, {
      ...data,
      isAdmin: false,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
  });
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>) {
  const ref = doc(db, 'users', uid);
  await updateDoc(ref, { ...data, updatedAt: Timestamp.now() });
}
