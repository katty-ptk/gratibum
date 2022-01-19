import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SignIn = ( { buttonAlign } ) => {
    const { t } = useTranslation();

    return (

        <div className={`sign-in ${ buttonAlign }`}>
            <Link to='/sign-in'>
                <button>
                    { t('sign_in') }
                </button>
            </Link>
        </div>
    )
}

export default SignIn;