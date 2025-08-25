import React from "react";
import ReactDOM from "react-dom/client";
import DogNameQuizWidget from "./components/DogNameQuizWidget";

// Function to initialize all quiz widgets on the page
function initializeQuizWidgets() {
  console.log("Initializing Dog Name Quiz Widgets...");

  const containers = document.querySelectorAll(".dog-name-quiz-widget");

  containers.forEach((container) => {
    try {
      const apiKey = container.getAttribute("data-api-key") || (window as any).GEMINI_API_KEY || undefined;

      const root = ReactDOM.createRoot(container as HTMLElement);
      root.render(React.createElement(DogNameQuizWidget, { apiKey }));

      console.log("Quiz widget initialized successfully");
    } catch (error) {
      console.error("Failed to initialize quiz widget:", error);
    }
  });
}

// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeQuizWidgets);
} else {
  initializeQuizWidgets();
}

// Expose function globally for manual initialization
(window as any).renderDogNameQuizWidget = initializeQuizWidgets;

export { initializeQuizWidgets };
