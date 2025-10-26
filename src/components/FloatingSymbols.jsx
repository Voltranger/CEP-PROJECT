const symbols = ["+", "-", "×", "÷", "=", "π", "θ", "∑", "√", "∞"];

export default function FloatingSymbols() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 40 }).map((_, idx) => {
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        const size = Math.floor(Math.random() * 28 + 16); // 16px to 44px
        const left = Math.floor(Math.random() * 100); // horizontal position %
        const duration = Math.random() * 25 + 15; // 15s to 40s
        const delay = Math.random() * 5; // staggered start
        const rotation = Math.random() * 360;

        return (
          <span
            key={idx}
            className="absolute text-white opacity-30"
            style={{
              fontSize: `${size}px`,
              left: `${left}%`,
              transform: `rotate(${rotation}deg)`,
              animation: `floatUp ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
            }}
          >
            {symbol}
          </span>
        );
      })}
    </div>
  );
}
