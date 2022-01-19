import React from 'react'
import { useTranslation } from 'react-i18next'

import ScrollToTop from '../components/ScrollToTop'
import SignIn from '../components/SignIn'

const JoinGratibum = () => {
    const { t } = useTranslation();

    return (
        <div className='join-us'>
            <h1>{ t('join_us') }</h1>
            <div className={ window.innerWidth > 1000 ? 'join-us-large' : 'join-us-small' }>
                <div className='landing-questions'>
                    <p>
                        { t('catch_interest') }
                    </p>

                    <p>
                        { t('keep_memories') }
                    </p>

                    <p>
                        { t('life_wonderful') }
                    </p>
                </div>
                <div className="join-sign-in">
                    <h3>{ t('join_gratibum') }</h3>
                    <SignIn 
                        buttonAlign={ window.innerWidth <= 1000 && "sign-in-small-join" }
                    />
                </div>
            </div>
            <ScrollToTop />
        </div>
    )
}

export default JoinGratibum
