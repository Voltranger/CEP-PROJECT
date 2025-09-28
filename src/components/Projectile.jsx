
import TabLayout from "./TabLayout";
import ProjectileSimulation from "./ProjectileSimulation"; // your simulation component

export default function Projectile() {
  
  return (
    <div className="p-4">

      

      {/* Main Layout */}
    <TabLayout
      concept=
      {
        <div>
          <h2>Projectile Motion</h2>
          <p>
            Projectile motion is a form of motion where an object is thrown near
            the Earth’s surface and moves along a curved path under gravity.
          </p>
        </div>
      }
      simulation={<ProjectileSimulation />}
      
      points={
        <ul>
          <li>Range depends on initial velocity and angle.</li>
          <li>Maximum range occurs at 45° angle.</li>
          <li>Horizontal and vertical motions are independent.</li>
        </ul>
      }
    />
    </div>
  );
}
