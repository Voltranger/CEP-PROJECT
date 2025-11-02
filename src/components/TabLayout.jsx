import { useState } from "react";
import Tabs from "./Tabs";
export default function TabLayout({ concept, simulation, quiz }) {
  const [activeTab, setActiveTab] = useState("concept");

  return (
    <div style={{ padding: "20px" }}>
      {/* Tabs */}
      <div style={{ display: "flex", marginBottom: "15px" }}>
        
            <Tabs
            tab="concept"
            description="Concept Explanation"
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            />
            <Tabs
            tab="simulation"
            description="Simulation"
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            />
            <Tabs
            tab="quiz"
            description="Quiz Section"
            setActiveTab={setActiveTab}
            activeTab={activeTab}
            />


        
      </div>

      {/* Tab Content */}
      <div
        style={{
          background: "#f9f9f9",
          padding: "20px",
          borderRadius: "10px",
          minHeight: "300px",
        }}
      >
        {activeTab === "concept" && <div>{concept}</div>}
        {activeTab === "simulation" && <div>{simulation}</div>}
        {activeTab === "quiz" && <div>{quiz}</div>}
      </div>
    </div>
  );
}
