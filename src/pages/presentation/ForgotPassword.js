// react
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

// components
import Back from '../../components/Back'
import Next from '../../components/Next'

// services
import { useTranslation } from 'react-i18next'
import { auth } from "../../services/firebase";
import { sendPasswordResetEmail } from 'firebase/auth';

function ForgotPassword() {
    const { t } = useTranslation();

    const [ email, setEmail ] = useState("");

    const [ succees, setSuccees ] = useState( false );
    const [ error, setError ] = useState( false );
    const [ error_msg, setError_msg ] = useState("");

    const emailTextChanged = (e) => {
        let email = e.target.value;
        setEmail( email );
    }

    const checkEmail = async () => {

        sendPasswordResetEmail( auth, email )
            .then( () => {
                setSuccees( true );
                setError( false );
            })
            .catch( (error) => {
                setSuccees( false );
                setError( true );
                console.error(error);
            });
    }

    return (
        <div className={ window.innerWidth < 1000 ? 'login-page login-page-small sign-in-page sign-in-page-small forgot-pass' : 'login-page login-page-large sign-in-page sign-in-page-large forgot-pass'} >
            <div className="sign-in-header">
                <Back />
                <h2>
                    { t('password_reset') }
                </h2>
            </div>

            <section className="login-section">
                <form>
                    <div>                        
                        <label htmlFor="email">
                            { t('enter_email') }
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
                </form>

                <div className={ window.innerWidth < 1000 ? 'back-login-small' : 'back-login-large' }>
                    <Link to='/login'>
                        {/* { t('login') } */}
                        Go back to Login
                    </Link>
                </div>
            </section>




            { ( !error && succees ) && 
                <p className={ window.innerWidth <= 480 ? 'error-md' : 'error' }>
                    { t('you_will_receive') } { email }
                </p>
            }

            { ( error && !succees ) && 
                <p className={ window.innerWidth <= 480 ? 'error-md' : 'error' }>
                    { t('enter_valid_email') }
                </p>
            }


            <div className="sign-in-next"
                onClick={ checkEmail }
            >
                <Next />
            </div>
        </div>
    )
}

export default ForgotPassword