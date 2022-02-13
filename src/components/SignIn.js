import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

const SignIn = ( { buttonAlign } ) => {
    const { t } = useTranslation();

    const [ signedIn, setSignedIn ] = useState( false );

    // const logout = () => {
    //     signOut( auth );
    //     localStorage.removeItem('userData');
    //     console.log('logged out');
    // }

    // this will run every time the page is visited
    useEffect( () => {
        // verifying if the user is signed in
        if ( localStorage.getItem("userData") ) {
            setSignedIn( true );
        } else {
            setSignedIn( false );
        }
    }, [] );


    return (

        <div className={`sign-in ${ buttonAlign }`}>
            <Link to={ !signedIn ? '/sign-in' : '/gratibum' }> { /* when the user is signed in, this will link to the app */}
                <button>
                    { !signedIn ? t('sign_in') : t('go_to_app')}
                </button>
            </Link>
        </div>
    )
}

export default SignIn;