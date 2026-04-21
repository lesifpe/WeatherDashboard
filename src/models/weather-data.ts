export interface WeatherData {
  id?: string;
  intensidadeChuva: number;
  volumeAcumulado: number;
  umidade: number;
  temperatura: number;
  pressao: number;
  timestamp: Date;
  statusSensor: 'ativo' | 'inativo';
  alertas: string[];
}

export interface WeatherAlert {
  type: 'normal' | 'chuvaForte' | 'riscoAlagamento';
  message: string;
  severity: 'info' | 'warning' | 'critical';
}

export interface EquipeConfig {
  name: string;
  collection: string;
  isTest: boolean;
  color: string;
}