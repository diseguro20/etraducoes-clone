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
  setDoc,
} from 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';
import { db } from '@/lib/firebase';
import type { QuoteRequest, Order, UserProfile } from '@/types';
import { sendQuoteToSaaS } from '@/lib/saas';

// Direct connection to TraduzTudo OS (saltocash-platform-2026) for sub-second real-time sync
const saasFirebaseConfig = {
  apiKey: 'AIzaSyClkdeJ8B2qkG7n8aFrrOquQ8flBQMIpFU',
  authDomain: 'saltocash-platform-2026.firebaseapp.com',
  projectId: 'saltocash-platform-2026',
  storageBucket: 'saltocash-platform-2026.firebasestorage.app',
  messagingSenderId: '526114457881',
  appId: '1:526114457881:web:ab605cae6d2394a4ec1d88',
};

function getSaasDb() {
  try {
    const existing = getApps().find((a) => a.name === 'traduztudoSaasApp');
    const saasApp = existing || initializeApp(saasFirebaseConfig, 'traduztudoSaasApp');
    const { getFirestore } = require('firebase/firestore');
    return getFirestore(saasApp);
  } catch (err) {
    console.warn('Could not initialize direct SaaS Firebase:', err);
    return null;
  }
}

// ============ QUOTES ============
export async function createQuoteRequest(data: Omit<QuoteRequest, 'id' | 'createdAt' | 'status'> & { files?: any[] }) {
  const rawFiles = data.files || data.fileNames || [];
  const fileNamesList = rawFiles.map((f: any) => typeof f === 'string' ? f : f.name);
  const nowIso = new Date().toISOString();
  const quoteCode = `ORC-${String(Math.floor(Date.now() / 1000) % 1000000).padStart(6, '0')}`;
  const token = `tok_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  // 1. Direct sub-second push to TraduzTudo OS Firestore collections (real-time WebSockets)
  try {
    const saasDb = getSaasDb();
    if (saasDb) {
      const reqId = `req-${Date.now()}`;
      const quoteId = `quote-${Date.now()}`;
      const leadId = `lead-${Date.now()}`;
      const notifId = `notif-${Date.now()}`;
      const custId = `cust-${Date.now()}`;

      const notesContent = [
        data.notes || '',
        fileNamesList.length > 0 ? `Documentos anexados (${fileNamesList.length}): ${fileNamesList.join(', ')}` : '',
        'Origem: Site Oficial TraduzTudo (traduztudo.com)',
      ].filter(Boolean).join('\n');

      const reqData = {
        id: reqId,
        tenantId: 'tenant-traduztudo',
        customerName: data.fullName,
        email: data.email,
        phone: data.whatsapp,
        whatsapp: data.whatsapp,
        serviceName: data.serviceType || 'Tradução Juramentada',
        sourceLanguage: 'Português',
        targetLanguage: 'Inglês',
        estimatedVolume: fileNamesList.length > 0 ? `${fileNamesList.length} arquivo(s)` : '',
        notes: notesContent,
        origin: 'Site TraduzTudo (traduztudo.com)',
        status: 'nova',
        files: rawFiles,
        convertedQuoteId: quoteId,
        createdAt: nowIso,
      };

      const quoteData = {
        id: quoteId,
        tenantId: 'tenant-traduztudo',
        code: quoteCode,
        customerId: custId,
        customerName: data.fullName,
        customerEmail: data.email,
        customerPhone: data.whatsapp,
        requestId: reqId,
        assignedUserId: 'user-diego',
        assignedUserName: 'Diego',
        sourceLanguage: data.sourceLanguage || 'Português',
        targetLanguage: data.targetLanguage || 'Inglês',
        issueDate: nowIso,
        expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        estimatedDeliveryDays: 2,
        items: [
          {
            id: `item-${Date.now()}`,
            serviceId: 'serv-juramentada',
            serviceName: data.serviceType || 'Tradução Juramentada',
            description: `${data.serviceType || 'Tradução Juramentada'} (${data.sourceLanguage || 'Português'} para ${data.targetLanguage || 'Inglês'})`,
            sourceLanguage: data.sourceLanguage || 'Português',
            targetLanguage: data.targetLanguage || 'Inglês',
            quantity: fileNamesList.length > 0 ? fileNamesList.length : 1,
            unit: 'documento',
            unitPrice: 0,
            discount: 0,
            total: 0,
          },
        ],
        subtotal: 0,
        discount: 0,
        additionalCost: 0,
        total: 0,
        conditions: 'Validade de 7 dias úteis. Pagamento via Pix ou Cartão em até 12x.',
        notes: notesContent,
        status: 'rascunho',
        approvalToken: token,
        files: rawFiles,
        createdAt: nowIso,
        updatedAt: nowIso,
      };

      const leadData = {
        id: leadId,
        tenantId: 'tenant-traduztudo',
        name: data.fullName,
        type: 'PF',
        email: data.email,
        phone: data.whatsapp,
        whatsapp: data.whatsapp,
        origin: 'Site TraduzTudo (traduztudo.com)',
        interestedServiceName: data.serviceType || 'Tradução Juramentada',
        sourceLanguage: data.sourceLanguage || 'Português',
        targetLanguage: data.targetLanguage || 'Inglês',
        notes: notesContent,
        status: 'novo',
        customerId: custId,
        quoteId,
        createdAt: nowIso,
        updatedAt: nowIso,
      };

      const notifData = {
        id: notifId,
        tenantId: 'tenant-traduztudo',
        read: false,
        createdAt: nowIso,
        title: 'Novo Orçamento Recebido do Site!',
        message: `${data.fullName} solicitou orçamento para ${data.serviceType || 'Tradução Juramentada'} (${data.sourceLanguage || 'Português'} → ${data.targetLanguage || 'Inglês'}).`,
        type: 'info',
        link: '/operacao/orcamentos',
      };

      const custData = {
        id: custId,
        tenantId: 'tenant-traduztudo',
        name: data.fullName,
        type: 'PF',
        email: data.email,
        phone: data.whatsapp,
        whatsapp: data.whatsapp,
        notes: `Criado automaticamente pelo site oficial (${data.serviceType || 'Tradução'})`,
        ordersCount: 0,
        activeOrdersCount: 0,
        pendingBalance: 0,
        totalSpent: 0,
        createdAt: nowIso,
        updatedAt: nowIso,
      };

      // Sanitize reqData & quoteData if total payload is close to 1MB Firestore document limit
      const safeReqData = JSON.parse(JSON.stringify(reqData));
      if (JSON.stringify(safeReqData).length > 650000 && Array.isArray(safeReqData.files)) {
        safeReqData.files = safeReqData.files.map((f: any) => {
          if (typeof f === 'object' && f.dataUrl) {
            const { dataUrl, ...rest } = f;
            return rest;
          }
          return f;
        });
      }

      const safeQuoteData = JSON.parse(JSON.stringify(quoteData));
      if (JSON.stringify(safeQuoteData).length > 650000 && Array.isArray(safeQuoteData.files)) {
        safeQuoteData.files = safeQuoteData.files.map((f: any) => {
          if (typeof f === 'object' && f.dataUrl) {
            const { dataUrl, ...rest } = f;
            return rest;
          }
          return f;
        });
      }

      const docWrites = rawFiles.map((file: any, fIdx: number) => {
        const fileName = typeof file === 'string' ? file : file.name;
        const fileUrl = typeof file === 'string' ? '' : file.url || file.dataUrl || '';
        const docId = `doc-${Date.now()}-${fIdx}`;
        const docData: any = {
          id: docId,
          tenantId: 'tenant-traduztudo',
          quoteId: quoteId,
          customerId: custId,
          name: fileName,
          category: 'original',
          fileUrl: fileUrl,
          url: fileUrl,
          dataUrl: typeof file === 'object' ? file.dataUrl : undefined,
          fileSize: (typeof file === 'object' && typeof file.size === 'number') ? file.size : 0,
          fileType: (typeof file === 'object' && typeof file.type === 'string') ? file.type : 'application/pdf',
          version: 1,
          downloadCount: 0,
          uploaderUserId: 'user-diego',
          uploaderName: 'Diego',
          uploadedByUserId: 'user-diego',
          uploadedByUserName: 'Diego',
          createdAt: nowIso,
          updatedAt: nowIso,
        };
        if (docData.dataUrl && docData.dataUrl.length > 550000) {
          delete docData.dataUrl;
        }
        return setDoc(doc(saasDb, 'traduztudo_documents', docId), docData);
      });

      Promise.allSettled([
        setDoc(doc(saasDb, 'traduztudo_requests', reqId), safeReqData),
        setDoc(doc(saasDb, 'traduztudo_quotes', quoteId), safeQuoteData),
        setDoc(doc(saasDb, 'traduztudo_leads', leadId), leadData),
        setDoc(doc(saasDb, 'traduztudo_customers', custId), custData),
        setDoc(doc(saasDb, 'traduztudo_notifications', notifId), notifData),
        ...docWrites,
      ]).catch((err) => console.warn('[Realtime SaaS Push] Warning:', err));
    }
  } catch (directErr) {
    console.warn('[Realtime SaaS Push] Error:', directErr);
  }

  // 2. Initiate SaaS HTTP dispatch via /api/lead to guarantee TraduzTudo OS serverless API processes it
  const saasPromise = sendQuoteToSaaS({
    fullName: data.fullName,
    email: data.email,
    whatsapp: data.whatsapp,
    serviceType: data.serviceType,
    sourceLanguage: data.sourceLanguage || 'Português',
    targetLanguage: data.targetLanguage || 'Inglês',
    fileNames: fileNamesList,
    files: rawFiles,
    notes: data.notes,
  }).catch((err) => {
    console.warn('[SaaS Sync] Background sync warning:', err);
    return null;
  });

  // 3. Save in local Firestore quotes collection (sanitizing heavy dataUrls)
  let docId = `quote-${Date.now()}`;
  try {
    const sanitizedData = JSON.parse(JSON.stringify(data));
    if (Array.isArray(sanitizedData.files)) {
      sanitizedData.files = sanitizedData.files.map((f: any) => {
        if (typeof f === 'object' && f.dataUrl) {
          const { dataUrl, ...rest } = f;
          return rest;
        }
        return f;
      });
    }
    const docRef = await addDoc(collection(db, 'quotes'), {
      ...sanitizedData,
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

export function subscribeToQuotes(callback: (quotes: QuoteRequest[]) => void) {
  const q = query(collection(db, 'quotes'), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as QuoteRequest));
      callback(list);
    },
    (err) => {
      console.warn('Realtime quotes subscription error:', err);
    }
  );
}

export function subscribeToAllOrders(callback: (orders: Order[]) => void) {
  const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Order));
      callback(list);
    },
    (err) => {
      console.warn('Realtime orders subscription error:', err);
    }
  );
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
