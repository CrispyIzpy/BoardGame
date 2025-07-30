import React from 'react';
import woodImage from '../assets/pixil-frame-0.png';

interface HexTileProps {
    id: number;
    number: number;
    type: number;
    onClick: (roadId: number, id: number) => void;
    leftEdge: boolean
    topEdge: boolean
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

const HexTile: React.FC<HexTileProps> = ({ id, number, type, onClick, leftEdge, topEdge }) => {
    return (

        <div id={`tile-${id}`} className="hex-container">
            <div
                className="hex"
                data-number={number}
                style={number == 7 ? { backgroundColor: 'gray' } : undefined}
            >
                <div className="number-token">{number}</div>
            </div>

            {/* Roads as children of the hex tile */}

            <div className="road-wrapper road-right-wrapper" onClick={() => onClick(0, id)}>
                <div className="road"></div>
            </div>

            <div className="road-wrapper road-left-under-wrapper" onClick={() => onClick(1, id)}>
                <div className="road"></div>
            </div>

            <div className="road-wrapper road-right-under-wrapper" onClick={() => onClick(2, id)}>
                <div className="road"></div>
            </div>
            {leftEdge && (
                <div className="road-wrapper road-left-wrapper" onClick={() => onClick(3, id)}>
                    <div className="road"></div>
                </div>
            )}

            {topEdge && (
                <>
                    <div className="road-wrapper road-left-top-wrapper" onClick={() => onClick(4, id)}>
                        <div className="road"></div>
                    </div>
                    <div className="road-wrapper road-right-top-wrapper" onClick={() => onClick(5, id)}>
                        <div className="road"></div>
                    </div>
                </>
            )}
        </div>
    );
};

export default HexTile;
