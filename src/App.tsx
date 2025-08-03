import { useState, useEffect } from "react";
import { Chart } from "./components/chart";

interface ChartData {
  title: string;
  data: [number, number | number[] | null][];
}

function App() {
  const [charts, setCharts] = useState<ChartData[]>([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => setCharts(json))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <main className="min-w-screen h-screen bg-slate-200  ">
      <h1 className="w-full bg-slate-950 py-8 px-4 text-3xl text-white">Chart Viewer</h1>
      <div className="w-full grid-cols-2 content-baseline place-content-center p-2 grid gap-2.5">{charts.length > 0 && charts.map((chart) => <Chart key={chart.title} data={chart.data} title={chart.title} />)}</div>
    </main>
  );
}

export default App;
