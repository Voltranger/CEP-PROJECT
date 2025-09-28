import TabLayout from "./TabLayout";
// import ProjectileSimulation from "./ElectricitySimulationSimulation"; // your simulation component
import ElectricitySimulation from "./ElectricitySimulation";

export default function Projectile() {
  return (
    <TabLayout
      concept={
              <div>
                <h2>Electricity</h2>
                <p>
                Electricity is a form of energy that we use in our daily lives to light our homes, run fans, televisions, computers, and many other appliances. It is produced by the movement of tiny charged particles called electrons.
                Electricity flows in a path called a circuit. When the circuit is complete or closed, the current flows and makes devices like bulbs glow, and when the circuit is open, the flow stops.
                </p>
              </div>
      }

      simulation={<ElectricitySimulation />}
      
      points={
        <ul>
          <li>1. Electricity is a form of energy.</li>
          <li>2. It flows through conductors (like copper wires) but not through insulators (like rubber, wood, or plastic).</li>
          <li>3. A circuit is a closed path that allows electricity to flow.</li>
          <li>4. Electricity can be produced from batteries (stored energy) or power stations.</li>
          <li>5. Switches are used to turn electricity on and off.</li>
          <li>6. Electricity is very useful but must be handled carefully to avoid shocks.</li>
        </ul>
      }
    />
  );
}
