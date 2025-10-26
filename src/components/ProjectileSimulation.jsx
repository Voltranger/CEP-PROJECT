import NestedSimulationTabs from "./NestedSimulationTabs";
import ProjectileSim1 from "./ProjectileSim1.JSX";
import ProjectileSim2 from "./ProjectileSim2";
import ProjectileSim3 from "./ProjectileSim3";

export default function ProjectileSimulation() {
  const simulations = [
    { name: "Sim 1", component: <ProjectileSim1 /> },
    { name: "Sim 2", component: <ProjectileSim2 /> },
    { name: "Sim 3", component: <ProjectileSim3 /> },
  ];

  return <NestedSimulationTabs simulations={simulations} />;
}
