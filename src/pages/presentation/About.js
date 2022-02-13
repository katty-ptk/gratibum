import React from 'react'
import { useTranslation } from 'react-i18next';

import ScrollToTop from '../../components/ScrollToTop';

const About = () => {
    const { t } = useTranslation();
    
    return (
        <section className='about'>
            <h1>{ t('about_gratibum') }</h1>

            <div className="abouts">
                <div className='align-left'>
                    <p>
                        { t('about#1') }
                    </p>
                </div>

                <div className='align-right'>
                    <p>
                        { t('about#2') }
                    </p>
                </div>

                <div className='align-left'>
                    <p>
                        { t('about#3') }
                    </p>
                </div>

                <div className='align-right'>
                    <p>
                        { t('about#4') }
                    </p>
                </div>

                <div className='align-left'>
                    <p>
                        { t('about#5') }
                    </p>
                </div>
            </div>

            <ScrollToTop />
        </section>
    )
}

export default About
