import React from 'react';
import woodImage from '../assets/pixil-frame-0.png';

interface RoadTileProps {
    id: number;
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

const HexTile: React.FC<RoadTileProps> = ({ id, type }) => {
    return (
        <div id={`road-${id}`} className="road">
            { }
        </div>
    );
};

export default HexTile;
