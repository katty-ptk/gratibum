import logo from '../../images/logo.png';
import test from '../../images/tests/test.png';
import more from '../../images/icons/arrow_down.png';

const Gratitude = ({ data, handleClick }) => {
    return (
        <div className="gratitude"
            onClick={ () => handleClick( data.id ) }
        >
            <div className="image">
                <img src={test} alt="" />
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
        </div>
    );
}

export default Gratitude;