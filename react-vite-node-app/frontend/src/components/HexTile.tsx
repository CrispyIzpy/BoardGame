import React from 'react';

interface HexTileProps {
    id: number;
    number: number;
    isEven: boolean;
}

const HexTile: React.FC<HexTileProps> = ({ id, number, isEven }) => {
    return (
        <div id={`tile-${id}`} className="hex" style={number == 0 ? { backgroundColor: 'gray' } : undefined}>
            {number}
        </div>
    );
};

export default HexTile;
