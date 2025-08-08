import React from "react";

export default function DebugWidget() {
  return (
    <div
      style={{
        backgroundColor: "#10b981", // Green color
        color: "white",
        padding: "40px",
        textAlign: "center",
        fontSize: "24px",
        fontWeight: "bold",
        borderRadius: "16px",
        border: "4px dashed white",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      ✅ DEBUG WIDGET LOADED!
      <p style={{ fontSize: "16px", marginTop: "16px", fontWeight: "normal" }}>
        If you see this, the new script is running correctly.
      </p>
    </div>
  );
}
