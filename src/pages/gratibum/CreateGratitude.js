import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

import Back from '../../components/Back'

import { auth, firebaseDb } from '../../services/firebase'
import { collection, getDocs, getDoc, setDoc, doc, query, addDoc } from 'firebase/firestore/lite';
import { getDatabase, ref, child, push, update, set } from "firebase/database";
// import document

const CreateGratitude = () => {

    const {t} = useTranslation();
    const history = useHistory();

    const [ img, setImg ] = useState("");
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ descriptionWhat, setDescriptionWhat ] = useState("");
    const [ descriptionWhy, setDescriptionWhy ] = useState("");
    const [ descriptionElse, setDescriptionElse ] = useState("");

    const [ error, setError ] = useState( false );

    const titleTextChanged = event => {
        let newTitle = event.target.value;
        setTitle(newTitle);
    }

    const whatTextChanged = event => {
        let newDesc = event.target.value;
        setDescriptionWhat(newDesc);
    }

    const whyTextChanged = event => {
        let newDesc = event.target.value;
        setDescriptionWhy(newDesc);
    }

    const elseTextChanged = event => {
        let newDesc = event.target.value;
        setDescriptionElse(newDesc);
    }

    const submit = async () => {
        setDescription( descriptionWhat + ' ' + descriptionWhy + ' ' + descriptionElse );

        if ( description != "" )
            saveToFirebase();
        else {
            setError( true );
        }
    }
    

    const email = JSON.parse(localStorage.getItem('currentUser')).email;

    let querySnapshot;
    const getUserFromFirebase = async ( userEmail ) => {
        querySnapshot = await getDocs( collection( firebaseDb, `/test/accounts/${userEmail}` ) );
        return querySnapshot;
    }


    const saveToFirebase = async () => {

        const ress = getUserFromFirebase( email );
        let gratibums_doc;

        ress
            .then( ful => {
                console.log(ful);
            })
            .catch( er => console.log(er) );
            
            
            const docRef = doc( firebaseDb, `test/accounts/${email}`, "gratibums");
            const docSnap = await getDoc(docRef);
            console.log(docSnap.data());
            
            // const data = docSnap.data();


            const d = new Date();
            const id = d.getTime();
            const newGratitude = {
                [id]:{
                    date: new Date(),
                    title: title,
                    description: description,
                    imageUrl: ""
                }
            };

            await setDoc(doc( firebaseDb, `/test/accounts/${email}`, "gratibums"), newGratitude, { merge: true });
            
            history.push('/gratibum');
    }

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
                    <input type="file" accept="image/*" />
                </div>

                <form>
                    <div className="gratitude-title">
                        <label htmlFor="title">
                            { t('gratitude_title') }
                        </label>
                        <input id="title" type="text" placeholder={t('sunsets')} required
                            onChange={ titleTextChanged }
                        />
                    </div>

                    <div className="gratitude-description">
                        <label htmlFor="what">
                            { t('q_what') }
                        </label>
                        <input id="what" type="text" placeholder={t('q_what_placeholder')} 
                            onChange={ whatTextChanged }
                        />
                    </div>

                    <div className="gratitude-description">
                        <label htmlFor="why">
                            { t('q_why') }
                        </label>
                        <input id="why" type="text" placeholder={t('q_why_placeholder')} 
                            onChange={ whyTextChanged }
                        />
                    </div>

                    <div className="gratitude-description">
                        <label htmlFor="else">
                            { t('q_else') }
                        </label>
                        <input id="else" type="text" placeholder={t('q_else_placeholder')} 
                            onChange={ elseTextChanged }
                        />
                    </div>

                </form>

            { error &&
                <p id="error" style={
                    { color: 'red',
                      fontSize: '1.5em'
                    }
                }>
                    Click again.
                </p>
            }
                <div className="submit"
                    onClick={ () => submit() }
                >
                    <p>
                        { t('add_gratitude') }
                    </p>
                </div>
            </section>
        </div>
    )
}

export default CreateGratitude