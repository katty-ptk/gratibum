import i18next from 'i18next';
import React from 'react';

const SelectLanguage = () => {
    const languages = [
        {
            code: 'en',
            country_code: 'gb'
        },

        {
            code: 'ro',
            country_code: 'rou'
        }
    ];

    return (
        <div className="languages">
            {languages.map( ({ code, country_code }) => (
                <button onClick={ () => i18next.changeLanguage( code ) }>
                     { code }
                </button>
            ))}
        </div>
    );

};

export default SelectLanguage;
