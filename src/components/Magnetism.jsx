import TabLayout from "./TabLayout";
import MagnetismSimulation from "./MagnetismSimulation"// your simulation component

export default function Projectile() {
  return (
    <TabLayout
      concept={
        <div>
          <h2>Magnetism</h2>
          <p>Magnets are objects that can pull some kinds of metal, like iron. Every magnet has two ends called poles — a North pole and a South pole. Opposite poles (North + South) pull toward each other, and the same poles push away. Magnets make an invisible area called a magnetic field; inside that field the magnet can pull or push other magnetic things. You see magnets in fridge magnets, compasses, and in many machines like speakers and motors.</p>

        
        </div>
      }
      simulation={<MagnetismSimulation />}
      points={

        <ul>  
          
          <li>1. Magnetism is a force that attracts or repels certain materials.</li>
          <li>2. Magnets attract iron, nickel, and cobalt only.</li>
          <li>3. Every magnet has two poles: north and south.</li>
          <li>4. Like poles repel, unlike poles attract.</li>
          <li>5. Magnetic force is strongest at the poles.</li>
          <li>6. Earth itself acts like a giant magnet.</li>
          <li>7. A compass works on Earth’s magnetism.</li>
          <li>8. Heating or hammering can destroy magnetism.</li>
          <li></li>
          <li></li>
        </ul>
      
       
      }
    />
  );
}
