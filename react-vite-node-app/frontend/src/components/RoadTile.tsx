import React from 'react';
import woodImage from '../assets/pixil-frame-0.png';

interface RoadTileProps {
    id: number;
    type: number;
}

const HexTile: React.FC<RoadTileProps> = ({ id, type }) => {
    return (
        <div id={`road-${id}`} className="road">
            { }
        </div>
    );
};

export default HexTile;
