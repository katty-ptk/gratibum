import React from 'react'
import { Link } from 'react-router-dom';

import Back from '../../components/Back';

// icons
import facebook from '../../images/icons/social media/facebook.svg';
import instagram from '../../images/icons/social media/instagram.svg';
import twitter from '../../images/icons/social media/twitter.svg';
import substack from '../../images/icons/social media/substack.png';
import kofi from '../../images/icons/social media/kofi.png';
import logo from '../../images/logo.png';
import { t } from 'i18next';

const AboutGratibum = () => {
  return (
    <div className={ window.innerWidth < 1000 ? 'about-gratibum about-gratibum-small profile-page profile-page-small sign-in-page sign-in-page-small' : 'about-gratibum about-gratibum-large profile-page profile-page-large sign-in-page sign-in-page-large'}>
        <div className="profile-page-header  sign-in-header">
            <Link to="/profile">
                <Back />
            </Link>
            {/* <h2>
                About Gratibum
            </h2> */}
            <div className="logo profile-page-info">
                <img src={logo} alt="" />
            </div>
        </div>

        <div className="cards">

            <section className="social-links">
                <p>
                    { t('social') }
                    {/* We are extremely grateful for you joining our Gratibum family. We do extend our gratitude lessons through a lot of other channels. Be part of the bigger Gratibum family by checking out our social media as well. */}
                </p>

                <div className="links">
                    <Link 
                        to={{ pathname: "https://www.facebook.com/profile.php?id=100080438832277" }}
                        target="_blank">
                        <div className="link fb">
                            <img src={ facebook } alt="" />
                        </div>
                    </Link>

                    <Link 
                        to={{ pathname: "https://www.instagram.com/gratibumalbum/" }}
                        target="_blank">
                        <div className="link fb">
                            <img src={ instagram } alt="" />
                        </div>
                    </Link>

                    <Link 
                        to={{ pathname: "https://twitter.com/gratibum" }}
                        target="_blank">
                        <div className="link fb">
                            <img src={ twitter } alt="" />
                        </div>
                    </Link>
                </div>
            </section>

            <section className="substack-link">
                <p>
                    { t('substack') }
                    {/* We compile all of our learnings into a very small weekly email. Subscribe to our Substack letter and be reminded of all the great things that happen around us. */}
                </p>
                <Link 
                        to={{ pathname: "https://substack.com/" }}
                        target="_blank">
                    <img src={substack} alt="" />
                </Link>
            </section>

            <section className="kofi-link">
                <p>
                    { t('kofi') }
                    {/* Gratibum was built with love and coffee. A looot of coffee! So, if you love Gratibum and you are grateful for it, please buy us a coffee. */}
                </p>
                <Link 
                    to={{ pathname: "https://ko-fi.com/gratibum" }}
                    target="_blank">
                    <img src={kofi} alt="" />
                </Link>
            </section>

            <section className="get-app">
                <Link 
                    to={{ pathname: "https://play.google.com/store/apps/details?id=com.vvs.gratibum&ah=A5NWk-tLAw4OwpbSxqSfI584GUA" }}
                    target="_blank">
                        <p>Get Gratibum for Android</p>
                </Link>
            </section>
        </div>
    </div>
    )
}

export default AboutGratibum