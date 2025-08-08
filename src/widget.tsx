import React from "react";
import { createRoot } from "react-dom/client";
import DebugWidget from "./components/DebugWidget";

function initDebugWidget() {
  const widgets = document.querySelectorAll(".debug-widget-container");

  widgets.forEach((container) => {
    if (!(container instanceof HTMLElement)) return;

    const root = createRoot(container);
    root.render(React.createElement(DebugWidget));
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDebugWidget);
} else {
  initDebugWidget();
}

export default DebugWidget;
