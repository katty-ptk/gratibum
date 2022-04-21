import React from 'react'
import { Link } from 'react-router-dom'

import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';

const Logout = () => {

  const logout = () => {
    signOut(auth);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("gratibums");
  }  

  return (
    <div className='logout-div'>
        <Link to="/">
            <button onClick={ logout }>
                Logout
            </button>
        </Link>
    </div>
  )
}

export default Logout