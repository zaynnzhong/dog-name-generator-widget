import { useState } from "react";
import DogNameGeneratorGemini from "./components/DogNameGeneratorGemini";

function App() {
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);

  // Check for environment variable first
  const envApiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setShowApiKeyInput(false);
    }
  };

  // Use env API key if available
  if (envApiKey && showApiKeyInput) {
    setApiKey(envApiKey);
    setShowApiKeyInput(false);
  }

  if (showApiKeyInput && !envApiKey) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "32px",
            borderRadius: "16px",
            boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "24px",
              color: "#1f2937",
            }}
          >
            🐕 Dog Name Generator
          </h2>
          <p
            style={{
              textAlign: "center",
              marginBottom: "24px",
              color: "#6b7280",
            }}
          >
            Enter your Google Gemini API key to get started
          </p>
          <form onSubmit={handleApiKeySubmit}>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIza..."
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "1px solid #d1d5db",
                fontSize: "16px",
                marginBottom: "16px",
                boxSizing: "border-box",
              }}
              required
            />
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Start Generating Names
            </button>
          </form>
          <p
            style={{
              fontSize: "12px",
              color: "#9ca3af",
              textAlign: "center",
              marginTop: "16px",
            }}
          >
            Get your API key from{" "}
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#667eea" }}
            >
              Google AI Studio
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <DogNameGeneratorGemini apiKey={apiKey} />
    </div>
  );
}

export default App;
