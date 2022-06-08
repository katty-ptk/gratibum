import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

import Back from '../../components/Back'
import Logout from '../../components/gratibum/Logout';

import { auth, firebaseDb } from '../../services/firebase';
import { collection, getDoc, getDocs, setDoc, doc, addDoc } from 'firebase/firestore/lite';

import logo from '../../images/logo.png';

import { useTranslation } from 'react-i18next'
import SelectLanguage from '../../components/SelectLanguage';

const ProfilePage = () => {
    const {t} = useTranslation();

    const [ profilePic, setProfilePic ] = useState( logo );
    
    const accountId = JSON.parse(localStorage.getItem('currentUser')).accountId;
    const email = JSON.parse(localStorage.getItem('currentUser')).email;
    const name = JSON.parse(localStorage.getItem('currentUser')).name;
    let localstor = JSON.parse(localStorage.getItem("currentUser"));

    // setProfilePic( localstor.photoUrl );

    useEffect( () => {
        setProfilePic( localstor.photoUrl);
    }, [localstor.photoUrl]);

    const UploadProfilePicture = async ( e ) => { 
        e.preventDefault();

        let fileInput = document.getElementById('profile-img-input').files[0];
        
        var formdata = new FormData();
        formdata.append( "email", email );
        formdata.append( "folder", "profile" );
        formdata.append("image", fileInput, "106999602_3735056599854298_" + Math.random(100000000000000000, 199999999999999999) + "_n.jpeg");

        var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
        };

        await fetch("http://www.vecinulvirtual.ro/liw/api/images.php", requestOptions)
            .then(response => response.json())
            .then(result => {
                let files = result.files;
                setProfilePic(files.normal);
                auth.currentUser.photoURL = files.normal;
                localstor.photoUrl = files.normal;
                localStorage.setItem("currentUser", JSON.stringify(localstor));
                console.log(auth.currentUser.photoURL);
                saveUserToFirebase( localstor, files.normal )
            })
            .catch(error => console.error('error', error));
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
    
        await setDoc(doc(collection(firebaseDb, "test/accounts", userCredentials.email),"gratibums"), {});
      }
    

    return (
        <div className={ window.innerWidth < 1000 ? 'profile-page profile-page-small sign-in-page sign-in-page-small' : 'profile-page profile-page-large sign-in-page sign-in-page-large'}>
            <div className="profile-page-header  sign-in-header">
                <Link to="/gratibum">
                    <Back />
                </Link>
                <h2>
                { t('profile') }
                </h2>
            </div>

            <section className="profile-page-info">
                <div className="user-info">
                    <div className="profile-img">
                        <img src={ profilePic } alt="" />
                        <input type="file" accept="image/jpeg" 
                            id="profile-img-input"
                            onChange={ UploadProfilePicture }
                        />
                    </div>

                    <div className="profile-name">
                        <h2>{ name }</h2>
                    </div>

                    <div className="gratitudes-nr">
                        <h3>0 { t('gratitudes') }</h3>
                    </div>

                    <Logout />
                </div>

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