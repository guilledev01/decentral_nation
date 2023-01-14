export default function Chip({ color, size, children, ...props }) {
  return (
    <div
      {...props}
      className={`chip ${color} ${size} d-flex ai-c jc-c m-center`}
    >
      {children}
    </div>
  );
}
