import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
    return (
        <div className='sign-in'>
            <Link to='/sign-in'>
                <button>
                    SIGN IN
                </button>
            </Link>

            {/* <Link to='/login'>
                <button className="login">
                    LOGIN
                </button>
            </Link> */}
        </div>
    )
}

export default SignIn;