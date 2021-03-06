import React from 'react';
import { Box, Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        margin: '5rem',
        fontSize: '4rem',
      }}
    >
      <div>404</div>
      <div>{t('errors:pagesNotDefined')}</div>
      <br />
      <Button variant="text" size="large" sx={{ fontSize: '4rem' }}>
        <NavLink to="/mainPage" className="menu__navLink">
          {t('header:menuItem1')}
        </NavLink>
      </Button>
    </Box>
  );
}

export default NotFoundPage;
