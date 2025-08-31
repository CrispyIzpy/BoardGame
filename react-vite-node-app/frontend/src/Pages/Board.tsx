import axios from "axios";
import { useEffect, useState, type JSX } from "react";
import "../styles/Board.css";
import HexTile from "../components/HexTile";
import { useNavigate } from "react-router-dom";

interface HexTileProps {
  id: number;
  number: number;
  type: number;
}

const Board = () => {
  const navigate = useNavigate();
  const [hexTiles, setHexTiles] = useState<HexTileProps[]>([]);

  const rowLengths = [3, 4, 5, 4, 3]; // diamond shape
  useEffect(() => {
    axios
      .post(
        "http://localhost:5000/api/generateHexTiles",
        { rowLengths: rowLengths },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        setHexTiles(response.data);
      })
      .catch((error) => {
        if (error.status == 401) {
          console.error("Please log in:", error);

          const message = "Please login or register!";
          const encodedMessage = encodeURIComponent(message);
          navigate(`/auth?message=${encodedMessage}`);
          return;
        }
        console.error("Error fetching tiles:", error);
      });
  }, []);

  const handleClick = (roadId: number, tileId: number) => {
    axios
      .post(
        "http://localhost:5000/api/makeMove",
        { roadId: roadId, tileId: tileId },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log("Success:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const renderHexGrid = (): JSX.Element[] => {
    const hexGrid: JSX.Element[] = [];
    let index = 0;

    for (let row = 0; row < rowLengths.length; row++) {
      const length = rowLengths[row];
      const rowTiles = hexTiles.slice(index, index + length);

      const rowElements = rowTiles.map((tile, colIndex) => {
        const rightEdge = colIndex === length - 1;

        // left edge
        const leftEdge = colIndex === 0;

        // top edge
        const topEdge = row === 0;

        const topHalf = row < rowLengths.length / 2;

        return (
          <HexTile
            key={tile.id}
            id={tile.id}
            number={tile.number}
            type={tile.type}
            onClick={(roadId: number, tileId: number) =>
              handleTileClick(roadId, tileId)
            }
            leftEdge={leftEdge}
            topEdge={topEdge}
            rightEdge={rightEdge}
            topHalf={topHalf}
          />
        );
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

  const handleTileClick = (roadId: number, tileId: number) => {
    handleClick(roadId, tileId);
    // console.log('Clicked road:', roadId, 'From tile:', tileId);
    // alert(`'Clicked road:', ${roadId}, 'From tile:', ${tileId}`);
  };

  return (
    <>
      <div className="hex-grid">{renderHexGrid()}</div>
    </>
  );
};

export default Board;
