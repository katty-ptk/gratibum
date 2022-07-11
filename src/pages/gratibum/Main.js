import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// components
import Create from '../../components/gratibum/Create'
import Gratitude from '../../components/gratibum/Gratitude';

// services
import { auth, firebaseDb } from '../../services/firebase';
import { collection, getDoc, getDocs, setDoc, doc, addDoc } from 'firebase/firestore/lite';

// images
import logo from '../../images/logo.png';

const Main = () => {

  const { t } = useTranslation();
  const history = useHistory();

  const localstor = JSON.parse(localStorage.getItem("currentUser"));  // logged in user

  const [ gratitudes, setGratitudes ] = useState([]);
  const [ loading, setLoading ] = useState( false );

  const name = localstor.name;
  
  let img = logo;  

  // if user has profile photo, set image to that
  if ( localstor.photoUrl != "" )
    img = localstor.photoUrl;
  
  // returns gratibum doc from firestore
  let querySnapshot;
  const getGratibumsFromFirebase = async ( userEmail ) => {
      querySnapshot = await getDocs( collection( firebaseDb, `/test/accounts/${userEmail}` ) );
      return querySnapshot.docs.at(1).data();
  }

  const ress = getGratibumsFromFirebase( localstor.email );
  useEffect(() => {
    ress.then(ful => {
      localStorage.setItem("gratibums", JSON.stringify(ful));       
      console.log( ful );
      // const gratibums = JSON.parse(localStorage.getItem("gratibums"));
      const gratibums = ful;

      // console.log( gratibums );

      for (var key in gratibums) {
        if (gratibums.hasOwnProperty(key)) {
          gratitudes.push( gratibums[key] );
        }
      }
    
      setLoading( true );

    }).catch( er => console.log(er) );
  }, []);

  let focused;
  const viewGratitude = async ( id ) => {
    
      focused = gratitudes.filter( gratitude => gratitude.date.seconds === parseInt(id) );
      
      history.push(`/gratibum/${id}`);
  }

  // check original image width / height to style div
  let mode;
  const checkImageMode = ( imageSrc ) => {
    const im = new Image();
    im.src = imageSrc;
    if (im.width < im.height || im.width == im.height)
      mode = "portrait";
    else
      mode = "landscape";

    return mode;
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
              <img src={img} alt="" />
            </div>
          </Link>
      </div>

      <section className="entries">

{     gratitudes.length == 0 && loading &&
        <div className="test-greeting">
          <h3>
            { t('empty_gratibum') }
          </h3>
        </div>
}
        { loading ?
          gratitudes.map( ( item, index ) => {
            {/* console.log( gratitudes[index] ); */}

            return (
              <Gratitude key={item.id}
                  data={item} 
                  handleClick={viewGratitude}
                  mode={ checkImageMode( item.imageUrl) }
              />
            )
          }) : ( 
            <div className="loading">
              <img src={logo} alt="" />
              <p>Loading ...</p>
            </div>
          )
        }

      </section>


      <div className="create">
            <Create />
      </div>
    </div>
  );
}

export default Main;