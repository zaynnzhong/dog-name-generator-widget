import DogNameQuizWidget from "./components/DogNameQuizWidget";

interface QuizAppProps {
  apiKey: string;
}

function QuizApp({ apiKey }: QuizAppProps) {
  return (
    <div>
      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
          background: "white",
          padding: "15px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <span style={{ fontSize: "14px", color: "#666" }}>
          🎯 Quiz Widget with API Key: {apiKey.substring(0, 10)}...
        </span>
      </div>

      <DogNameQuizWidget apiKey={apiKey} />
    </div>
  );
}

export default QuizApp;
