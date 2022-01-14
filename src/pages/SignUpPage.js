import React from 'react';
import Back from '../components/Back';
import Next from '../components/Next';

import { motion } from 'framer-motion';

const SignUpPage = () => {
    window.scrollTo( { top: 0 } );

    return (
        <motion.div className="sign-up-page sign-in-page"
            initial={{ x: '100vw' }}
            animate={{ x: 0 }}
            transition={{ type: 'tween' }}
        >
            <div className="sign-in-header">
                <Back />
                <h2>
                    Sign Up on Gratibum
                </h2>
            </div>

            <section className="sign-up-section">
                <div className="profile-pic">
                    <svg xmlns="http://www.w3.org/2000/svg" width="51" height="51" fill="#CEA281" class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
                    <p>
                        Choose your profile picture.
                    </p>
                </div>

                <form>
                    <div>                        
                        <label htmlFor="name">
                            First name:
                        </label>
                        <input
                            id="name"
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
                    <div>                        
                        <label htmlFor="repeat-password">
                            Repeat password:
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

            <div className="sign-in-next">
                <Next />
            </div>
        </motion.div>
    )
}

export default SignUpPage
