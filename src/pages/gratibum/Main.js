import React, {useEffect} from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import { useTranslation } from 'react-i18next';

// components
import Create from '../../components/gratibum/Create'

// services
import { auth, firebaseDb } from '../../services/firebase';
import { collection, getDoc, getDocs, setDoc, doc, addDoc } from 'firebase/firestore/lite';

// images
import logo from '../../images/logo.png';
const Main = () => {

  const { t } = useTranslation();

  const localstor = JSON.parse(localStorage.getItem("currentUser"));
  const name = localstor.name;
  
  let img = logo;  

  if ( localstor.photoUrl != "" )
    img = localstor.photoUrl;

  return (
    <div className={ window.innerWidth < 1000 ? 'gratibum gratibum-small' : 'gratibum gratibum-large'}>
      <div className="app-header">          
          <h2>
            {/* { t("User's Gratibum") } */}
            { name }'s Gratibum
          </h2>

          <Link to="/profile">
            <div className="user-img">
              <img src={img} alt="" />
            </div>
          </Link>
      </div>

      <section className="entries">
        <div className="test-greeting">
          <h3>
            { t('empty_gratibum') }
          </h3>
        </div>
      </section>


      <div className="create">
            <Create />
      </div>
    </div>
  );
}

export default Main