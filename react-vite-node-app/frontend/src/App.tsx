import { useEffect, useState, type JSX } from 'react';
import './App.css';
import HexTile from './components/HexTile';
import { generateNumberPool, shuffleArray } from './utils/generateNumberPool';

interface HexTileProps {
  id: number;
  number: number;
  isEven: boolean;
}

const App = () => {
  const [data, setData] = useState<string | null>(null);
  const [hexTiles, setHexTiles] = useState<HexTileProps[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/generateHexTiles')
      .then((res) => res.json())
      .then((hexTiles) => setHexTiles(hexTiles));
  }, []);

  console.log(hexTiles);

  const renderHexGrid = (): JSX.Element[] => {
    const hexGrid: JSX.Element[] = [];
    let index = 0;
    const rowLengths = [3, 4, 5, 4, 3]; // diamond shape

    for (let row = 0; row < rowLengths.length; row++) {
      const length = rowLengths[row];
      const rowTiles = hexTiles.slice(index, index + length);

      const rowElements = rowTiles.map((tile) => (
        <HexTile
          key={tile.id}
          id={tile.id}
          number={tile.number}
          isEven={tile.isEven}
        />
      ));

      hexGrid.push(
        <div className="hex-row" key={`row-${row}`}>
          {rowElements}
        </div>
      );

      index += length;
    }

    return hexGrid;
  };

  return (
    <>
      <h1>{data || 'Loading...'}</h1>
      <div className="hex-grid">{renderHexGrid()}</div>
    </>
  );
};

export default App;
