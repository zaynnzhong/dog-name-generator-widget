import { useState } from "react";
import DogNameGeneratorGemini from "./components/DogNameGeneratorGemini";
import DogNameGeneratorUnified from "./components/DogNameGeneratorUnified";

function App() {
  const [currentView, setCurrentView] = useState<"unified" | "original">(
    "unified"
  );
  const apiKey = "demo"; // Fixed demo key for development

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
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

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => setCurrentView("unified")}
            style={{
              padding: "10px 20px",
              fontSize: "14px",
              fontWeight: "600",
              backgroundColor: currentView === "unified" ? "#667eea" : "#f1f1f1",
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
      </div>

      {/* Widget Display */}
      {currentView === "unified" ? (
        <DogNameGeneratorUnified />
      ) : (
        <DogNameGeneratorGemini apiKey={apiKey} />
      )}
    </div>
  );
}

export default App;