import React from 'react'
import { Link } from 'react-router-dom';

import Back from '../../components/Back';

// icons
import facebook from '../../images/icons/social media/facebook.svg';
import instagram from '../../images/icons/social media/instagram.svg';
import twitter from '../../images/icons/social media/twitter.svg';

const AboutGratibum = () => {
  return (
    <div className={ window.innerWidth < 1000 ? 'about-gratibum about-gratibum-small profile-page profile-page-small sign-in-page sign-in-page-small' : 'about-gratibum profile-page profile-page-large sign-in-page sign-in-page-large'}>
        <div className="profile-page-header  sign-in-header">
            <Link to="/gratibum">
                <Back />
            </Link>
            <h2>
                About Gratibum
            </h2>
        </div>

        <section className="links  profile-page-info">
        <Link 
                to={{ pathname: "https://www.facebook.com/profile.php?id=100080438832277" }}
                target="_blank">
                <div className="link fb">
                    <img src={ facebook } alt="" />
                    <h3>Facebook</h3>
                </div>
            </Link>

            <Link 
                to={{ pathname: "https://www.instagram.com/gratibumalbum/" }}
                target="_blank">
                <div className="link fb">
                    <img src={ instagram } alt="" />
                    <h3>Instagram</h3>
                </div>
            </Link>

            <Link 
                to={{ pathname: "https://twitter.com/gratibum" }}
                target="_blank">
                <div className="link fb">
                    <img src={ twitter } alt="" />
                    <h3>Twitter</h3>
                </div>
            </Link>
        </section>
    </div>
    )
}

export default AboutGratibum