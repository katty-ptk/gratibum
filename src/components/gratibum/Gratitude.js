import logo from '../../images/logo.png';
import test from '../../images/tests/test.png';
import test2 from '../../images/tests/test2.png';
import more from '../../images/icons/arrow_down.png';

const Gratitude = ({ data, handleClick, mode }) => {
    return (
        <div className={ mode == "portrait" ?  "gratitude flex-row" : "gratitude flex-column" }
            onClick={ () => handleClick( data.id ) }
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
        </div>
    );
}

export default Gratitude;