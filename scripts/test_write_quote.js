const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc, Timestamp } = require('firebase/firestore');

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

async function testWriteQuote() {
  try {
    console.log('Testing addDoc to Firestore quotes collection...');
    const docRef = await addDoc(collection(db, 'quotes'), {
      fullName: 'Teste Verificacao',
      email: 'teste@exemplo.com',
      whatsapp: '11982854183',
      serviceType: 'Teste de Conexao',
      fileNames: [],
      status: 'novo',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });
    console.log('SUCCESS! Quote created with ID:', docRef.id);
  } catch (err) {
    console.error('FAILED to write quote to Firestore:', err);
  }
}

testWriteQuote();
