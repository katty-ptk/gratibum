import React, { Suspense } from 'react'
import SelectLanguage from '../../components/SelectLanguage';
import About from './About';
import Feedback from './Feedback'
import JoinGratibum from './JoinGratibum'
import Presentation from './Presentation'


const LandingPage = () => {
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <div>
                <SelectLanguage />
                <Presentation />
                <About />
                <Feedback />
                <JoinGratibum />
            </div>
        </Suspense>
    )
}

export default LandingPage
