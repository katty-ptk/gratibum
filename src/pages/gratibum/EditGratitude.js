import { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";

import { collection, getDocs, getDoc, setDoc, doc, query, addDoc, updateDoc } from 'firebase/firestore/lite';
import { firebaseDb } from "../../services/firebase";

import Back from "../../components/Back";
import { useTranslation } from "react-i18next";

import logo from '../../images/logo.png';

const EditGratitude = () => {
    const { t } = useTranslation();
    const { id } = useParams();

    const gratitudeData = JSON.parse(localStorage.getItem('gratitudeData'));
    const email = JSON.parse(localStorage.getItem('currentUser')).email;

    // console.log(id);

    const [title, setTitle ] = useState("");
    const [qWhat, setQWhat] = useState(""); 
    const [qWhy, setQWhy] = useState(""); 
    const [qOther, setQOther] = useState(""); 
    const [description, setDescription] = useState(""); 
    const [img, setImg] = useState(logo);
    const [ preview, setPreview] = useState( gratitudeData.imageUrl != "" ? gratitudeData.imageUrl : logo);

    
    const handleTitleChange = ( e ) => {
        setTitle( e.target.value)
    }
    
    const handleWhatChange = ( e ) => {
        setQWhat( e.target.value)
    }

    const handleWhyChange = ( e ) => {
        setQWhy( e.target.value)
    }
    
    const handleOtherChange = ( e ) => {
        setQOther( e.target.value)
    }

    let fileInput;
    useEffect( async () => {
        if (img) {
            const reader = new FileReader();
            reader.onload = async () => {
                await setPreview(reader.result);
            };
            reader.readAsDataURL(img);
            console.log( preview );
          } else {
            await setPreview(logo);
          }
      }, [img]);

    const handleImageChange = async ( e ) => { 
        e.preventDefault();

        fileInput = document.getElementById('image').files[0];

        if (fileInput) {
            await setImg(fileInput);
          } else {
            await setImg(logo);
          }  

        // console.log( fileInput );
    }

    // console.log( new Date() )

    // console.log( gratitudeData.date )
    const submit = async () => {
        await setDescription( qWhat + " " + qWhy + " " + qOther );
        // DE VB CU COSMIN!
        const updated = {
            [id]:{
                date: !gratitudeData.date.seconds ? gratitudeData.date : new Date(),  // date changing to now if gratitude from app is being edited
                title: title != "" ? title : gratitudeData.title,
                description: qWhat + " " + qWhy + " " + qOther,
                questions: {
                    what: qWhat != "" ? qWhat : (gratitudeData.questions ? gratitudeData.questions.what : ""),
                    why: qWhy != "" ? qWhy : (gratitudeData.questions ? gratitudeData.questions.why : ""),
                    other: qOther != "" ? qOther : (gratitudeData.questions ? gratitudeData.questions.other : "")
                },
                imageUrl: preview,
                ownerID: email,
                id: id
            }
        }

        // await console.log(updated);
        const docRef = doc(firebaseDb, `test/accounts/${email}`, "gratibums");
        await updateDoc(
            docRef,
            updated
        );
    }

    return (
        <div className={ window.innerWidth < 1000 ? 'create-gratitude create-gratitude-small gratibum gratibum-small' : 'create-gratitude create-gratitude-large gratibum gratibum-large'}>
            <div className="app-header">          
                <h2>
                    Edit Gratitude
                </h2>

                <Link to="/gratibum">
                    <div className="back">
                        <Back />
                    </div>
                </Link>
            </div>


            <section className="query">
                <div className="gratitude-image">
                    <img src={preview} alt="" />
                { preview == logo &&
                    <p>
                        { t('add_image') }
                    </p>
                }
                    <input type="file" accept="image/*"
                        id="image"
                        onChange={handleImageChange}
                    />
                </div>

                <form>
                    <div className="gratitude-title">
                        <label htmlFor="title">
                            { t('gratitude_title') }
                        </label>
                        <input 
                            id="title" 
                            type="text" 
                            placeholder={t('sunsets')} 
                            defaultValue={gratitudeData.title}
                            onChange={ handleTitleChange }
                            required
                            
                        />
                    </div>

                    <div className="gratitude-description">
                        <label htmlFor="what">
                            { t('q_what') }
                        </label>
                        <input 
                            id="what" 
                            type="text" 
                            placeholder={t('q_what_placeholder')} 
                            defaultValue={( gratitudeData.questions && gratitudeData.questions.what) && gratitudeData.questions.what }                            
                            onChange={handleWhatChange}
                        />
                    </div>

                    <div className="gratitude-description">
                        <label htmlFor="why">
                            { t('q_why') }
                        </label>
                        <input 
                            id="why" 
                            type="text" 
                            placeholder={t('q_why_placeholder')} 
                            defaultValue={ gratitudeData.questions && gratitudeData.questions.why && gratitudeData.questions.why }
                            onChange={handleWhyChange}
                        />
                    </div>

                    <div className="gratitude-description">
                        <label htmlFor="else">
                            { t('q_else') }
                        </label>
                        <input 
                            id="else" 
                            type="text" 
                            placeholder={t('q_else_placeholder')}                            
                            defaultValue={ gratitudeData.questions && gratitudeData.questions.other && gratitudeData.questions.other }                            
                            onChange={handleOtherChange}
                        />
                    </div>

                </form>
{/* 
            { error &&
                <p id="error" style={
                    { color: 'red',
                      fontSize: '1.5em'
                    }
                }>
                    Click again.
                </p>
            } */}
                <div className="submit"
                    onClick={ () => submit() }
                >
                    <p>
                        Save!
                    </p>
                </div>
            </section>
        </div>
    );
}

export default EditGratitude;