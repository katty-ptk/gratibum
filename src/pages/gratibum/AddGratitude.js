import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

import Back from '../../components/Back'

import logo from '../../images/logo.png';
import test from '../../images/tests/test.png';

import { auth, firebaseDb } from '../../services/firebase'
import { collection, getDocs, getDoc, setDoc, doc, query, addDoc } from 'firebase/firestore/lite';
import { getDatabase, ref, child, push, update, set } from "firebase/database";
// import document

import {  motion } from 'framer-motion';

const addGratitudeVariants = {
    initial: {
        opacity: 0
    },

    animate: {
        opacity: 1,
        transition: { type: 'tween' }
    }
}


const CreateGratitude = () => {

    const {t} = useTranslation();
    const history = useHistory();

    const [ img, setImg ] = useState(logo);
    const [ preview, setPreview ] = useState(logo);
    const [ title, setTitle ] = useState("");
    // const [ description, setDescription ] = useState("");
    let description;
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

    let fileInput;
    useEffect( async () => {
        if (img) {
            const reader = new FileReader();
            reader.onload = async () => {
                await setPreview(reader.result);
            };
            reader.readAsDataURL(img);
            // console.log( preview );
          } else {
            await setPreview(logo);
          }
      }, [img]);

    const imageChanged = async ( e ) => { 
        e.preventDefault();

        fileInput = document.getElementById('gratitude-image').files[0];

        if (fileInput) {
            await setImg(fileInput);
          } else {
            await setImg(logo);
          }  

        console.log( fileInput );
    }


    const submit = async () => {
        // await setDescription( descriptionWhat + ' ' + descriptionWhy + ' ' + descriptionElse );
        description = descriptionWhat + ' ' + descriptionWhy + ' ' + descriptionElse; 
        await setImg( logo );

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

    let mode;
    const checkImageMode = async ( imageSrc ) => {
      const im = new Image();
      im.src = imageSrc;
      if (im.width < im.height)
        mode = "portrait";
      else if ( im.width == im.height )
        mode = "square";  
      else
        mode = "landscape";
  
      return mode;
    }  


    const saveToFirebase = async () => {

        const ress = getUserFromFirebase( email );
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
                    date: new Date(d).toString(),
                    title: title,
                    description: description,
                    questions: {
                        what: descriptionWhat,
                        why: descriptionWhy,
                        other: descriptionElse
                    },
                    imageUrl: preview,
                    ownerID: email,
                    id: id
                }
            };

            await setDoc(doc( firebaseDb, `/test/accounts/${email}`, "gratibums"), newGratitude, { merge: true });
            
            await history.push('/gratibum');
    }

    return (
        <motion.div className={ window.innerWidth < 1000 ? 'create-gratitude create-gratitude-small gratibum gratibum-small' : 'create-gratitude create-gratitude-large gratibum gratibum-large'}
            variants={ addGratitudeVariants }
            initial="initial"
            animate="animate"
        >
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
                    <span
                        style={{ backgroundImage: `url(${preview})`}}
                    ></span>
                    <img src={ preview } alt="" 
                        className={ checkImageMode(preview)  }
                    />
                    { preview == logo &&   <p>
                            { t('add_image') }
                        </p>
                    }
                    <input type="file" accept="image/*" 
                        id="gratitude-image"
                        onChange={ imageChanged }
                    />
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
        </motion.div>
    )
}

export default CreateGratitude