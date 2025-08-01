import React from 'react';
import woodImage from '../assets/pixil-frame-0.png';

interface HexTileProps {
    id: number;
    number: number;
    type: number;
    onClick: (roadId: number, id: number) => void;
    leftEdge: boolean
    topEdge: boolean
    topHalf: boolean
    rightEdge: boolean
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

// id 0
const LeftRoad = (id: number, onClick: (roadId: number, id: number) => void) => {
    return (
        <div className="road-wrapper road-left-wrapper" onClick={() => onClick(0, id)}>
            <div className="road"></div>
        </div>
    )
}
// id 1
const LeftUnderRoad = (id: number, onClick: (roadId: number, id: number) => void) => {
    return (
        <div className="road-wrapper road-left-under-wrapper" onClick={() => onClick(1, id)}>
            <div className="road"></div>
        </div>
    )
}
// id 2
const RightUnderRoad = (id: number, onClick: (roadId: number, id: number) => void) => {
    return (
        <div className="road-wrapper road-right-under-wrapper" onClick={() => onClick(2, id)}>
            <div className="road"></div>
        </div>
    )
}
// id 3
const RightRoad = (id: number, onClick: (roadId: number, id: number) => void) => {
    return (
        <div className="road-wrapper road-right-wrapper" onClick={() => onClick(3, id)}>
            <div className="road"></div>
        </div>
    )
}
// id 4
const RightTopRoad = (id: number, onClick: (roadId: number, id: number) => void) => {
    return (
        <div className="road-wrapper road-right-top-wrapper" onClick={() => onClick(4, id)}>
            <div className="road"></div>
        </div>
    )
}
// id 5
const LeftTopRoad = (id: number, onClick: (roadId: number, id: number) => void) => {
    return (
        <div className="road-wrapper road-left-top-wrapper" onClick={() => onClick(5, id)}>
            <div className="road"></div>
        </div>
    )
}

// // Settlement (circle) components
// const TopLeftSettlement = (id: number, onSettlementClick: (settlementId: number, id: number) => void) => {
//     return (
//         <div className="settlement-wrapper settlement-top-left-wrapper" onClick={() => onSettlementClick(0, id)}>
//             <div className="settlement"></div>
//         </div>
//     )
// }

// const TopRightSettlement = (id: number, onSettlementClick: (settlementId: number, id: number) => void) => {
//     return (
//         <div className="settlement-wrapper settlement-top-right-wrapper" onClick={() => onSettlementClick(1, id)}>
//             <div className="settlement"></div>
//         </div>
//     )
// }

// const LeftSettlement = (id: number, onSettlementClick: (settlementId: number, id: number) => void) => {
//     return (
//         <div className="settlement-wrapper settlement-left-wrapper" onClick={() => onSettlementClick(2, id)}>
//             <div className="settlement"></div>
//         </div>
//     )
// }

// const RightSettlement = (id: number, onSettlementClick: (settlementId: number, id: number) => void) => {
//     return (
//         <div className="settlement-wrapper settlement-right-wrapper" onClick={() => onSettlementClick(3, id)}>
//             <div className="settlement"></div>
//         </div>
//     )
// }

// const BottomLeftSettlement = (id: number, onSettlementClick: (settlementId: number, id: number) => void) => {
//     return (
//         <div className="settlement-wrapper settlement-bottom-left-wrapper" onClick={() => onSettlementClick(4, id)}>
//             <div className="settlement"></div>
//         </div>
//     )
// }

// const BottomRightSettlement = (id: number, onSettlementClick: (settlementId: number, id: number) => void) => {
//     return (
//         <div className="settlement-wrapper settlement-bottom-right-wrapper" onClick={() => onSettlementClick(5, id)}>
//             <div className="settlement"></div>
//         </div>
//     )
// }

const HexTile: React.FC<HexTileProps> = ({ id, number, type, onClick, leftEdge, topEdge, topHalf, rightEdge }) => {
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
            {RightRoad(id, onClick)}

            {LeftUnderRoad(id, onClick)}

            {RightUnderRoad(id, onClick)}

            {/* Adding roads to the left edge */}
            {leftEdge && LeftRoad(id, onClick)}

            {/* Adding roads to the top edge */}
            {topEdge && (
                <>
                    {LeftTopRoad(id, onClick)}
                    {RightTopRoad(id, onClick)}
                </>
            )
            }

            {leftEdge && topHalf && !topEdge && LeftTopRoad(id, onClick)}

            {rightEdge && topHalf && !topEdge && RightTopRoad(id, onClick)}

            {/* {TopLeftSettlement(id, onClick)}
            {TopRightSettlement(id, onClick)}
            {LeftSettlement(id, onClick)}
            {RightSettlement(id, onClick)}
            {BottomLeftSettlement(id, onClick)}
            {BottomRightSettlement(id, onClick)} */}
        </div >
    );
};

export default HexTile;
