import React from "react";

interface RoadTileProps {
  id: number;
  type: number;
}

const HexTile: React.FC<RoadTileProps> = ({ id }) => {
  return (
    <div id={`road-${id}`} className="road">
      {}
    </div>
  );
};

export default HexTile;
