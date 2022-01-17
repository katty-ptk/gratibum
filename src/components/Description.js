import React from 'react';

import img1 from '../images/1.jpg';
import img2 from '../images/2.jpg';
import img3 from '../images/3.jpg';
import img4 from '../images/4.jpg';

const Description = () => {
    return (
        <section className='description-card'>
            <div className="mini-images">
                <img src={ img1 } alt="memory" />
                <img src={ img2 } alt="memory" />
                <img src={ img3 } alt="memory" />
                <img src={ img4 } alt="memory" />
            </div>
            <p className="description">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>
        </section>
    )
}

export default Description;