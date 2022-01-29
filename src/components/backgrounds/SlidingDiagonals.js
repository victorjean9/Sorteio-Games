import React from 'react';
import '../../styles/backgrounds/SlidingDiagonals.css';

const SlidingDiagonals = (props) => (
    <div>
        {
            props.visible
            ?   <>
                    <div className="bg-sliding-diagonals"></div>
                    <div className="bg-sliding-diagonals bg2-sliding-diagonals"></div>
                    <div className="bg-sliding-diagonals bg3-sliding-diagonals"></div>
                </>
            :   null
        }
    </div>
);

export default SlidingDiagonals;