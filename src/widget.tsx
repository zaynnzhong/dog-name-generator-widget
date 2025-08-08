import React from "react";
import { createRoot } from "react-dom/client";
import DogNameGeneratorGemini from "./components/DogNameGeneratorGemini";

// Initialize widget
function initDogNameGenerator() {
  const widgets = document.querySelectorAll(".dog-name-generator-widget");

  widgets.forEach((container) => {
    if (!(container instanceof HTMLElement)) return;

    const apiKey = container.dataset.apiKey;

    if (!apiKey) {
      console.error(
        "Dog Name Generator: API key is required. Please add data-api-key attribute."
      );
      container.innerHTML =
        '<div style="padding: 20px; background: #fee2e2; color: #dc2626; border-radius: 8px;">❌ API key is required. Please add data-api-key attribute.</div>';
      return;
    }

    const root = createRoot(container);
    root.render(React.createElement(DogNameGeneratorGemini, { apiKey }));
  });
}

// Auto-initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDogNameGenerator);
} else {
  initDogNameGenerator();
}

// Export for manual initialization
export { DogNameGeneratorGemini, initDogNameGenerator };
export default DogNameGeneratorGemini;
