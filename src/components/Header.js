import React from 'react';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { t } = useTranslation();

    return (
        <div className='header'>
            <h1>Gratibum</h1>
            <h2>{ t('gratitude_journal') }</h2>
        </div>
    )
}

export default Header;
