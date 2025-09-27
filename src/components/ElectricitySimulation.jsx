import React, { useState } from "react";

// ElectricitySimulation.jsx
// Single-file React component (Tailwind CSS assumed) that demonstrates
// a simple circuit with battery, bulb, switch, and animated "electrons".
// Default export a React component.

export default function ElectricitySimulation() {
  const [isClosed, setIsClosed] = useState(false);
  const [material, setMaterial] = useState("conductor"); // conductor or insulator
  const [voltage, setVoltage] = useState(6); // 0 - 12 volts
  const [electronCount, setElectronCount] = useState(8);

  const active = isClosed && material === "conductor" && voltage > 0;

  // Brightness maps roughly voltage to bulb glow intensity
  const brightness = Math.min(1, voltage / 12);

  // Electron speed (lower = faster) — derived from voltage so higher voltage => faster
  const electronDuration =
    (12 - Math.min(12, Math.max(0, voltage))) / 6 + 0.6; // between 0.6s and ~2s

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h1 className="text-2xl font-bold mb-3">Electricity Simulation</h1>
      <p className="mb-4 text-gray-700">
        This interactive simulation shows a simple circuit: a battery, wires, a
        switch and a bulb. Toggle the switch, change the material and adjust
        voltage to see how the bulb lights and electrons flow.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Controls */}
        <div className="col-span-1 bg-white p-4 rounded-2xl shadow">
          <h2 className="font-semibold mb-2">Controls</h2>
          <div className="mb-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isClosed}
                onChange={(e) => setIsClosed(e.target.checked)}
                className="w-5 h-5"
              />
              <span>Switch Closed (circuit complete)</span>
            </label>
            <div className="text-sm text-gray-500 mt-1">
              When closed, current can flow if material is a conductor.
            </div>
          </div>

          <div className="mb-3">
            <label className="block font-medium">Material</label>
            <select
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="mt-1 w-full rounded-md border px-2 py-1"
            >
              <option value="conductor">
                Conductor (copper) — allows electricity
              </option>
              <option value="insulator">
                Insulator (rubber) — blocks electricity
              </option>
            </select>
            <div className="text-sm text-gray-500 mt-1">
              Choose a material for the wires.
            </div>
          </div>

          <div className="mb-3">
            <label className="block font-medium">Voltage: {voltage} V</label>
            <input
              type="range"
              min={0}
              max={12}
              value={voltage}
              onChange={(e) => setVoltage(Number(e.target.value))}
              className="w-full mt-1"
            />
            <div className="text-sm text-gray-500 mt-1">
              Higher voltage → brighter bulb & faster electrons.
            </div>
          </div>

          <div className="mb-3">
            <label className="block font-medium">
              Number of electrons (visual)
            </label>
            <input
              type="range"
              min={0}
              max={18}
              value={electronCount}
              onChange={(e) => setElectronCount(Number(e.target.value))}
              className="w-full mt-1"
            />
            <div className="text-sm text-gray-500 mt-1">
              More electrons make the flow easier to see (visual only).
            </div>
          </div>

          <div className="mt-3 text-sm">
            <div>
              <strong>Status:</strong>{" "}
              {active ? "Current flowing ✅" : "No current ⚠️"}
            </div>
            <div>Switch: {isClosed ? "Closed" : "Open"}</div>
            <div>Material: {material}</div>
          </div>
        </div>

        {/* Simulation visual */}
        <div className="col-span-2 bg-white p-6 rounded-2xl shadow relative overflow-hidden">
          <h2 className="font-semibold mb-2">Circuit</h2>
          <div className="flex items-center gap-6">
            {/* Left: Battery */}
            <div className="flex-shrink-0 w-28 text-center">
              <div className="mb-2 font-medium">Battery</div>
              <div className="inline-block p-2 rounded bg-gray-50 border">
                <div className="text-sm">{voltage} V</div>
                <div className="mt-2 flex flex-col items-center gap-1">
                  <div className="w-8 h-6 bg-gray-800 rounded-sm text-white flex items-center justify-center text-xs">
                    +
                  </div>
                  <div className="w-8 h-6 bg-gray-300 rounded-sm flex items-center justify-center text-xs">
                    -
                  </div>
                </div>
              </div>
            </div>

            {/* Middle: circuit drawing */}
            <div className="flex-1">
              <div className="relative h-48">
                {/* Top wire (with switch) */}
                <div className="absolute left-0 right-0 top-4 flex items-center justify-between px-6">
                  <div
                    className={`h-2 flex-1 ${
                      material === "insulator"
                        ? "bg-yellow-200"
                        : "bg-blue-300"
                    } rounded`}
                  ></div>

                  {/* switch */}
                  <button
                    onClick={() => setIsClosed((s) => !s)}
                    className={`ml-2 px-3 py-1 rounded-md border ${
                      isClosed ? "bg-green-100" : "bg-red-50"
                    }`}
                    aria-pressed={isClosed}
                  >
                    {isClosed ? "Closed" : "Open"}
                  </button>

                  <div
                    className={`h-2 flex-1 ${
                      material === "insulator"
                        ? "bg-yellow-200"
                        : "bg-blue-300"
                    } rounded`}
                  ></div>
                </div>

                {/* Left vertical wire */}
                <div className="absolute left-24 top-12 w-6 h-28 flex items-center justify-center">
                  <div
                    className={`${
                      material === "insulator"
                        ? "bg-yellow-200"
                        : "bg-blue-300"
                    } w-2 h-full rounded`}
                  ></div>
                </div>

                {/* Right vertical wire */}
                <div className="absolute right-24 top-12 w-6 h-28 flex items-center justify-center">
                  <div
                    className={`${
                      material === "insulator"
                        ? "bg-yellow-200"
                        : "bg-blue-300"
                    } w-2 h-full rounded`}
                  ></div>
                </div>

                {/* Bulb in center */}
                <div className="absolute left-1/2 top-8 transform -translate-x-1/2">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center relative"
                      style={{
                        background: `radial-gradient(circle at 30% 35%, rgba(255,241,150,${brightness}), rgba(255,200,80,${
                          0.6 * brightness
                        }), rgba(120,120,120,0.15))`,
                        boxShadow: active
                          ? `0 0 ${20 * brightness}px rgba(255,200,80,${
                              0.6 * brightness
                            })`
                          : "none",
                        transition: "all 300ms linear",
                        border: "1px solid #e6e6e6",
                      }}
                    >
                      {/* filament */}
                      <div
                        className="w-10 h-1 bg-gray-700 rounded-full"
                        style={{ opacity: active ? 1 : 0.25 }}
                      ></div>
                    </div>
                    <div className="text-sm mt-2 font-medium">Bulb</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {active
                        ? `Bright (≈ ${Math.round(brightness * 100)}%)`
                        : "Off"}
                    </div>
                  </div>
                </div>

                {/* Animated electrons on top wire */}
                <div className="absolute left-6 right-6 top-3 h-6 pointer-events-none overflow-hidden">
                  <div className="relative h-full">
                    {Array.from({ length: electronCount }).map((_, i) => {
                      const delay =
                        (i * (1 / Math.max(1, electronCount))) *
                        electronDuration *
                        1000 *
                        -1;
                      return (
                        <div
                          key={i}
                          className={`electron ${
                            active ? "running" : "stopped"
                          }`}
                          style={{
                            position: "absolute",
                            left: `${
                              (i / Math.max(1, electronCount)) * 100
                            }%`,
                            top: 0,
                            width: 10,
                            height: 10,
                            borderRadius: 9999,
                            background: "#1f6feb",
                            transform: "translateX(-50%)",
                            animationDuration: `${electronDuration}s`,
                            animationDelay: `${delay}ms`,
                            opacity: active ? 1 : 0.25,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Animated electrons on bottom wire */}
                <div className="absolute left-6 right-6 bottom-8 h-6 pointer-events-none overflow-hidden">
                  <div className="relative h-full">
                    {Array.from({ length: electronCount }).map((_, i) => {
                      const delay =
                        (i * (1 / Math.max(1, electronCount))) *
                        electronDuration *
                        1000 *
                        -1;
                      return (
                        <div
                          key={`b-${i}`}
                          className={`electron ${
                            active ? "running-rev" : "stopped"
                          }`}
                          style={{
                            position: "absolute",
                            left: `${
                              (i / Math.max(1, electronCount)) * 100
                            }%`,
                            top: 0,
                            width: 10,
                            height: 10,
                            borderRadius: 9999,
                            background: "#1f6feb",
                            transform: "translateX(-50%)",
                            animationDuration: `${electronDuration}s`,
                            animationDelay: `${delay}ms`,
                            opacity: active ? 1 : 0.25,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Explanatory overlay */}
                <div className="absolute left-6 bottom-0 text-xs text-gray-600">
                  <div>Blue wires = conductor, Yellow = insulator.</div>
                  <div>
                    When circuit is closed and material is a conductor,
                    electrons flow and the bulb lights.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Legend & explanation under visual */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded bg-gray-50">
              <div className="font-semibold">What happens here?</div>
              <p className="text-sm text-gray-700 mt-1">
                When the switch is closed, a complete path called a circuit is
                formed. If the wires are made of a conductor, tiny electrons move
                through the wire from the negative side of the battery to the
                positive side. This flow of electrons is called electric current
                and it makes the bulb glow. If the wire is an insulator or the
                switch is open, electrons cannot move and the bulb stays off.
              </p>
            </div>

            <div className="p-3 rounded bg-gray-50">
              <div className="font-semibold">Teaching tips</div>
              <ul className="text-sm text-gray-700 mt-1 list-disc ml-5">
                <li>Ask students which setting makes the bulb glow and why.</li>
                <li>
                  Compare motion of electrons to water flow: more voltage →
                  faster flow → brighter bulb.
                </li>
                <li>
                  Demonstrate conductors (metal) vs insulators (rubber) in the
                  real lab alongside the simulation.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Inline styles for electron animations */}
      <style>{`
        .electron.running {
          animation-name: electronMove;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .electron.running-rev {
          animation-name: electronMoveRev;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .electron.stopped {
          transform: translateX(-50%);
        }

        @keyframes electronMove {
          0% { transform: translateX(-50%) translateX(0%); }
          100% { transform: translateX(-50%) translateX(100%); }
        }
        @keyframes electronMoveRev {
          0% { transform: translateX(-50%) translateX(0%); }
          100% { transform: translateX(-50%) translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
