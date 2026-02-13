type TableProps = { columns: string[]; rows: string[][] };

export function Table({ columns, rows }: TableProps) {
  return (
    <table className="table">
      <thead>
        <tr>{columns.map((c) => <th key={c} className="th">{c}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>{row.map((v, j) => <td key={`${i}-${j}`} className="td">{v}</td>)}</tr>
        ))}
      </tbody>
    </table>
  );
}
