import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = ( { buttonAlign } ) => {
    return (
        <div className={`sign-in ${ buttonAlign }`}>
            <Link to='/sign-in'>
                <button>
                    SIGN IN
                </button>
            </Link>
        </div>
    )
}

export default SignIn;