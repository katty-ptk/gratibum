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
                    { t("New Gratitude") }
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
                        { t('Add an image') }
                    </p>
                </div>

                <form>
                    <div className="gratitude-title">
                        <label htmlFor="title">
                            { t('The title of your gratitude: ') }
                        </label>
                        <input id="title" type="text" placeholder="ex: Sunsets" required/>
                    </div>

                    <div className="gratitude-description">
                        <label htmlFor="what">
                            { t('What are you grateful for?') }
                        </label>
                        <input id="what" type="text" placeholder="I am grateful for ..." />
                    </div>

                    <div className="gratitude-description">
                        <label htmlFor="why">
                            { t('Why are you grateful for this?') }
                        </label>
                        <input id="why" type="text" placeholder="I am grateful for this because ..." />
                    </div>

                    <div className="gratitude-description">
                        <label htmlFor="wlse">
                            { t('Anything else you want to add?') }
                        </label>
                        <input id="else" type="text" placeholder="I felt ... and ..." />
                    </div>

                </form>

                <div className="submit">
                    <p>
                        { t('Add Gratitude!') }
                    </p>
                </div>
            </section>
        </div>
    )
}

export default CreateGratitude