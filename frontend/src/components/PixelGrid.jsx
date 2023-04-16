import { useState, useContext } from "react";
import "./PixelGrid.css";
import { ImageContext,PredictionContext } from "./Context";

function PixelGrid({ rows, cols }) {
  const {prediction,setPrediction} = useContext(PredictionContext);
  const { image,setImage } = useContext(ImageContext);

  const [pixelColors, setPixelColors] = useState(
    Array.from({ length: rows }, () => Array.from({ length: cols }, () => "#fff"))
  );

  const [isDragging, setIsDragging] = useState(false);

  const [selectedPixelColors, setSelectedPixelColors] = useState([]);

  const handleClick = (rowIndex, colIndex) => {
    const newPixelColors = [...pixelColors];

    // Update color of clicked pixel
    newPixelColors[rowIndex][colIndex] = "#0CA02C";

    // Update state with new pixel colors
    setPixelColors(newPixelColors);

    // Add selected pixel color to state
    setSelectedPixelColors([
      ...selectedPixelColors,
      [rowIndex, colIndex, "#0CA02C"],
    ]);
  };

  const handleMouseDown = (rowIndex, colIndex) => {
    setIsDragging(true);
    handleClick(rowIndex, colIndex);
  };

  const handleMouseEnter = (rowIndex, colIndex) => {
    if (isDragging) {
      handleClick(rowIndex, colIndex);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleExport = () => {
    const selectedPixelColors2D = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const pixel = selectedPixelColors.find(
          ([rowIndex, colIndex]) => rowIndex === i && colIndex === j
        );
        row.push(pixel ? 255 : 0);
      }
      selectedPixelColors2D.push(row);
    }
    setImage(selectedPixelColors2D);
    console.log(image);
  };

  const handleReset = () => {
    setPixelColors(Array.from({ length: rows }, () => Array.from({ length: cols }, () => "#fff")));
    setSelectedPixelColors([]);
    setPrediction("");
  };

  return (
    <div className="pixel-grid">
      {pixelColors.map((row, rowIndex) => (
        <div key={rowIndex} className="pixel-row">
          {row.map((color, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="pixel"
              style={{ backgroundColor: color }}
              onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              onMouseUp={handleMouseUp}
            />
          ))}
        </div>
      ))}
      <div className="button-container">
        <button className="reset-button" onClick={handleReset}>
          Reset
        </button>
        <button className="export-button" onClick={handleExport}>
          Export
        </button>
      </div>
    </div>
  );  
}

export default PixelGrid;
