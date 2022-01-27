import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Back from '../../components/Back';
import Next from '../../components/Next';
import AuthService from '../../services/auth.service';
import LocalStorage from '../../services/localStorage.service';

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

const userData = "userData";

const SignUpPage = () => {
    const { t } = useTranslation();

    const [ firstName, setFirstName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const [ error, setError ] = useState(false);
    const [ error_msg, setErrorMsg ] = useState("");
    const [ signedUp, setSignedUp ] = useState(false);


    const firstNameTextChanged = event => {
        let newFirstName = event.target.value;
        setFirstName( newFirstName );
    }

    const emailTextChanged = event => {
        let newEmail = event.target.value;
        setEmail( newEmail );
    }

    const passwordTextChanged = event => {
        let newPassword = event.target.value;
        setPassword( newPassword );
    }

    const signUp = () => {
        var auth = new AuthService();
        var storage = new LocalStorage();

        auth.doSignUp( firstName, email, password, ( data ) => {
            setSignedUp(data.success);

            if ( signedUp ) {
                storage.setUserData( userData, data.data );
                
                const user = storage.getUserData( userData );
                console.log( user );
            } else {
                setError(true);

                if ( data.data.error.message === "WEAK_PASSWORD : Password should be at least 6 characters"){
                    setErrorMsg("Password should be at least 6 characters.");
                } else {
                    setErrorMsg(data.data.error.message);
                }
            }

            // localStorage.setItem(userData, JSON.stringify(data.data));
        });
    }

    return (
        <motion.div className={ window.innerWidth < 1000 ? "sign-up-page sign-up-page-small sign-in-page sign-in-page-small" : "sign-up-page sign-up-page-large sign-in-page sign-in-page-large" }
            variants={ signUpVariants }
            initial="initial"
            animate="animate"
        > 
            <div className="sign-in-header">
                <Back />
                <h2>
                    { t('sign_up_header') }
                </h2>
            </div>

            <section className="sign-up-section">
                <div className="profile-pic">
                    <svg xmlns="http://www.w3.org/2000/svg" width="51" height="51" fill="#CEA281" class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
                    <p>
                        { t('choose_pp') }
                    </p>
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

            { error && 
                <p className={ window.innerWidth <= 480 ? 'error-md' : 'error' }>{ error_msg }</p>
            }

            { signedUp && 
                <p className={ window.innerWidth <= 480 ? 'error-md' : 'error' }>account created:)</p>
            }

            <div className="sign-in-next"
                onClick={ signUp }
            >
                <Next />
            </div>
        </motion.div>
    )
}

export default SignUpPage