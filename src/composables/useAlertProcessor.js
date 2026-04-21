import { computed } from 'vue';

export function useAlertProcessor(weatherData) {
  const alerts = computed(() => {
    const alertList = [];
    const latestData = weatherData.value[0];
    
    if (!latestData) return alertList;
    
    if (latestData.intensidadeChuva > 25 && latestData.intensidadeChuva <= 50) {
      alertList.push({
        type: 'chuvaForte',
        message: '⚠️ Chuva Forte!',
        severity: 'warning'
      });
    }
    
    if (latestData.intensidadeChuva > 50) {
      alertList.push({
        type: 'riscoAlagamento',
        message: '🚨 Risco de Alagamento!',
        severity: 'critical'
      });
    }
    
    return alertList;
  });
  
  const intensityClass = computed(() => {
    const latestData = weatherData.value[0];
    if (!latestData) return 'normal';
    if (latestData.intensidadeChuva > 50) return 'critical';
    if (latestData.intensidadeChuva > 25) return 'warning';
    return 'normal';
  });
  
  const statusClass = computed(() => {
    const latestData = weatherData.value[0];
    return latestData?.statusSensor === 'ativo' ? 'status-active' : 'status-inactive';
  });
  
  return {
    alerts,
    intensityClass,
    statusClass
  };
}