const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, query, orderBy } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCol_NBK74W63I9ah8oY7YuJaHhSkungU0",
  authDomain: "etraducoes-clone-2026.firebaseapp.com",
  projectId: "etraducoes-clone-2026",
  storageBucket: "etraducoes-clone-2026.firebasestorage.app",
  messagingSenderId: "366323797179",
  appId: "1:366323797179:web:26bf7ef9405e0c45572d9e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function checkQuotes() {
  try {
    console.log('Querying Firestore quotes collection...');
    const q = query(collection(db, 'quotes'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    console.log(`Found ${snapshot.docs.length} quotes in Firestore.`);
    snapshot.docs.forEach((doc, idx) => {
      const data = doc.data();
      const date = data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : data.createdAt;
      console.log(`[${idx + 1}] ID: ${doc.id}`);
      console.log(`     Nome: ${data.fullName}`);
      console.log(`     Email: ${data.email}`);
      console.log(`     WhatsApp: ${data.whatsapp}`);
      console.log(`     Serviço: ${data.serviceType}`);
      console.log(`     Status: ${data.status}`);
      console.log(`     Data: ${date}`);
      console.log(`     Notas: ${data.notes || ''}`);
    });
  } catch (err) {
    console.error('Error fetching quotes from Firestore:', err);
  }
}

checkQuotes();
