import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ToggleButton, ToggleButtonGroup } from '@mui/material';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const handleLanguageChange = (event: React.MouseEvent<HTMLElement>, newLanguage: string | null) => {
    if (newLanguage) {
      setSelectedLanguage(newLanguage);
      i18n.changeLanguage(newLanguage);
    }
  };

  const availableLanguages = Object.keys(i18n.services.resourceStore.data);
  const languagesToFilter = ['system'];
  const filteredLanguages = availableLanguages.filter((language) => !languagesToFilter.includes(language));

  return (
    <ToggleButtonGroup value={selectedLanguage} onChange={handleLanguageChange} exclusive>
      {filteredLanguages.map((language) => (
        <ToggleButton
          sx={[
            ({ palette }) => ({
              border: `2px solid ${palette.primary.main}`,
              color: palette.primary.main,
              '&.Mui-selected': {
                color: palette.text.white,
                backgroundColor: `${palette.primary.main} !important`,
              },
            }),
          ]}
          key={language}
          value={language}
        >
          {language}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default LanguageSelector;
