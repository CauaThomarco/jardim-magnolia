export default function Stars({ n = 5, size = 14 }) {
  return (
    <span className="stars" style={{ fontSize: size }}>
      {'★'.repeat(n)}{'☆'.repeat(5 - n)}
    </span>
  );
}