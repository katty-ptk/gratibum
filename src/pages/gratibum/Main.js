import React, {useEffect} from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import { useTranslation } from 'react-i18next';

// components
import Create from '../../components/gratibum/Create'

// images
import logo from '../../images/logo.png';

const Main = () => {

  const { t } = useTranslation();

  const localstor = JSON.parse(localStorage.getItem("currentUser"));
  const img = localstor.photoUrl;


  useEffect( () => {
    console.log('img');
  }, [img]);

  return (
    <div className={ window.innerWidth < 1000 ? 'gratibum gratibum-small' : 'gratibum gratibum-large'}>
      <div className="app-header">          
          <h2>
            { t("User's Gratibum") }
          </h2>

          <Link to="/profile">
            <div className="user-img">
              <img src={localstor.photoUrl} alt="" />
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