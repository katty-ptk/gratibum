import React from 'react'
import ScrollToTop from '../components/ScrollToTop'
import SignIn from '../components/SignIn'

const JoinGratibum = () => {
    return (
        <div className='join-us'>
            <h1>JOIN US IN KEEPING MEMORIES.</h1>
            <div className='landing-questions'>
                <p>Did we catch your interest?</p>

                <p>Do you want to keep your memories in a virtual journal?</p>

                <p>Do you want to remember yourself that life is beautiful through your memories?</p>
            </div>
            <h3>Join Gratibum!</h3>
            <SignIn />
            <ScrollToTop />
        </div>
    )
}

export default JoinGratibum
