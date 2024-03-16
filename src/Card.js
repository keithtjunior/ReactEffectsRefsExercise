import React, { useState }from 'react';

const Card = ({image, value, suit}) => {
    const random = Math.ceil(Math.random() * 12) * (Math.round(Math.random()) ? 1 : -1);
    const [randomNum, setRandomNum] = useState(random)
    return (
        <div className='card'>
            <img 
                src={image} 
                alt={`${value} of ${suit}`} 
                width='230px' 
                height='315px' 
                style={{transform: `rotate(${randomNum}deg)`}}/>
        </div>
    )
}

export default Card;