import "./App.css";

type TeamData = {
  temperatura: number;
  chuva: number;
};

const mockData: Record<string, TeamData> = {
  equipe1: { temperatura: 25, chuva: 10 },
  equipe2: { temperatura: 27, chuva: 5 },
  equipe3: { temperatura: 22, chuva: 0 },
  equipe4: { temperatura: 30, chuva: 20 },
};

function App() {
  return (
    <div className="container">
      <header>
        <h1>📡 Dashboard ESP32</h1>
        <p>Monitoramento em tempo real (Firebase)</p>
      </header>

      <main className="grid">
        {Object.entries(mockData).map(([team, data]) => (
          <div key={team} className="card">
            <h2>{team.toUpperCase()}</h2>

            <div className="sensor">
              <span>🌡 Temperatura</span>
              <strong>{data.temperatura}°C</strong>
            </div>

            <div className="sensor">
              <span>🌧 Chuva</span>
              <strong>{data.chuva} mm</strong>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;