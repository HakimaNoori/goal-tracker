import { Box, Typography, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const EmptyState = ({ message, onAddClick }) => {
  const { t } = useTranslation();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      py={8}
      textAlign="center"
    >
      <Typography variant="h5" color="text.secondary" gutterBottom>
        {message || t('noGoalsYet')}
      </Typography>
      {onAddClick && (
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={onAddClick}
          sx={{ mt: 2 }}
        >
          {t('newGoal')}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
