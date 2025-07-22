import React from 'react';

interface HexTileProps {
    id: number;
    number: number;
    isEven: boolean;
}

const HexTile: React.FC<HexTileProps> = ({ id, number, isEven }) => {
    return (
        <div id={`tile-${id}`} className="hex" style={isEven ? undefined : { backgroundColor: 'blue' }}>
            {number}
        </div>
    );
};

export default HexTile;
