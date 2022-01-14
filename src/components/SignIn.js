import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
    return (
        <div className='sign-in'>
            <Link to='/sign-up'>
                <button className="sign-up">
                    SIGN UP
                </button>
            </Link>
            <button className="login">
                LOGIN
            </button>
        </div>
    )
}

export default SignIn;