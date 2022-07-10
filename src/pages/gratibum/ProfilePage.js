import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import Back from '../../components/Back'
import Logout from '../../components/gratibum/Logout';

import { useHistory } from 'react-router-dom';

import { auth, firebaseDb, app } from '../../services/firebase';
import { collection, getDoc, getDocs, setDoc, doc, addDoc } from 'firebase/firestore/lite';
import { sendEmailVerification, signOut } from 'firebase/auth';

import logo from '../../images/logo.png';
import editProfile from '../../images/icons/edit_profile.png';

import { useTranslation } from 'react-i18next'
import SelectLanguage from '../../components/SelectLanguage';

const ProfilePage = () => {
    const {t} = useTranslation();
    const history = useHistory();

    
    const accountId = JSON.parse(localStorage.getItem('currentUser')).accountId;
    const email = JSON.parse(localStorage.getItem('currentUser')).email;
    const name = JSON.parse(localStorage.getItem('currentUser')).name;
    let localstor = JSON.parse(localStorage.getItem("currentUser"));
    const user = JSON.parse(localStorage.getItem("user"));
    
    const [ profilePic, setProfilePic ] = useState( logo );
    const [ preview, setPreview ] = useState( logo );
    // console.log( auth.currentUser.emailVerified );

    // setProfilePic( localstor.photoUrl );

    // useEffect( () => {
    //     setProfilePic( localstor.photoUrl);
    // }, [localstor.photoUrl]);

    

    const UploadProfilePicture = async ( e ) => { 
        e.preventDefault();

        // let fileInput = document.getElementById('profile-img-input').files[0];
        
        // var formdata = new FormData();
        // formdata.append( "email", email );
        // formdata.append( "folder", "profile" );
        // formdata.append("image", fileInput, "profile.jpeg");

        // var requestOptions = {
        //     method: 'POST',
        //     body: formdata,
        //     redirect: 'follow'
        // };

        // await fetch("http://www.vecinulvirtual.ro/liw/api/images.php", requestOptions)
        //     .then(response => {
        //         response.json();
        //     })
        //     .then(result => {
        //         console.log(result)
        //         let files = result.files;
        //         setProfilePic(files.normal);
        //         auth.currentUser.photoURL = files.normal;
        //         localstor.photoUrl = files.normal;
        //         localStorage.setItem("currentUser", JSON.stringify(localstor));
        //         console.log(auth.currentUser.photoURL);
        //         saveUserToFirebase( localstor, files.normal )
        //     })
        //     .catch(error => console.error('error: ', error));

        // await fetch("http://www.vecinulvirtual.ro/liw/api/images.php", requestOptions)
        //     .then(response => response.json())
        //     .then(result => console.log(result))
        //     .catch(error => console.log('error', error));
    }

    const sendEmail = ( userCredentials ) => {
        sendEmailVerification( userCredentials )
            .then( () => {
                console.log( "email sent!" );
            })
            .catch( error => {
                console.error( error );
            });

        signOut(auth);
        localStorage.removeItem("currentUser");
        localStorage.removeItem("gratibums");
        localStorage.removeItem("user");
        history.push('/sign-in');
    }

    let fileInput;
    useEffect( async () => {
        if (profilePic) {
            const reader = new FileReader();
            reader.onload = async () => {
                await setPreview(reader.result);
            };
            reader.readAsDataURL(profilePic);

            await saveUserToFirebase( localstor, preview );
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

        console.log( profilePic );
    }

    const saveUserToFirebase = async ( userCredentials, newProfilePhoto ) => {
        let userData = {
            accountId: userCredentials.accountId,
            email: userCredentials.email,
            name: userCredentials.name,
            photoUrl: newProfilePhoto
        };
    
        await setDoc(doc(
                        collection(firebaseDb, "test/accounts", userCredentials.email),
                        "accountData"
                      ), 
                        userData
        );

      }


    // count gratitudes to display their number
    const [ gratitudesNr, setGratitudesNr ] = useState(0);
    useEffect( async () => {
        await setGratitudesNr( Object.keys(JSON.parse(localStorage.getItem('gratibums'))).length );
        // console.log( ' use effect profile ');
    }, []);
  
    return (
        <div className={ window.innerWidth < 1000 ? 'profile-page profile-page-small sign-in-page sign-in-page-small' : 'profile-page profile-page-large sign-in-page sign-in-page-large'}>
            <div className="profile-page-header  sign-in-header">
                <div className="links">
                    <Link to="/gratibum">
                        <Back />
                    </Link>

                    <Link to="/gratibum/editProfile">
                        <img src={ editProfile } alt="" />
                    </Link>
                </div>
                {/* <h2>
                { t('profile') }
                </h2> */}
                    <div className="profile-img h2">
                        {/* <img src={ profilePic } alt="" /> */}
                        <img src={ preview } alt="" />
                        <input type="file" accept="image/jpeg" 
                            id="profile-img-input"
                            onChange={ imageChanged }
                        />
                    </div>
            </div>

            <section className="profile-page-info">
                <div className="user-info">

                    <div className="profile-name">
                        <h2>{ name }</h2>
                    </div>

                    <div className="gratitudes-nr">
                        <h3>{ gratitudesNr + " " + t('gratitudes') }</h3>
                    </div>

                    <Logout />
                </div>

                { !user.emailVerified &&
                    <div className="activate-account"
                        onClick={ () => sendEmail( auth.currentUser ) }
                    >
                        <p>Your account has not been verified yet.</p>
                        <p className='underline'>Click here to send activation email.</p>
                    </div>
                }

                <Link to="/about-gratibum">
                    <div className="about-gratibum">
                        <p>{ t('about_gratibum_2') }</p>
                    </div>
                </Link>
            </section>

            <div className="select-language-profile">
                <SelectLanguage />
            </div>
        </div>
    )
}

export default ProfilePage