import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SignIn = ( { buttonAlign } ) => {
    const { t } = useTranslation();

    const [ signedIn, setSignedIn ] = useState( false );

    useEffect( () => {
        if ( localStorage.getItem("userData") ) {
            setSignedIn( true );
        } else {
            setSignedIn( false );
        }
    }, [] );


    return (

        <div className={`sign-in ${ buttonAlign }`}>
            <Link to='/sign-in'>
                <button>
                    { !signedIn ? t('sign_in') : t('go_to_app')}
                </button>
            </Link>
        </div>
    )
}

export default SignIn;