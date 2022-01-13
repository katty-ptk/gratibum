import React from 'react'

import Description from '../components/Description';
import Header from '../components/Header';
import SignIn from '../components/SignIn';

const Presentation = () => {
    return (
        <div className='presentation'>
            <Header />
            <Description />
            <SignIn />
            <div className="scroll-to-learn">
                <p className="underline">
                    Scroll down to learn more.
                </p>
            </div>          
        </div>
    )
}

export default Presentation
