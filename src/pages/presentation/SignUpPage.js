import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Back from '../../components/Back';
import Next from '../../components/Next';

import logo from '../../images/logo.png';

// services
import { auth, firebaseDb } from '../../services/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { collection, getDocs, setDoc, doc, } from 'firebase/firestore/lite';

import { motion } from 'framer-motion';

const signUpVariants = {
    initial: {
        x: '-100vw'
    },

    animate: {
        x: 0,
        transition: { type: 'tween' }
    }
}

const SignUpPage = () => {
    const { t } = useTranslation();

    let history = useHistory();

    const [ firstName, setFirstName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ passwordRepeat, setPasswordRepeat ] = useState("");

    const [ signedUp, setSignedUp ] = useState( false );
    const [ error, setError ] = useState( false );
    const [ errorMsg, setErrorMsg ] = useState("");

    const firstNameTextChanged = event => {
        let newFirstName = event.target.value;
        setFirstName( newFirstName );
    }

    const emailTextChanged = event => {
        let newEmail = event.target.value;
        setEmail( newEmail );
    };

    const passwordTextChanged = event => {
        let newPassword = event.target.value;
        setPassword( newPassword );
    };

    const passwordRepeatTextChanged = event => {
        let newPasswordRepeat = event.target.value;
        setPasswordRepeat( newPasswordRepeat );
    }

    const signUp = () => {

        if ( password == passwordRepeat ) {
            createUserWithEmailAndPassword( auth, email, password )
                .then( userCredentials => {
                    sendEmail( userCredentials.user );
    
                    saveUserToFirebase(userCredentials);
                    getUserFromFirebase( userCredentials.user.email )                
                })
                .catch( error => {
                    setErr( error.message );
                });
        } else {
            setErr( t("repeat_password_error") );
        }

    };

    const sendEmail = ( user ) => {
        sendEmailVerification( user )
            .then( () => {
                console.log( "email sent!" );
            })
            .catch( error => {
                console.log( error );
            });
    }

    const saveUserToFirebase = async (userCredentials) => {
        let userData = {
            accountId: userCredentials.user.uid,
            email: userCredentials.user.email,
            name: firstName,
            photoUrl: logo
        };
        await setDoc(doc(
                        collection(firebaseDb, "test/accounts", userCredentials.user.email),
                        "accountData"
                        ), 
                        userData
          );
          await setDoc(doc(collection(firebaseDb, "test/accounts", userCredentials.user.email),"gratibums"), {});

        const user = userCredentials.user;
        setSignedUp( true );
        setError( false );
        console.log(user.email);

        
        history.push("/login");
    }
    
    const getUserFromFirebase = async ( userEmail ) => {
        const querySnapshot = await getDocs( collection( firebaseDb, `/test/accounts/${userEmail}` ) );
        
        console.log( querySnapshot.docs.at(1).data() );
        localStorage.setItem( "gratibums", JSON.stringify(querySnapshot.docs.at(1).data()) ); // 
        localStorage.setItem( "currentUser", JSON.stringify(querySnapshot.docs.at(0).data() ) );
    }

    const setErr = ( message ) => {
        setError( true );
        setErrorMsg( message )
        setSignedUp( false );
        console.log(errorMsg);
    }

    return (
        <motion.div className={ window.innerWidth < 1000 ? "sign-up-page sign-up-page-small sign-in-page sign-in-page-small" : "sign-up-page sign-up-page-large sign-in-page sign-in-page-large" }
            variants={ signUpVariants }
            initial="initial"
            animate="animate"
        > 
            <div className="sign-in-header">
                <Link to="/sign-in">
                    <Back />
                </Link>
                <h2>
                    { t('sign_up_header') }
                </h2>
            </div>

            <section className="sign-up-section">
                <div className="profile-pic">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="51" height="51" fill="#CEA281" class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
                    <p>
                        { t('choose_pp') }
                    </p> */}
                </div>

                <form>
                    <div>                        
                        <label htmlFor="name">
                            { t('first_name') }
                        </label>
                        <input
                            id="name"
                            onChange={ firstNameTextChanged }
                            type="text"
                            placeholder='Alice Smith'    
                            autoComplete='off'
                        />
                    </div>

                    <div>                        
                        <label htmlFor="email">
                            Email:
                        </label>
                        <input
                            id="email"
                            type="text"
                            placeholder='alicesmith@email.com'    
                            autoComplete='off'
                            onChange={ emailTextChanged }
                        />
                    </div>
                    <div>                        
                        <label htmlFor="password">
                            { t('password') }
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder='********'    
                            autoComplete='off'
                            onChange={ passwordTextChanged }
                        />
                    </div>
                    <div>                        
                        <label htmlFor="repeat-password">
                            { t('repeat_password') }
                        </label>
                        <input
                            id="repeat-password"
                            type="password"
                            placeholder='********'    
                            autoComplete='off'
                            onChange={ passwordRepeatTextChanged }
                        />
                    </div>
                </form>
            </section>

            <div className="already-account">
                <p>
                    { t('already_account') }
                </p>
                <Link to='/login'>
                    { t('login') }
                </Link>
            </div>

            { (error && !signedUp) && 
                <p className={ window.innerWidth <= 480 ? 'error-md' : 'error' }>{ errorMsg }</p>
            }

            { (signedUp && !error ) && 
                <p className={ window.innerWidth <= 480 ? 'error-md' : 'error' }>Please verify your email and then log in. :)</p>
            }

            <div className="sign-in-next"
                onClick={ signUp }
            >
                <Next />
            </div>
        </motion.div>
    );
}

export default SignUpPage
