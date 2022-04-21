import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Back from '../../components/Back'

import { motion } from 'framer-motion';


// services
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, firebaseDb } from '../../services/firebase';
import { collection, getDoc, getDocs, setDoc, doc, addDoc } from 'firebase/firestore/lite';
import { Redirect } from 'react-router-dom';
const provider = new GoogleAuthProvider();

const signInVariants = {
    initial: {
        x: '-100vw'
    },

    animate: {
        x: 0,
        transition: { type: 'tween' }
    }
}

const SignInPage = () => {
    const { t } = useTranslation();

    let history = useHistory();
    

    const [ email, setEmail ] = useState("");
    const [ name, setName ] = useState("");
    const [ photoUrl, setPhotoUrl ] = useState("");

    const [ signedIn, setSignedIn ] = useState(false);
    const [ error, setError ] = useState(false);
    const [ errorMsg, setErrorMsg ] = useState("");

    // const [ user, setUser ] = useState({});

    const googleAuth = () => {
        signInWithPopup( auth, provider )
            .then( result => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;

                // get user data from firebase
                getUserFromFirebase( result.user.email );

                // save user data into storage
                saveUserToFirebase( result.user );


                const user = result.user;

                setName( user.displayName );
                setEmail( user.email );
                setPhotoUrl( user.photoUrl );

                setSignedIn(true);
                setError(false);

                // console.log( user );

                localStorage.setItem("currentUser", user.email);

                history.push("/gratibum");  // redirects to app
            })
            .catch( error => {
                setError(true);
                setErrorMsg( error.message );
                setSignedIn(false);
            });
    }

    const saveUserToFirebase = async ( userCredentials ) => {
        let userData = {
            accountId: userCredentials.uid,
            email: userCredentials.email,
            name: userCredentials.displayName,
            photoUrl: ""
        };

        await setDoc(doc(
                        collection(firebaseDb, "test/accounts", userCredentials.email),
                        "accountData"
                        ), 
                        userData
          );

        await setDoc(doc(collection(firebaseDb, "test/accounts", userCredentials.email),"gratibums"), {});
    }

    const getUserFromFirebase = async ( userEmail ) => {
        const querySnapshot = await getDocs( collection( firebaseDb, `/test/accounts/${userEmail}` ) );

        console.log( querySnapshot.docs.at(1).data() );

        localStorage.setItem( "gratibums", JSON.stringify(querySnapshot.docs.at(1).data()) ); // 
    }

    return (
        <motion.div className={ window.innerWidth < 1000 ? 'sign-in-page sign-in-page-small' : 'sign-in-page sign-in-page-large'}
            variants={ signInVariants }
            initial="initial"
            animate="animate"
        >
            <div className="sign-in-header">
                <Back />
                <h2>
                    { t('sign_in_header') }
                </h2>
            </div>

            <div className="sign-in-buttons">
                <Link to='/sign-up'>
                    <button>
                        { t('sign_up') }
                    </button>
                </Link>

                <Link to='/login'>
                    <button>
                        { t('login') }
                    </button>
                </Link>
                
                <Link>
                    <button onClick={ googleAuth }>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#CEA281" class="bi bi-google" viewBox="0 0 16 16">
                            <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                        </svg>

                        { t('sign_in_google') }
                    </button>
                </Link>

                { ( signedIn && !error ) && 
                <p className={ window.innerWidth <= 480 ? 'googleAuth error-md' : 'googleAuth error' }>logged in as: { name }</p>
                }
                
                { (error && !signedIn) && 
                    <p className={ window.innerWidth <= 480 ? 'error-md' : 'error' }>{ errorMsg }</p>
                }

            </div>
        </motion.div>
    )
}

export default SignInPage
