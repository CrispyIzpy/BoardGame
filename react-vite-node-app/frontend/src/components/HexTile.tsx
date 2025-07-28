import React from 'react';
import woodImage from '../assets/pixil-frame-0.png';

interface HexTileProps {
    id: number;
    number: number;
    type: number;
}


// for img
// const HexTile: React.FC<HexTileProps> = ({ id, number }) => {
//     return (
//         <div
//             id={`tile-${id}`}
//             className="hex"
//             style={{
//                 backgroundColor: number === 7 ? 'gray' : undefined,
//                 backgroundImage: `url(${woodImage})`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center'
//             }}
//         >
//             {<div className="number-token">{number}</div>}
//         </div>
//     );
// };

const HexTile: React.FC<HexTileProps> = ({ id, number, type }) => {
    return (
        <div id={`tile-${id}`} className="hex" data-number={number} style={number == 7 ? { backgroundColor: 'gray' } : undefined}>
            {<div className="number-token">{number}</div>}
        </div>
    );
};

export default HexTile;
