import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

// components
import Back from '../../components/Back';
import Next from '../../components/Next';

// services
import { auth, firebaseDb } from '../../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDoc, getDocs, setDoc, doc, addDoc } from 'firebase/firestore/lite';

import { Link, useHistory } from 'react-router-dom';
import {  motion, useReducedMotion } from 'framer-motion';

const loginVariants = {
    initial: {
        x: '-100vw'
    },

    animate: {
        x: 0,
        transition: { type: 'tween' }
    }
}

const userData = "userData";

const LoginPage = () => {
    const { t } = useTranslation();

    let history = useHistory();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [userEmail, setUserEmail] = useState("");

    const [ loggedIn, setLoggedIn ] = useState(false);

    const [ error, setError ] = useState(false);
    const [ error_msg, setErrorMsg ] = useState("");

    const emailTextChanged  = event => {
        let email = event.target.value;
        setEmail(email);
    };

    const passwordTextChanged  = event => {
        let pass = event.target.value;
        setPassword(pass);
      };

    const login = () => {
        signInWithEmailAndPassword( auth, email, password )
            .then( userCredentials => {
                const user = userCredentials.user;

                // get user data from firebase
                getUserFromFirebase( user.email );

                console.log('logged in as ' + user.email );
                setUserEmail( user.email );
                setLoggedIn( true );
                setError( false );

                localStorage.setItem( userData, user.email );
                history.push("/gratibum");  // redirects to app
            })
            .catch( error => {
                console.log(error.message);
                setError( true );
                setErrorMsg( error.message );
                setLoggedIn( false );
            });
    }

    const getUserFromFirebase = async ( userEmail ) => {
        const querySnapshot = await getDocs( collection( firebaseDb, `/test/accounts/${userEmail}` ) );
        // querySnapshot.forEach( doc => {
        //     // localStorage.setItem("data", doc.data() );
        //     console.log( doc.data() );
        // })

        console.log( querySnapshot.docs.at(1).data() ); // empty object

        localStorage.setItem( "gratibums", JSON.stringify(querySnapshot.docs.at(1).data()) ); // 
    }

    
    return (
        <motion.div className={ window.innerWidth < 1000 ? 'login-page login-page-small sign-in-page sign-in-page-small' : 'login-page login-page-large sign-in-page sign-in-page-large'}
            variants={ loginVariants }
            initial="initial"
            animate="animate"
        >
            <div className="sign-in-header">
                <Back />
                <h2>
                    { t('login_header') }
                </h2>
            </div>

            <section className="login-section">
                <form>
                    <div>                        
                            <label htmlFor="email">
                                Email:
                            </label>
                            <input
                                id="email"
                                type="text"
                                placeholder='alicesmith@email.com'    
                                autoComplete='off'
                                required
                                onChange = {emailTextChanged} 
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
                                required
                                onChange = {passwordTextChanged} 
                            />
                        </div>
                </form>

                <div className="no-account">
                    <p>
                        { t('no_account') }
                    </p>
                    <br></br>
                    <Link to='/sign-up'>
                        { t('sign_up') }
                    </Link>
                </div>
            </section>

            { ( loggedIn && !error ) && 
                <p className={ window.innerWidth <= 480 ? 'error-md' : 'error' }>logged in as: { userEmail }</p>
            }
            
            { (error && !loggedIn) && 
                <p className={ window.innerWidth <= 480 ? 'error-md' : 'error' }>{ error_msg }</p>
            }


            <div className="sign-in-next" 
                onClick={ login }
            >
                <Next />
            </div>
        </motion.div>
    )
}

export default LoginPage;
