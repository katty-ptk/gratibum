import React from 'react';

import img1 from '../images/1.jpg';
import img2 from '../images/RealGratitudes/2.jpg';
import img3 from '../images/RealGratitudes/1.1.jpg';
import img4 from '../images/RealGratitudes/4.jpg';

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
                Gratibum the Gratitude Album. It helps you save moments and ideas you want to be reminded of. Moments with your family, or heart warming messages. With Gratibum you can save pictures and messages and let it remind you about them with configured periodical notifications.
        </p>
        </section>
    )
}

export default Description;