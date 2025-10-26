import { useState, useRef } from "react";

// Set BASE_URL to 5000 for consistency
const BASE_URL = "http://localhost:5001"; 
const BACKEND_URL_SAVE = `${BASE_URL}/api/save-result`;
const BACKEND_URL_HISTORY = `${BASE_URL}/api/history`;

// -------------------------------------------------------------------
// START OF ProjectileSimulation Component
// -------------------------------------------------------------------

export default function ProjectileSimulation() {
  const [angle, setAngle] = useState(45);
  const [speed, setSpeed] = useState(20);
  const [ballPos, setBallPos] = useState({ x: 0, y: 0 });
  const [stats, setStats] = useState({ maxHeight: 0, range: 0, time: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [historyData, setHistoryData] = useState([]);
  const g = 9.8;
  const intervalRef = useRef(null);

  const scale = 10;
  const ballRadius = 0.9;
  const basket = { 
    x: 60, y: 0, width: 10, height: 2
  };

  // Function to fetch history data and open the modal
  const fetchAndOpenHistory = async () => {
    try {
      const response = await fetch(BACKEND_URL_HISTORY);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setHistoryData(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching history:', error);
      alert('Could not load history. See console for details.');
    }
  };

  // Function to delete all history
  const clearHistory = async () => {
    if (!window.confirm("Are you sure you want to clear ALL simulation history? This cannot be undone.")) {
        return;
    }
    try {
        const response = await fetch(BACKEND_URL_HISTORY, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        setHistoryData([]); 
        setIsModalOpen(false);
        console.log("History successfully cleared.");

    } catch (error) {
        console.error('Error clearing history:', error);
        alert('Failed to clear history. See console.');
    }
  };

  // Function to handle the POST request (SAVE)
  const saveResultToBackend = (finalStats, finalRange, wasScored) => {
    const payload = {
        angle: angle,
        speed: speed,
        maxHeight: finalStats.maxHeight, 
        range: finalRange, 
        time: finalStats.time,
        scored: wasScored,
    };

    fetch(BACKEND_URL_SAVE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(data => {
        console.log(`Result saved to DB. Status: ${data.status}`);
    })
    .catch(error => {
        console.error('Error saving data to backend:', error);
    });
  };

  // ------------------------- SIMULATION LOGIC FIX -------------------------
  const simulate = () => {
    clearInterval(intervalRef.current);
    setBallPos({ x: 0, y: 0 });
    setIsAnimating(true);
    setMessage("");

    const rad = (angle * Math.PI) / 180;
    const vx = speed * Math.cos(rad);
    const vy = speed * Math.sin(rad);
    const dt = 0.05;
    let t = 0;
    let maxY = 0;
    let scored = false; // Flag to track if the ball has hit the basket

    intervalRef.current = setInterval(() => {
      const x = vx * t;
      let y = vy * t - 0.5 * g * t * t;
      
      // --- 1. CHECK FOR SCORING (IMMEDIATE SUCCESS) ---
      const basketLeft = basket.x;
      const basketRight = basket.x + basket.width;
      const basketBottom = basket.y + basket.height;

      if (
        x + ballRadius >= basketLeft &&
        x - ballRadius <= basketRight &&
        y - ballRadius >= basket.y &&
        y + ballRadius <= basketBottom
      ) {
        // SCORING DETECTED!
        clearInterval(intervalRef.current);
        setIsAnimating(false);
        setMessage("✅ Correct! The ball went in the basket!");
        scored = true;
        
        const finalStats = {
          maxHeight: maxY.toFixed(2),
          range: x.toFixed(2), 
          time: t.toFixed(2),
        };
        setStats(finalStats);
        saveResultToBackend(finalStats, x.toFixed(2), scored);
        
        // Final position update (just before exiting)
        setBallPos({ x, y });
        return; 
      }
      
      // --- 2. CHECK FOR HITTING THE GROUND (MISS) ---
      if (y < 0) {
        // End simulation only if y < 0 AND the ball hasn't scored yet.
        clearInterval(intervalRef.current);
        setIsAnimating(false);
        
        const finalStats = {
          maxHeight: maxY.toFixed(2),
          range: x.toFixed(2), // Use the x position at the time of impact
          time: t.toFixed(2),
        };
        setStats(finalStats);

        if (!scored) setMessage("❌ Missed! Try again.");
        saveResultToBackend(finalStats, x.toFixed(2), scored);
        
        // Final position update (on the ground)
        setBallPos({ x, y: 0 }); 
        return; 
      }

      // --- 3. CONTINUE ANIMATION ---
      if (y > maxY) maxY = y;
      setBallPos({ x, y });
      t += dt;
    }, 50);
  };
  // ------------------------- END SIMULATION LOGIC FIX -------------------------

  const reset = () => {
    clearInterval(intervalRef.current);
    setBallPos({ x: 0, y: 0 });
    setStats({ maxHeight: 0, range: 0, time: 0 });
    setIsAnimating(false);
    setMessage("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1 style={{ textAlign: "center" }}>🏀 Projectile Motion Lab</h1>

      {/* Sliders (omitted for brevity) */}
      <div style={{ marginBottom: "20px" }}>
        <label>
          Launch Angle: {angle}°<br />
          <input type="range" min="10" max="80" value={angle} disabled={isAnimating} onChange={(e) => setAngle(Number(e.target.value))} />
        </label>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Speed: {speed} m/s<br />
          <input type="range" min="5" max="50" value={speed} disabled={isAnimating} onChange={(e) => setSpeed(Number(e.target.value))} />
        </label>
      </div>

      {/* Buttons */}
      <button onClick={simulate} disabled={isAnimating} style={{ marginRight: "10px" }}>
        {isAnimating ? "Simulating..." : "Simulate"}
      </button>
      <button onClick={reset} style={{ marginRight: "10px" }}>Reset</button>
      
      {/* Previous History Button */}
      <button onClick={fetchAndOpenHistory} disabled={isAnimating}>
        Previous History ({historyData.length})
      </button>

      {/* Stats and Message (omitted for brevity) */}
      <div style={{ margin: "20px 0", fontWeight: "bold" }}>
        <p>Max Height: {stats.maxHeight} m</p>
        <p>Range: {stats.range} m</p>
        <p>Time of Flight: {stats.time} s</p>
      </div>
      {message && (
        <div style={{ fontSize: "18px", fontWeight: "bold", color: message.includes("Correct") ? "green" : "red" }}>
          {message}
        </div>
      )}

      {/* Visualization Area (omitted for brevity) */}
      <div style={{ background: "#f0f0f0", borderRadius: "10px", position: "relative", height: "400px", overflow: "hidden",}}>
        {/* Basket */}
        <div style={{ position: "absolute", bottom: `${basket.y * scale}px`, left: `${basket.x * scale}px`, width: `${basket.width * scale}px`, height: `${basket.height * scale}px`, border: "3px solid brown", borderTop: "none", borderRadius: "0 0 10px 10px", background: "#514318ff",}}/>
        {/* Ball */}
        <div style={{ position: "absolute", width: `${ballRadius * 2 * scale}px`, height: `${ballRadius * 2 * scale}px`, borderRadius: "50%", background: "orange", left: `${ballPos.x * scale}px`, bottom: `${ballPos.y * scale}px`, transition: "all 0.05s linear",}}/>
      </div>

      {/* Render the History Modal */}
      {isModalOpen && (
        <HistoryModal 
          data={historyData} 
          onClose={() => setIsModalOpen(false)}
          onClearHistory={clearHistory}
        />
      )}
    </div>
  );
}

// -------------------------------------------------------------------
// 3. HistoryModal Component (Must be included or imported)
// -------------------------------------------------------------------

const formatDate = (isoString) => {
  if (!isoString) return 'N/A';
  return new Date(isoString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

function HistoryModal({ data, onClose, onClearHistory }) {
  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <h2>Simulation History ({data.length} records)</h2>
          <button onClick={onClose} style={styles.closeButton}>&times;</button>
        </div>
        
        <div style={styles.body}>
          {data.length === 0 ? (
            <p style={{textAlign: 'center', color: '#666'}}>No history records found. Run a simulation to save data.</p>
          ) : (
            data.map((result, index) => (
              <div key={result._id || index} style={styles.record}>
                <span style={styles.status}>
                  {result.scored ? '✅ HIT' : '❌ MISS'}
                </span>
                <p><strong>Time:</strong> {formatDate(result.timestamp)}</p>
                <p>Angle: {result.angle}° | Speed: {result.speed} m/s</p>
                <p>Max Ht: {result.maxHeight} m | Range: {result.range} m | Time of Flight: {result.time} s</p>
              </div>
            ))
          )}
        </div>
        
        <div style={styles.footer}>
            <button onClick={onClearHistory} style={styles.clearButton}>
                Clear All History
            </button>
            <button onClick={onClose} style={styles.footerButton}>Close</button>
        </div>
      </div>
    </div>
  );
}

// Simple styling object for the modal
const styles = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '25px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '80%',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid #ddd',
    paddingBottom: '10px',
    marginBottom: '10px',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '2rem',
    cursor: 'pointer',
    color: '#333',
  },
  body: {
    overflowY: 'auto',
    flexGrow: 1,
    padding: '10px 0',
  },
  record: {
    border: '1px solid #ccc',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '6px',
    position: 'relative',
    backgroundColor: '#fefefe',
    fontSize: '0.9rem',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  status: {
    position: 'absolute',
    top: '10px',
    right: '15px',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  footer: {
    marginTop: '20px',
    paddingTop: '10px',
    borderTop: '1px solid #ddd',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  clearButton: {
    padding: '10px 20px',
    cursor: 'pointer',
    backgroundColor: '#dc3545', 
    color: 'white',
    border: 'none',
    borderRadius: '4px',
  },
  footerButton: {
    padding: '10px 20px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
  }
};