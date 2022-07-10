import React from 'react'
import { Link } from 'react-router-dom';

import Back from '../../components/Back';

import logo from '../../images/logo.png';

function EditProfile() {
  return (
    <div className={ window.innerWidth < 1000 ? 'edit-profile-small profile-page profile-page-small sign-in-page sign-in-page-small' : 'edit-profile-large profile-page profile-page-large sign-in-page sign-in-page-large'}>

        <div className="profile-page-header  sign-in-header">
            <Link to='/profile'>
                <Back />
            </Link>

            <div className="profile-img h2">
                <img src={ logo } alt="" />
                <input type="file" accept="image/jpeg" 
                    id="profile-img-input"
                    // onChange={ imageChanged }
                />
            </div>            
        </div>

        <section>
            <div className="info">
                <div className="name">
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        id='username'
                        placeholder='ex: Janice'
                    />
                </div>
                <div className="email">
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="text" 
                        id='email'
                        placeholder='ex: janice@email.com'
                    />
                </div>
            </div>
            <div className="save">
                <Link to="/">
                    <button 
                        // onClick={ logout }
                    >
                        Save
                    </button>
                </Link>
            </div>
        </section>

    </div>
  );
}

export default EditProfile;