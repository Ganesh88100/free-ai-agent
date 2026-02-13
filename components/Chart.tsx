type ChartProps = { values: number[] };

export function Chart({ values }: ChartProps) {
  const max = Math.max(...values, 1);
  return (
    <div className="chart">
      {values.map((value, i) => <div key={i} className="chart-bar" style={{ height: `${(value / max) * 100}%` }} />)}
    </div>
  );
}
