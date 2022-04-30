import React from 'react'

import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useTranslation } from 'react-i18next'

import Back from '../../components/Back'

const CreateGratitude = () => {

    const {t} = useTranslation();

    return (
        <div className={ window.innerWidth < 1000 ? 'create-gratitude create-gratitude-small gratibum gratibum-small' : 'create-gratitude create-gratitude-large gratibum gratibum-large'}>
            <div className="app-header">          
                <h2>
                    { t("new_gratitude") }
                </h2>

                <Link to="/gratibum">
                    <div className="back">
                        <Back />
                    </div>
                </Link>
            </div>


            <section className="query">
                <div className="gratitude-image">
                    <p>
                        { t('add_image') }
                    </p>
                </div>

                <form>
                    <div className="gratitude-title">
                        <label htmlFor="title">
                            { t('gratitude_title') }
                        </label>
                        <input id="title" type="text" placeholder={t('sunsets')} required/>
                    </div>

                    <div className="gratitude-description">
                        <label htmlFor="what">
                            { t('q_what') }
                        </label>
                        <input id="what" type="text" placeholder={t('q_what_placeholder')} />
                    </div>

                    <div className="gratitude-description">
                        <label htmlFor="why">
                            { t('q_why') }
                        </label>
                        <input id="why" type="text" placeholder={t('q_why_placeholder')} />
                    </div>

                    <div className="gratitude-description">
                        <label htmlFor="else">
                            { t('q_else') }
                        </label>
                        <input id="else" type="text" placeholder={t('q_else_placeholder')} />
                    </div>

                </form>

                <div className="submit">
                    <p>
                        { t('add_gratitude') }
                    </p>
                </div>
            </section>
        </div>
    )
}

export default CreateGratitude