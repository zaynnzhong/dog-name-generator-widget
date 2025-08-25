import React, { useState } from "react";
import DogNameGeneratorGemini from "./components/DogNameGeneratorGemini";
import DogNameGeneratorUnified from "./components/DogNameGeneratorUnified";

function App() {
  const [currentView, setCurrentView] = useState<"unified" | "original">(
    "unified"
  );
  const [apiKey, setApiKey] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);

  const handleApiKeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setShowApiKeyInput(false);
    }
  };

  // API Key input screen
  if (showApiKeyInput) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            textAlign: "center",
            maxWidth: "500px",
            width: "100%",
          }}
        >
          <h1 style={{ color: "#333", marginBottom: "10px" }}>
            🐕 Dog Name Generator Development
          </h1>
          <p style={{ color: "#666", fontSize: "16px", marginBottom: "30px" }}>
            Choose which widget to test locally
          </p>

          <form onSubmit={handleApiKeySubmit} style={{ marginBottom: "30px" }}>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Google Gemini API key (AIza...)"
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "16px",
                border: "2px solid #ddd",
                borderRadius: "8px",
                marginBottom: "20px",
                boxSizing: "border-box",
              }}
              required
            />
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                fontSize: "16px",
                fontWeight: "600",
                backgroundColor: "#667eea",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              🚀 Start Testing
            </button>
          </form>

          <div
            style={{
              padding: "20px",
              background: "#f8f9fa",
              borderRadius: "8px",
              textAlign: "left",
            }}
          >
            <h3 style={{ margin: "0 0 15px 0", color: "#333" }}>
              📝 Get Free API Key:
            </h3>
            <ol
              style={{
                margin: "0",
                paddingLeft: "20px",
                fontSize: "14px",
                color: "#666",
              }}
            >
              <li style={{ marginBottom: "8px" }}>
                Visit{" "}
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google AI Studio
                </a>
              </li>
              <li style={{ marginBottom: "8px" }}>Click "Create API Key"</li>
              <li style={{ marginBottom: "8px" }}>
                Copy the key starting with "AIza..."
              </li>
              <li>Paste it above to start testing!</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: "20px",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        {/* Navigation Header */}
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "12px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            marginBottom: "30px",
            textAlign: "center",
          }}
        >
          <h1 style={{ color: "#333", marginBottom: "20px" }}>
            🐕 Dog Name Generator - Local Development
          </h1>

          <div
            style={{
              display: "flex",
              gap: "10px",
              justifyContent: "center",
              marginBottom: "15px",
            }}
          >
            <button
              onClick={() => setCurrentView("unified")}
              style={{
                padding: "10px 20px",
                fontSize: "14px",
                fontWeight: "600",
                backgroundColor:
                  currentView === "unified" ? "#667eea" : "#f1f1f1",
                color: currentView === "unified" ? "white" : "#333",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              🎯 Unified Widget (NEW!)
            </button>
            <button
              onClick={() => setCurrentView("original")}
              style={{
                padding: "10px 20px",
                fontSize: "14px",
                fontWeight: "600",
                backgroundColor:
                  currentView === "original" ? "#667eea" : "#f1f1f1",
                color: currentView === "original" ? "white" : "#333",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              📝 Original Widget
            </button>
          </div>

          <p style={{ fontSize: "14px", color: "#666", margin: "0" }}>
            {currentView === "unified"
              ? "Choose between Quick Generate (30 sec) or Personality Quiz (2 min)"
              : "Simple 3-field form with breed selection and preferences"}
          </p>

          <button
            onClick={() => setShowApiKeyInput(true)}
            style={{
              fontSize: "12px",
              color: "#666",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
              marginTop: "10px",
            }}
          >
            Change API Key
          </button>
        </div>

        {/* Widget Display */}
        {currentView === "unified" ? (
          <DogNameGeneratorUnified apiKey={apiKey} />
        ) : (
          <DogNameGeneratorGemini apiKey={apiKey} />
        )}
      </div>
    </div>
  );
}

export default App;
