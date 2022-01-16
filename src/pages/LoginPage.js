import React,{ useState } from 'react';
import Back from '../components/Back';
import Next from '../components/Next';
import AuthService from '../services/auth.service';

import { Link } from 'react-router-dom';
import { addScaleCorrector, motion } from 'framer-motion';

const loginVariants = {
    initial: {
        x: '-100vw'
    },

    animate: {
        x: 0,
        transition: { type: 'tween' }
    }
}

const LoginPage = () => {
<<<<<<< HEAD
    window.scrollTo( { top: 0 } );
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailTextChanged  = event => {
        let email = event.target.value
        console.log("new email: "+email);
        setEmail(email);
      };
    const passwordTextChanged  = event => {
        let pass = event.target.value
        console.log("new pass: "+pass);
        setPassword(pass);
      };

    function login() {
        var authService = new AuthService();
        authService.doLogin(email, password);
    }
=======
    // window.scrollTo( { top: 0 } );
>>>>>>> 8a85f782b8b6f0bcadb730865361b7265507254e

    return (
        <motion.div className="sign-in-page login-page"
            variants={ loginVariants }
            initial="initial"
            animate="animate"
        >
            <div className="sign-in-header">
                <Back />
                <h2>
                    Login to Gratibum
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
