import React, {useState} from "react";
import { createRoot } from "react-dom/client";

const Popup = () =>{
    const [complianceScore, setComplianceScore] = useState(90);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>LinkGenie</h2>

      {/* Compliance Meter */}
      <div style={{ marginBottom: "20px" }}>
        <p>Safety Score: {complianceScore}/100</p>
        <div 
          style={{
            width: "100%",
            background: "#ddd",
            height: "10px",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${complianceScore}%`,
              height: "100%",
              background: complianceScore > 60 ? "green" : "red",
            }}
          ></div>
        </div>
      </div>

      {/* Start Automation Button */}
      <button
        onClick={() => chrome.runtime.sendMessage({ type: "START_SAFE_AUTOMATION" })}
        style={{
          background: "#0073b1",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Start Ethical Automation
      </button>
    </div>
  );
}

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);
root.render(<Popup/>);