import React from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import { useWindowDimensions } from '../../services/service';
import { Box, InputLabel, MenuItem, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from 'react-i18next';
import './selectLanguage.scss';

function SelectLanguage() {
  const { i18n,  t } = useTranslation();

  const [lang, setLang] = React.useState('');
  
  const handleChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
    setLang(event.target.value as string);
    window.location.reload();
  };
  const { width } = useWindowDimensions();

  return (
    <Box>
      <FormControl size="small" sx={{
        width: () => (width > 660 ? '100px' : '90px'),
      }}>
        <InputLabel sx={{
          color: (theme) =>
            theme.palette.mode === 'light' ? theme.palette.primary.contrastText : theme.palette.secondary.contrastText,
          }}> <LanguageIcon />
        </InputLabel>
        <Select
          value={lang}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={'ru'}>{t('lang:Ru')}</MenuItem>
          <MenuItem value={'en'}>{t('lang:En')}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectLanguage;
