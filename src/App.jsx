import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Body from './components/Body';
import Projectile from "./components/Projectile";
import Magnetism from "./components/Magnetism";
import Electricity from "./components/Electricity";

function App() {
    return(
    <div className="min-h-screen bg-gradient-to-b from-purple-800 via-indigo-700 to-pink-600">
      <Header/>
      {/* Glowing Line */}
      <div className="h-1 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 "></div>
      
      
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/projectile" element={<Projectile />} />
        <Route path="/magnetism" element={<Magnetism />} />
        <Route path="/electricity" element={<Electricity />} />
      </Routes>
      
      
    </div>
    );
}

export default App
