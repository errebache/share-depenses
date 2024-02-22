import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (e) => {
    const selectedLanguage = e.target.value;
    i18n.changeLanguage(selectedLanguage);
  };

  return (
    <div>
      <select onChange={changeLanguage}>
        <option value="en">{t('languages.english')}</option>
        <option value="fr">{t('languages.french')}</option>
      </select>
    </div>
  );
}

export default LanguageSelector;
