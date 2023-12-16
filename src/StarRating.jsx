const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};
const starContainerStyle = {
  display: "flex",
  gap: "4px",
};
const textStyle = {
  lineHeight: "1",
  margin: "0",
};
export default function StarRating({ maxStarts = 5 }) {
  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxStarts }, (_, i) => (
          <span>{i + 1}</span>
        ))}
      </div>
      <p style={textStyle}>10</p>
    </div>
  );
}

function Star() {}
