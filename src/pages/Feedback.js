import React from 'react'

import img_cosmin from '../images/feedback/cosmin.jpg';
import img_tania from '../images/feedback/tania.jpg';
import img_roland from '../images/feedback/roland.jpg';
import Quote from '../components/Quote';
import ScrollToTop from '../components/ScrollToTop';

const Feedback = () => {
    return (
        <section className='feedback'>
            <h1>FEEDBACK</h1>

            <div className="cards">
                <div className="card">
                    <img src={ img_cosmin } alt="" />
                    <h3>COSMIN</h3>
                    <span></span>
                    <div>
                        <div className='quote-left'>
                            <Quote />
                        </div>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                        <div className='quote-right'>
                            <Quote />
                        </div>
                    </div>
                </div>

                <div className="card">
                <img src={ img_tania } alt="" />
                    <h3>TANIA</h3>
                    <span></span>
                    <div>
                        <div className='quote-left'>
                            <Quote />
                        </div>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                        <div className='quote-right'>
                            <Quote />
                        </div>
                    </div>
                </div>

                <div className="card">
                <img src={ img_roland } alt="" />
                    <h3>ROLAND</h3>
                    <span></span>
                    <div>
                        <div className='quote-left'>
                            <Quote />
                        </div>
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                        <div className='quote-right'>
                            <Quote />
                        </div>
                    </div>
                </div>
            </div>

            <ScrollToTop />
        </section>
    )
}

export default Feedback
