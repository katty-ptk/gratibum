import React from 'react';
import { useTranslation } from 'react-i18next';

import img_cosmin from '../../images/feedback/cosmin.jpg';
import img_tania from '../../images/feedback/tania.jpg';
import img_roland from '../../images/feedback/roland.jpg';

import logo from '../../images/logo.png'

import Quote from '../../components/Quote';
import ScrollToTop from '../../components/ScrollToTop';

const Feedback = () => {
    const { t } = useTranslation();

    return (
        <section className='feedback'>
            <h1>{ t('feedback') }</h1>

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
                <img src={ logo } alt="" />
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
                <img src={ logo } alt="" />
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
