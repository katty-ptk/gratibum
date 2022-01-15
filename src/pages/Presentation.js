import React from 'react'

import Description from '../components/Description';
import Header from '../components/Header';
import SignIn from '../components/SignIn';

const Presentation = () => {
    return (
        <div className='presentation'>
            <Header />
            <Description />
            <SignIn 
                buttonAlign={ window.innerWidth <= 1000 ? "sign-in-small-pres" : "sign-in-large-pres" }
            />
            <div className="scroll-to-learn">
                <p className="underline">
                    Scroll down to learn more.
                </p>
            </div>          
        </div>
    )
}

export default Presentation
