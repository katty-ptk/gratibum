import React from 'react'
import { Link } from 'react-router-dom'

import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';

import { useTranslation } from 'react-i18next';

const Logout = () => {

  const {t} = useTranslation();

  const logout = () => {
    signOut(auth);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("gratibums");
    localStorage.removeItem("user");
  }  

  return (
    <div className='logout-div'>
        <Link to="/">
            <button onClick={ logout }>
                { t('logout') }
            </button>
        </Link>
    </div>
  )
}

export default Logout