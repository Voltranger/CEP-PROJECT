import { useState } from "react";

export default function NestedSimulationTabs({ simulations }) {
  const [activeTab, setActiveTab] = useState(simulations[0].name);

  return (
    <div>
      {/* Tab Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center", // center horizontally
          gap: "10px",
          marginBottom: "15px",
        }}
      >
        {simulations.map((sim) => (
          <button
            key={sim.name}
            onClick={() => setActiveTab(sim.name)}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: activeTab === sim.name ? "2px solid #4f46e5" : "2px solid #ccc",
              background: activeTab === sim.name ? "#eef2ff" : "#fff",
              boxShadow: activeTab === sim.name ? "0 0 10px #4f46e5" : "none",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "all 0.2s ease",
            }}
          >
            {sim.name}
          </button>
        ))}
      </div>

      {/* Render active simulation */}
      <div>{simulations.find((sim) => sim.name === activeTab)?.component}</div>
    </div>
  );
}
