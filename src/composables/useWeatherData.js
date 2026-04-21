import { ref, onUnmounted } from 'vue';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/config';

export function useWeatherData(collectionName) {
  const data = ref([]);
  const loading = ref(true);
  const error = ref(null);
  let unsubscribe = null;

  const fetchData = () => {
    try {
      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef, orderBy('timestamp', 'desc'), limit(50));
      
      unsubscribe = onSnapshot(q, 
        (snapshot) => {
          const items = [];
          snapshot.forEach((doc) => {
            items.push({
              id: doc.id,
              ...doc.data(),
              timestamp: doc.data().timestamp?.toDate?.() || new Date(doc.data().timestamp)
            });
          });
          data.value = items;
          loading.value = false;
          error.value = null;
        },
        (err) => {
          console.error(`Erro ao carregar dados da ${collectionName}:`, err);
          error.value = err.message;
          loading.value = false;
        }
      );
    } catch (err) {
      error.value = err.message;
      loading.value = false;
    }
  };

  const getLatestData = () => {
    return data.value[0] || null;
  };

  const getHistoricalData = () => {
    return [...data.value].reverse();
  };

  fetchData();

  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  return {
    data,
    loading,
    error,
    getLatestData,
    getHistoricalData
  };
}