import NestedSimulationTabs from "./NestedSimulationTabs";
import ElectricitySim1 from "./ElectricitySim1.JSX";
import ElectricitySim2 from "./ElectricitySim2";
import ElectricitySim3 from "./ElectricitySim3";

export default function ProjectileSimulation() {
  const simulations = [
    { name: "Sim 1", component: <ElectricitySim1 /> },
    { name: "Sim 2", component: <ElectricitySim2 /> },
    { name: "Sim 3", component: <ElectricitySim3 /> },
  ];

  return <NestedSimulationTabs simulations={simulations} />;
}
