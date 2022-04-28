import React from 'react'
import { Link } from 'react-router-dom';

import Back from '../../components/Back'
import Logout from '../../components/gratibum/Logout';

import logo from '../../images/logo.png';

import { useTranslation } from 'react-i18next'

const ProfilePage = () => {

    const {t} = useTranslation();

    // const name = JSON.stringify(localStorage.getItem("currentUser")).name;

    return (
        <div className={ window.innerWidth < 1000 ? 'profile-page profile-page-small sign-in-page sign-in-page-small' : 'profile-page profile-page-large sign-in-page sign-in-page-large'}>
            <div className="profile-page-header  sign-in-header">
                <Link to="/gratibum">
                    <Back />
                </Link>
                <h2>
                    Profile
                </h2>
            </div>

            <section className="profile-page-info">
                <div className="user-info">
                    <div className="profile-img">
                        <img src={ logo } alt="" />
                    </div>

                    <div className="profile-name">
                        <h2>Name</h2>
                    </div>

                    <div className="gratitudes-nr">
                        <h3>0 Gratitudes</h3>
                    </div>

                    <Logout />
                </div>

                <Link to="/about-gratibum">
                    <div className="about-gratibum">
                        <p>About Gratibum</p>
                    </div>
                </Link>
            </section>
        </div>
    )
}

export default ProfilePage