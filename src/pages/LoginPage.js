import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Back from '../components/Back';
import Next from '../components/Next';
import AuthService from '../services/auth.service';

import { Link } from 'react-router-dom';
import {  motion } from 'framer-motion';

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
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

    function login() {
        var authService = new AuthService();
        authService.doLogin(email, password, (data) => {
            setLoggedIn(data.success);
            
            if ( loggedIn ) {
                // go to app
            } else {
                setError( true );
                setErrorMsg( data.data.error.message );
            }

            localStorage.setItem(userData, JSON.stringify(data.data));
            // console.log("login finnished");
            console.log(data);
        });
    }
 
    function logout() {
        localStorage.removeItem(userData);
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

            { loggedIn && 
                <p className='error'>logged in</p>
            }
            
            { error && 
                <p className='error'>{ error_msg }</p>
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
