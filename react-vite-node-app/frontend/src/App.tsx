import { useEffect, useState, type JSX } from 'react';
import './App.css';
import HexTile from './components/HexTile';

interface HexTileProps {
  id: number;
  number: number;
  type: number;
}

const App = () => {
  const [serverConnected, setServerConnected] = useState<boolean | null>(null);
  const [hexTiles, setHexTiles] = useState<HexTileProps[]>([]);

  const rowLengths = [3, 4, 5, 4, 3]; // diamond shape
  useEffect(() => {
    fetch('http://localhost:5000/api/generateHexTiles', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rowLengths),
    }
    )
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((hexTiles) => {
        setHexTiles(hexTiles);
        setServerConnected(true);
      })
      .catch((err) => {
        console.error('Error fetching tiles:', err);
        setServerConnected(false);
      });
  }, []);

  console.log(hexTiles);

  const renderHexGrid = (): JSX.Element[] => {
    const hexGrid: JSX.Element[] = [];
    let index = 0;

    for (let row = 0; row < rowLengths.length; row++) {
      const length = rowLengths[row];
      const rowTiles = hexTiles.slice(index, index + length);

      const rowElements = rowTiles.map((tile, colIndex) => {
        const rightEdge = colIndex === length - 1;

        // Check if tile is on bottom edge (last row)
        const underEdge = row === rowLengths.length - 1;

        // You might also want left edge
        const leftEdge = colIndex === 0;

        // And top edge
        const topEdge = row === 0;

        return (
          <HexTile
            key={tile.id}
            id={tile.id}
            number={tile.number}
            type={tile.type}
            onClick={(roadId: number, id: number) => handleTileClick(roadId, id)}
            leftEdge={leftEdge}
          />
        )
      });

      hexGrid.push(
        <div className="hex-row" key={`row-${row}`}>
          {rowElements}
        </div>
      );

      index += length;
    }

    return hexGrid;
  };

  const handleTileClick = (roadId: number, id: number) => {
    console.log('Clicked road:', roadId, 'From tile:', id);
    alert(`'Clicked road:', ${roadId}, 'From tile:', ${id}`);
  };

  return (
    <>
      <div
        className={`connection-status ${serverConnected === null
          ? 'connecting'
          : serverConnected
            ? 'connected'
            : 'disconnected'
          }`}
      >
        {serverConnected === null
          ? 'Connecting to server...'
          : serverConnected
            ? 'Server connected'
            : 'Server disconnected'}
      </div>

      <div className="hex-grid">{renderHexGrid()}</div>
    </>
  );
};

export default App;
