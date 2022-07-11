import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

import { useHistory } from 'react-router-dom';

import { setDoc, doc, collection } from 'firebase/firestore/lite';
import { firebaseDb } from '../../services/firebase';

import Back from '../../components/Back';

import logo from '../../images/logo.png';

function EditProfile() {
    const history = useHistory();

    const localstor = JSON.parse(localStorage.getItem('currentUser'));
    const userData = {
        accountId: localstor.accountId,
        email: localstor.email,
        name: localstor.name,
        photoUrl: localstor.photoUrl
    };

    const [ profilePic, setProfilePic ] = useState(userData.photoUrl != "" ? userData.photoUrl : logo);
    const [ preview, setPreview ] = useState(userData.photoUrl != "" ? userData.photoUrl : logo);
    const [ name, setName ] = useState( userData.name );

    const usernameTextChanged = async (e) => {
        await setName(e.target.value);
    }
    
    let fileInput;
    useEffect( async () => {
        if (profilePic) {
            const reader = new FileReader();
            reader.onload = async () => {
                await setPreview(reader.result);
            };
            reader.readAsDataURL(profilePic);
            // console.log( preview );
          } else {
            await setPreview(logo);
          }
      }, [profilePic]);

    const imageChanged = async ( e ) => { 
        e.preventDefault();

        fileInput = document.getElementById('profile-img-input').files[0];
        
        if (fileInput) {
            await setProfilePic(fileInput);
            localstor.photoUrl = preview;
            localStorage.setItem('currentUser', JSON.stringify(localstor));
          } else {
              await setProfilePic(logo);
            }  
            
        // console.log( profilePic );
    }
    
    const saveUserToFirebase = async ( user ) => {
        
        await setDoc(doc(
            collection(firebaseDb, "test/accounts", user.email),
            "accountData"
            ), 
            user
            );

        localStorage.setItem('currentUser', JSON.stringify(user) );
            
    }

    const submit = async () => {
        userData.photoUrl = preview; 
        userData.name = name;
        await saveUserToFirebase( userData );
        history.push('/profile');
    }

  return (
    <div className={ window.innerWidth < 1000 ? 'edit-profile-small profile-page profile-page-small sign-in-page sign-in-page-small' : 'edit-profile-large profile-page profile-page-large sign-in-page sign-in-page-large'}>

        <div className="profile-page-header  sign-in-header">
            <Link to='/profile'>
                <Back />
            </Link>

            <div className="profile-img h2">
                <img src={ preview } alt="" />
                <input type="file" accept="image/*" 
                    id="profile-img-input"
                    onChange={ imageChanged }
                />
            </div>            
        </div>

        <section>
            <div className="info">
                <div className="name">
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        id='username'
                        placeholder={localstor.name}
                        onChange={usernameTextChanged}
                    />
                </div>
                {/* <div className="email">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="text" 
                        id='email'
                        placeholder={localstor.email}
                        onChange={emailTextChanged}
                    />
                </div> */}
            </div>
            <div className="save">
                {/* <Link to="/profile"> */}
                    <button 
                        onClick={ submit }
                    >
                        Save
                    </button>
                {/* </Link> */}
            </div>
        </section>

    </div>
  );
}

export default EditProfile;