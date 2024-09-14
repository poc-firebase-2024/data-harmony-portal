import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-primary text-primary-foreground p-4 text-center">
      <p>&copy; 2024 Database Analysis. {t('allRightsReserved')}</p>
    </footer>
  );
};

export default Footer;