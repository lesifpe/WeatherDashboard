import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from 'firebase/database'

// 🔥 Validação do ENV (evita erro silencioso)
const requiredEnv = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
]

// Verifica se alguma variável está faltando
requiredEnv.forEach((key) => {
  if (!import.meta.env[key]) {
    console.error(`❌ Variável de ambiente faltando: ${key}`)
  }
})

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL
}

// 🔥 Inicialização segura
let app
let db
let rtdb

try {
  app = initializeApp(firebaseConfig)
  db = getFirestore(app)
  rtdb = getDatabase(app)

  console.log('✅ Firebase conectado com sucesso')
} catch (error) {
  console.error('❌ Erro ao inicializar Firebase:', error)
}

export { db, rtdb }