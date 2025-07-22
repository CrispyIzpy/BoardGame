import { useEffect, useState, type JSX } from 'react';
import './App.css';

const App = () => {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const maxNum = 12;
  const minNum = 2;

  // make it so all of the tiles have a random number
  // in the game there is 2 of each number exept 2, 8 and 12
  const RandFieldNumber = (): number => {
    Math.floor(Math.random() * (maxNum - minNum) + minNum)

    return 1;
  }

  const renderRow = (rowLength: number): JSX.Element => {
    const row: JSX.Element[] = [];

    for (let c = 0; c < rowLength; c++) {
      const isEven = c % 2 === 0;

      row.push(
        <div
          className="hex"
          style={isEven ? undefined : { backgroundColor: 'blue' }}
        >
          {RandFieldNumber()}
        </div>
      );
    }

    return (
      <div className="hex-row" key={`row-${rowLength}-${Math.random()}`}>
        {row}
      </div>
    );
  }

  const maxRowLenght = 5;
  const minRowLenght = 3;

  const renderHexGrid = (): JSX.Element[] => {
    const hexGrid: JSX.Element[] = [];

    // Rows going up
    for (let r = minRowLenght; r < maxRowLenght; r++) {
      hexGrid.push(renderRow(r));
    }

    // Rows going down
    for (let r = maxRowLenght; r >= minRowLenght; r--) {
      hexGrid.push(renderRow(r));
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
