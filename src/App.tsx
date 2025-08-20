type AppProps = {
  title?: string; // optional prop
};

export default function App({ title = "Halo dari Widget!" }: AppProps) {
  return (
    <div
      style={{
        padding: "10px",
        border: "2px solid #4caf50",
        borderRadius: "8px",
      }}
    >
      <h2>{title}</h2>
      <p>Ini React app yang dibungkus jadi Web Component 🎉</p>
    </div>
  );
}
