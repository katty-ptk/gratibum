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


    const editGratitude = () => {
      localStorage.setItem('gratitudeData', JSON.stringify(focused[0]));
      history.push(`/gratibum/edit/${id}`);
    } 
  
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
                  onClick={ editGratitude }
                 />
                <img src={trash} 
                  onClick={ () => history.push('/') }
                />
              </div>

              <h1>{ focused[0].title }</h1>

              {/* if the user did not answer every question, it will only show what they wrote */}
              { focused[0].qWhat && focused[0].qWhy && focused[0].qOther ?
                          <>
                          <div className="question">
                              <p>
                                { t('q_what') }
                              </p>
                              <p>
                                { focused[0].qWhat }
                              </p>
                            </div>
                            <div className="question">
                              <p>
                                { t('q_why') }
                              </p>
                              <p>
                                { focused[0].qWhy }
                              </p>
                            </div>
                            <div className="question">
                              <p>
                                { t('other') }
                              </p>
                              <p>
                                { focused[0].qOther }
                              </p>
                            </div>
                          </>

                :
                  <>
                            <div className="question">
                              <p id="single-desc">
                                { focused[0].description }
                              </p>
                            </div>
                  </>

              }            
        </div>

        </div>
    );
}

export default FocusedGratitude;