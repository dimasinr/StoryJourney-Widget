import CharactersList from './components/CharactersList';

type AppProps = {
  sjKey?: string;
  sjUser?: string;
};

export default function App({ sjKey, sjUser }: AppProps) {
  console.log(sjKey, sjUser);
  return (
    <div
      style={{
        padding: "10px",
        border: "2px solid #4caf50",
        borderRadius: "8px",
      }}
    >
      {sjKey ? (
        <CharactersList apiKey={sjKey} userId={sjUser ?? ''} />
      ) : (
        <div style={{ color: '#777', fontStyle: 'italic' }}>
          Set <code>sjKey</code> untuk memuat data characters.
        </div>
      )}
    </div>
  );
}
