import logo from '../../images/logo.png';
import test from '../../images/tests/test.png';
import test2 from '../../images/tests/test2.png';
import more from '../../images/icons/arrow_down.png';

import {  motion, useReducedMotion } from 'framer-motion';

const gratitudeVariants = {
    initial: {
        opacity: 0
    },

    animate: {
        opacity: 1,
        transition: { type: 'spring', stiffness: 100 }
    }
}

const Gratitude = ({ data, handleClick, mode }) => {
    return (
        <motion.div className={ mode == "portrait" || mode == "square" ?  "gratitude flex-row" : "gratitude flex-column" }
            onClick={ () => handleClick( data.id ) }
            variants={ gratitudeVariants }
            initial="initial"
            animate="animate"
        >
            <div className="image">
                <img src={ data.imageUrl != "" ? data.imageUrl : logo } 
                
                />
            </div>

            <div className="text">
                <h2>{ data.title }</h2>
                {/* <p>
                    { data.description }
                </p> */}
            </div>

            {/* <div className="more"> */}
                <img className="more" src={more} alt=""
                 />
            {/* </div> */}
        </motion.div>
    );
}

export default Gratitude;