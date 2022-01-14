import React from 'react';
import Back from '../components/Back';
import Next from '../components/Next';

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LoginPage = () => {
    window.scrollTo( { top: 0 } );

    return (
        <motion.div className="sign-in-page login-page"
            initial={{ x: '100vw' }}
            animate={{ x: 0 }}
            transition={{ type: 'tween' }}
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
                            />
                        </div>
                </form>

                <div className="no-account">
                    <p>Don't have an account?</p>
                    <br></br>
                    <Link to='/sign-up'>Sign Up</Link>
                </div>
            </section>

            <div className="sign-in-next">
                <Next />
            </div>
        </motion.div>
    )
}

export default LoginPage;
