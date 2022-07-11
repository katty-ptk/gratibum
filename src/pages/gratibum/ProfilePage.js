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

import {  motion, useReducedMotion } from 'framer-motion';

const profileVariants = {
    initial: {
        x: '100vw'
    },

    animate: {
        x: 0,
        transition: { type: 'tween' }
    }
}


const ProfilePage = () => {
    const {t} = useTranslation();
    const history = useHistory();

    
    const accountId = JSON.parse(localStorage.getItem('currentUser')).accountId;
    const email = JSON.parse(localStorage.getItem('currentUser')).email;
    const name = JSON.parse(localStorage.getItem('currentUser')).name;
    let localstor = JSON.parse(localStorage.getItem("currentUser"));
    const user = JSON.parse(localStorage.getItem("user"));
    
    const [ profilePic, setProfilePic ] = useState( localstor.photoUrl != "" ? localstor.photoUrl : logo );

    
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

    // count gratitudes to display their number
    const [ gratitudesNr, setGratitudesNr ] = useState(0);
    useEffect( async () => {
        await setGratitudesNr( Object.keys(JSON.parse(localStorage.getItem('gratibums'))).length );
        // console.log( ' use effect profile ');
    }, []);
  
    return (
        <motion.div className={ window.innerWidth < 1000 ? 'profile-page profile-page-small sign-in-page sign-in-page-small' : 'profile-page profile-page-large sign-in-page sign-in-page-large'}
            variants={ profileVariants }
            initial="initial"
            animate="animate"
        >
            <div className="profile-page-header  sign-in-header">
                <div className="links">
                    <Link to="/gratibum">
                        <Back />
                    </Link>

                    <Link to="/gratibum/editProfile">
                        <img src={ editProfile } alt="" />
                    </Link>
                </div>
                    <div className="profile-img h2">
                        <img src={ profilePic } alt="" />
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
        </motion.div>
    )
}

export default ProfilePage