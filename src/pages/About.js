import React from 'react'
import ScrollToTop from '../components/ScrollToTop'

const About = () => {
    return (
        <section className='about'>
            <h1>DESPRE GRATIBUM</h1>

            <div className="abouts">
                <div className='align-left'>
                    <p>
                        Un jurnal de memorii faine prin poze.
                    </p>
                </div>

                <div className='align-right'>
                    <p>
                        Foarte simplu.
                    </p>
                </div>

                <div className='align-left'>
                    <p>
                        Not time consuming.
                    </p>
                </div>

                <div className='align-right'>
                    <p>
                        Poate ajuta la creearea obiceiului de journaling.
                    </p>
                </div>

                <div className='align-left'>
                    <p>
                        Aduce cate un zambet la fiecare vizita.
                    </p>
                </div>
            </div>

            <ScrollToTop />
        </section>
    )
}

export default About
