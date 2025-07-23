import { useEffect, useState, type JSX } from 'react';
import './App.css';
import HexTile from './components/HexTile';

interface HexTileProps {
  id: number;
  number: number;
  isEven: boolean;
}

const App = () => {
  const [serverConnected, setServerConnected] = useState<boolean | null>(null);
  const [hexTiles, setHexTiles] = useState<HexTileProps[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/generateHexTiles?rowLenght=19')
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
