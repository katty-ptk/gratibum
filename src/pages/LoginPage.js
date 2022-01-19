import React,{ useState } from 'react';
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
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailTextChanged  = event => {
        let email = event.target.value;
        console.log("new email: "+email);
        setEmail(email);
      };
    const passwordTextChanged  = event => {
        let pass = event.target.value;
        console.log("new pass: "+pass);
        setPassword(pass);
      };

    function login() {
        var authService = new AuthService();
        authService.doLogin(email, password, (data) => {
            let loggedIn = data.success;
            if ( loggedIn ) {
                // go to app
            } else {
                // display error message
                alert("error - could not log you in. Please try again.")
            }
            localStorage.setItem(userData, JSON.stringify(data.data));
            console.log("login finnished");
        });
    }

    function logout() {
        localStorage.removeItem(userData);
    }

    function printAmILoggedIn() {
        if ( localStorage.getItem(userData) !== null ) {
            return (
            <div>
                <h1>You are logged in</h1>
                <p onClick={logout}>Loggout</p>
            </div>
            );
        } else {
            return (<h1>You are not logged in</h1>);
        }
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
                    Login to Gratibum
                </h2>
                {printAmILoggedIn()}
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
                                onChange = {emailTextChanged} 
                            />
                        </div>
                        <div>                        
                            <label htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                placeholder='********'    
                                autoComplete='off'
                                onChange = {passwordTextChanged} 
                            />
                        </div>
                </form>

                <div className="no-account">
                    <p>Don't have an account?</p>
                    <br></br>
                    <Link to='/sign-up'>Sign Up</Link>
                </div>
            </section>

            <div className="sign-in-next" onClick={login}>
                <Next />
            </div>
        </motion.div>
    )
}

export default LoginPage;
