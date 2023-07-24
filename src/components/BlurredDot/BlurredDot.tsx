import { useState } from "react";

function BlurredDot() {
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    setDotPosition({ x: clientX, y: clientY });
  };

  return (
    <div className="blurred-dot-container" onMouseMove={handleMouseMove}>
      <div
        className="blurred-dot"
        style={{ left: `${dotPosition.x}px`, top: `${dotPosition.y}px` }}
      ></div>
    </div>
  );
}

export default BlurredDot;
