import React from 'react'
import ScrollToTop from '../components/ScrollToTop'
import SignIn from '../components/SignIn'

const JoinGratibum = () => {
    return (
        <div className='join-us'>
            <h1>JOIN US IN KEEPING MEMORIES.</h1>
            <div className={ window.innerWidth > 1000 ? 'join-us-large' : 'join-us-small' }>
                <div className='landing-questions'>
                    <p>Did we catch your interest?</p>

                    <p>Do you want to keep your memories in a virtual journal?</p>

                    <p>Do you want to remember yourself that life is beautiful through your memories?</p>
                </div>
                <div className="join-sign-in">
                    <h3>Join Gratibum!</h3>
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
