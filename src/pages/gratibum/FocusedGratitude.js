import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useTranslation } from "react-i18next";

import { auth, firebaseDb } from '../../services/firebase';
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { getFirestore } from 'firebase/firestore'

import back from '../../images/icons/back.png';
import trash from '../../images/icons/trash.png';
import edit from '../../images/icons/edit.png';

import test from '../../images/tests/test.png';

const FocusedGratitude = () => {
    const { id } = useParams();
    const history = useHistory();
    const { t } = useTranslation();
    const db = getFirestore();

    const gratibums = JSON.parse(localStorage.getItem("gratibums"));
    const email = JSON.parse(localStorage.getItem("currentUser")).email;

    let gratitudes = [];
    for (var key in gratibums) {
      if (gratibums.hasOwnProperty(key)) {
        gratitudes.push( gratibums[key] );
      }
    }

    let focused = gratitudes.filter( gratitude => (gratitude.date.seconds).toString() + (gratitude.date.nanoseconds / 1000000).toString() === id.toString() );

    const editGratitude = () => {
      localStorage.setItem('gratitudeData', JSON.stringify(focused[0]));
      history.push(`/gratibum/edit/${id}`);
    } 
    
    const ref = doc( db, `test/accounts/${email}`, 'gratibums');
    const deleteGratitude = async () => {
      await updateDoc(ref, {
        [id]: deleteField()
      });

      history.push('/gratibum');

      console.log('delete')
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
                  onClick={ deleteGratitude }
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