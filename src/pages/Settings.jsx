import {
  Box,
  Typography,
  Paper,
  Button,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { useLanguage } from '../contexts/LanguageContext';
import { useThemeMode } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';

const Settings = () => {
  const { language, changeLanguage } = useLanguage();
  const { mode, toggleTheme } = useThemeMode();
  const { t } = useTranslation();

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 700, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        تنظیمات
      </Typography>

      <Paper sx={{ p: 4, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          زبان
        </Typography>
        <Box display="flex" gap={2}>
          <Button
            variant={language === 'en' ? 'contained' : 'outlined'}
            onClick={() => changeLanguage('en')}
          >
            English
          </Button>
          <Button
            variant={language === 'fa' ? 'contained' : 'outlined'}
            onClick={() => changeLanguage('fa')}
          >
            فارسی
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom>
          تم
        </Typography>
        <FormControlLabel
          control={<Switch checked={mode === 'dark'} onChange={toggleTheme} />}
          label={mode === 'dark' ? 'تم تیره' : 'تم روشن'}
        />
      </Paper>
    </Box>
  );
};

export default Settings;
