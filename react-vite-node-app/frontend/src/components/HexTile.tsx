import React from 'react';

interface HexTileProps {
    id: number;
    number: number;
    isEven: boolean;
}

const HexTile: React.FC<HexTileProps> = ({ id, number, isEven }) => {
    return (
        <div id={`tile-${id}`} className="hex" data-number={number} style={number == 7 ? { backgroundColor: 'gray' } : undefined}>
            {number !== 0 ? number : ''}
        </div>
    );
};

export default HexTile;
