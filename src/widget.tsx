import React from "react";
import { createRoot } from "react-dom/client";
import DogNameGeneratorGemini from "./components/DogNameGeneratorGemini";

/**
 * Renders the Dog Name Generator widget into all designated containers.
 * This function is exposed on the window object so it can be called manually.
 */
function initializeWidgets() {
  const widgetContainers = document.querySelectorAll(
    ".dog-name-generator-widget"
  );

  if (widgetContainers.length === 0) {
    console.warn(
      'Dog Name Generator: No container element with class "dog-name-generator-widget" was found.'
    );
    return;
  }

  widgetContainers.forEach((container) => {
    if (container instanceof HTMLElement) {
      // Ensure we don't re-initialize the same widget
      if (container.dataset.initialized) {
        return;
      }

      const apiKey = container.dataset.apiKey;

      if (!apiKey) {
        container.innerHTML =
          '<div style="padding: 20px; background: #fee2e2; color: #dc2626; border-radius: 8px;"><b>Error:</b> API key is missing. Please add the `data-api-key` attribute to your div.</div>';
        console.error(
          "Dog Name Generator: Missing data-api-key attribute on container:",
          container
        );
        return;
      }

      try {
        const root = createRoot(container);
        root.render(React.createElement(DogNameGeneratorGemini, { apiKey }));
        container.dataset.initialized = "true";
      } catch (error) {
        console.error("Dog Name Generator: Failed to render widget.", error);
        container.innerHTML =
          '<div style="padding: 20px; background: #fee2e2; color: #dc2626; border-radius: 8px;"><b>Error:</b> Could not load the widget. See console for details.</div>';
      }
    }
  });
}

// Expose the initialization function to the global window object.
// This allows for manual initialization from a <script> tag.
(window as any).renderDogNameGenerator = initializeWidgets;

// Also, attempt to run it automatically after the page has fully loaded.
// This is a fallback for simple implementations.
window.addEventListener("load", initializeWidgets);

export { DogNameGeneratorGemini };
