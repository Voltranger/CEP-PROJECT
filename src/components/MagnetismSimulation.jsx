import NestedSimulationTabs from "./NestedSimulationTabs";
import MagnetismSim1 from "./MagnetismSim1.JSX";
import MagnetismSim2 from "./MagnetismSim2";
import MagnetismSim3 from "./MagnetismSim3";

export default function ProjectileSimulation() {
  const simulations = [
    { name: "Sim 1", component: <MagnetismSim1 /> },
    { name: "Sim 2", component: <MagnetismSim2 /> },
    { name: "Sim 3", component: <MagnetismSim3 /> },
  ];

  return <NestedSimulationTabs simulations={simulations} />;
}
