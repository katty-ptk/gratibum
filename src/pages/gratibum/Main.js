import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import { useTranslation } from 'react-i18next';

// components
import Create from '../../components/gratibum/Create'

// services
import { auth, firebaseDb } from '../../services/firebase';
import { collection, getDoc, getDocs, setDoc, doc, addDoc } from 'firebase/firestore/lite';

// images
import logo from '../../images/logo.png';
import Gratitude from '../../components/gratibum/Gratitude';
const Main = () => {

  const { t } = useTranslation();

  const localstor = JSON.parse(localStorage.getItem("currentUser"));
  const gratibums = JSON.parse(localStorage.getItem("gratibums"));

  const [ gratitudes, setGratitudes ] = useState([]);

  const name = localstor.name;
  
  let img = logo;  

  if ( localstor.photoUrl != "" )
    img = localstor.photoUrl;
  
  let querySnapshot;
  const getGratibumsFromFirebase = async ( userEmail ) => {
      querySnapshot = await getDocs( collection( firebaseDb, `/test/accounts/${userEmail}` ) );
      return querySnapshot.docs.at(1).data();
  }

  const ress = getGratibumsFromFirebase( localstor.email );
  ress
      .then( ful => {
          console.log(ful);        
      })
      .catch( er => console.log(er) );

  for (var key in gratibums) {
    if (gratibums.hasOwnProperty(key)) {
      gratitudes.push( gratibums[key] );
    }
  }



  return (
    <div className={ window.innerWidth < 1000 ? 'gratibum gratibum-small' : 'gratibum gratibum-large'}>
      <div className="app-header">          
          <h2>
            {/* { t("User's Gratibum") } */}
            { name }'s Gratibum
          </h2>

          <Link to="/profile">
            <div className="user-img">
              <img src={logo} alt="" />
            </div>
          </Link>
      </div>

      <section className="entries">
        {/* <div className="test-greeting">
          <h3>
            { t('empty_gratibum') }
          </h3>
        </div> */}

        {
          gratitudes.map( ( item, index ) => {
            console.log( gratitudes[index] );

            return (
              <Gratitude data={item} />
            )

          })
        }
      </section>


      <div className="create">
            <Create />
      </div>
    </div>
  );
}

export default Main