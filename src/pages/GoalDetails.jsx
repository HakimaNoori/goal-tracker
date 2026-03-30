import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  Divider,
} from '@mui/material';
import { useGoals } from '../contexts/GoalContext';
import ProgressBar from '../components/ProgressBar';
import { useTranslation } from 'react-i18next';

const GoalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { goals, markProgress, togglePause, deleteGoal } = useGoals();
  const { t } = useTranslation();

  const goal = goals.find((g) => g.id === id);

  if (!goal) {
    return <Typography>هدف یافت نشد</Typography>;
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, mx: 'auto' }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom>
          {goal.title}
        </Typography>

        <ProgressBar progress={goal.progress} target={goal.target} />

        <Box mt={4}>
          <Typography variant="h6">تاریخچه پیشرفت</Typography>
          <List>
            {goal.logs.length === 0 ? (
              <Typography color="text.secondary">
                هنوز پیشرفتی ثبت نشده است
              </Typography>
            ) : (
              goal.logs
                .slice()
                .reverse()
                .map((log, index) => (
                  <ListItem key={index}>
                    <Typography>
                      {log.date} — +{log.amount} ({log.xpEarned} XP)
                    </Typography>
                  </ListItem>
                ))
            )}
          </List>
        </Box>

        <Box mt={4} display="flex" gap={2}>
          <Button variant="contained" onClick={() => markProgress(id)}>
            ثبت پیشرفت امروز
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate(`/goals/${id}/edit`)}
          >
            ویرایش
          </Button>
          <Button
            variant="outlined"
            color="warning"
            onClick={() => togglePause(id)}
          >
            {goal.status === 'paused' ? 'از سرگیری' : 'توقف'}
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => deleteGoal(id)}
          >
            حذف
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default GoalDetails;
