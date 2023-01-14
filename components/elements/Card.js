export default function Card({ color, size, children }) {
  return (
    <div className={`card ${color} ${size} d-flex ai-c jc-c m-center`}>
      {children}
    </div>
  );
}
