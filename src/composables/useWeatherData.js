import { ref, onUnmounted } from 'vue';
import { ref as dbRef, query, orderByChild, limitToLast, onValue } from 'firebase/database';
import { rtdb } from '../firebase/config.js'; // ← muda para rtdb

export function useWeatherData(collectionName) {
  const data = ref([]);
  const loading = ref(true);
  const error = ref(null);
  let unsubscribe = null;

  const fetchData = () => {
    try {
      // Realtime Database: referência ao caminho específico
      const collectionRef = dbRef(rtdb, `${collectionName}/leituras`);
      
      // No Realtime Database, a consulta é diferente
      // Primeiro, verifica se existe o nó
      unsubscribe = onValue(collectionRef, 
        (snapshot) => {
          const items = [];
          
          if (snapshot.exists()) {
            const dados = snapshot.val();
            
            // Converte o objeto para array
            Object.keys(dados).forEach((key) => {
              const item = dados[key];
              items.push({
                id: key,
                ...item,
                // Realtime não tem timestamp automático, converte se existir
                timestamp: item.timestamp ? new Date(item.timestamp) : new Date()
              });
            });
            
            // Ordena por timestamp decrescente (mais recente primeiro)
            items.sort((a, b) => {
              const timeA = a.timestamp?.getTime() || 0;
              const timeB = b.timestamp?.getTime() || 0;
              return timeB - timeA;
            });
            
            // Limita a 50 itens
            data.value = items.slice(0, 50);
          } else {
            console.log(`⚠️ Nenhum dado encontrado em ${collectionName}/leituras`);
            data.value = [];
          }
          
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
      console.error(`Erro ao configurar listener da ${collectionName}:`, err);
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
      unsubscribe(); // Remove o listener
      console.log(`🧹 Listener removido para ${collectionName}`);
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