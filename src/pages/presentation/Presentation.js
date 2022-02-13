import React from 'react';
import { useTranslation } from 'react-i18next';

import Description from '../../components/landingPage/Description';
import Header from '../../components/Header';
import SignIn from '../../components/landingPage/SignIn';

const Presentation = () => {
    const { t } = useTranslation();

    return (
        <div className='presentation'>
            <Header />
            <Description />
            <SignIn 
                buttonAlign={ 
                    window.innerWidth < 820 ? "sign-in-small-pres" : "sign-in-large-pres" 
                }
            />
            <div className="scroll-to-learn">
                <p className="underline">
                    { t('scroll_down' )}
                </p>
            </div>          
        </div>
    )
}

export default Presentation
