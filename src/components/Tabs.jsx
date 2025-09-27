const Tabs = ({ tab, description, setActiveTab, activeTab }) => {
  return (
    <button
      onClick={() => setActiveTab(tab)}
      style={{
        flex: 1,
        padding: "10px",
        background: activeTab === tab ? "#e353dcff" : "#e0e0e0",
        color: activeTab === tab ? "white" : "black",
        border: "none",
        cursor: "pointer",
      }}
    >
      {description}
    </button>
  );
};

export default Tabs;
