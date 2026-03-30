import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import {
  CheckCircle,
  Edit,
  Pause,
  PlayArrow,
  Delete,
} from '@mui/icons-material';
import ProgressBar from './ProgressBar';
import CategoryChip from './CategoryChip';
import { useTranslation } from 'react-i18next';

const GoalCard = ({
  goal,
  onMarkProgress,
  onEdit,
  onTogglePause,
  onDelete,
}) => {
  const { t } = useTranslation();

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            {goal.title}
          </Typography>
          <CategoryChip category={goal.category} />
        </Box>

        <ProgressBar progress={goal.progress} target={goal.target} />

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {goal.type === 'daily'
            ? 'روزانه'
            : goal.type === 'count'
              ? 'تعداد'
              : 'زمان'}
        </Typography>

        <Box mt={2} display="flex" gap={1} flexWrap="wrap">
          <Button
            variant="contained"
            color="success"
            startIcon={<CheckCircle />}
            size="small"
            onClick={() => onMarkProgress(goal.id)}
            disabled={goal.status !== 'active'}
          >
            {t('markProgress')}
          </Button>

          <IconButton
            onClick={() => onEdit(goal.id)}
            color="primary"
            size="small"
          >
            <Edit />
          </IconButton>

          <IconButton
            onClick={() => onTogglePause(goal.id)}
            color={goal.status === 'paused' ? 'success' : 'warning'}
            size="small"
          >
            {goal.status === 'paused' ? <PlayArrow /> : <Pause />}
          </IconButton>

          <IconButton
            onClick={() => onDelete(goal.id)}
            color="error"
            size="small"
          >
            <Delete />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GoalCard;
