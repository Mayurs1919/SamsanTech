export function StatTile({ value, label }: { value: string; label: string }) {
  return (
    <div className="tl-stat-tile">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
