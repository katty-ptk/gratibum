import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useTranslation } from "react-i18next";

import back from '../../images/icons/back.png';
import trash from '../../images/icons/trash.png';
import edit from '../../images/icons/edit.png';

import test from '../../images/tests/test.png';

const FocusedGratitude = () => {
    const { id } = useParams();
    const history = useHistory();
    const { t } = useTranslation();

    const gratibums = JSON.parse(localStorage.getItem("gratibums"));

    let gratitudes = [];
    for (var key in gratibums) {
      if (gratibums.hasOwnProperty(key)) {
        gratitudes.push( gratibums[key] );
      }
    }

    let focused = gratitudes.filter( gratitude => gratitude.date.seconds === parseInt(id) );


    console.log( focused );
  
    return (
        <div className={ window.innerWidth < 1000 ? 'focused-gratitude focused-gratitude-small' : 'focused-gratitude focused-gratitude-large'}>
            
            <div className="image">
              <img src={ test } alt="gratitude image" className="gratitude-image" />
            </div>

            <div className="text">

              <div className="buttons">
                <img src={back}
                  onClick={ () => history.push('/gratibum') }
                 />
                <img src={edit}
                  onClick={ () => history.push('/') }
                 />
                <img src={trash} 
                  onClick={ () => history.push('/') }
                />
              </div>

              <h1>{ focused[0].title }</h1>

              <div className="question">
                <p>
                  { t('q_what') }
                </p>
                <p>
                  { focused[0].description }
                </p>
              </div>
              <div className="question">
                <p>
                  { t('q_why') }
                </p>
                <p>
                  { focused[0].description }
                </p>
              </div>
              <div className="question">
                <p>
                  { t('other') }
                </p>
                <p>
                  { focused[0].description }
                </p>
              </div>
            </div>

        </div>
    );
}

export default FocusedGratitude;