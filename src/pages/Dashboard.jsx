import { Box, Typography, Grid, Button, Paper } from '@mui/material';
import { Add, TrendingUp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import GoalCard from '../components/GoalCard';
import EmptyState from '../components/EmptyState';
import { useGoals } from '../contexts/GoalContext';
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const { goals, stats, markProgress, togglePause, deleteGoal } = useGoals();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const activeGoals = goals.filter((g) => g.status === 'active');
  const completedGoals = goals.filter((g) => g.status === 'completed');

  const overallProgress = goals.length
    ? Math.round(
        goals.reduce((sum, g) => sum + (g.progress / g.target) * 100, 0) /
          goals.length,
      )
    : 0;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
      {/* Top Summary Cards */}
      <Grid container spacing={3} mb={5}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={2}
            sx={{ p: 3, textAlign: 'center', borderRadius: 3 }}
          >
            <Typography variant="h3" color="primary" fontWeight="bold">
              {overallProgress}%
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('overallProgress')}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={2}
            sx={{ p: 3, textAlign: 'center', borderRadius: 3 }}
          >
            <Typography variant="h3" fontWeight="bold">
              {stats.completedCount}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('completed')}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={2}
            sx={{
              p: 3,
              textAlign: 'center',
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <TrendingUp sx={{ color: '#4caf50', fontSize: 40 }} />
            <Box>
              <Typography variant="h3" fontWeight="bold">
                {stats.currentStreak}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {t('streak')} 🔥
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            elevation={2}
            sx={{ p: 3, textAlign: 'center', borderRadius: 3 }}
          >
            <Typography variant="h3" fontWeight="bold" color="secondary">
              {stats.xpTotal}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('xp')}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Quick Actions */}
      <Box display="flex" gap={2} mb={4} flexWrap="wrap">
        <Button
          variant="contained"
          size="large"
          startIcon={<Add />}
          onClick={() => navigate('/goals/new')}
        >
          {t('newGoal')}
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => navigate('/goals')}
        >
          {t('viewAllGoals') || 'مشاهده همه اهداف'}
        </Button>
      </Box>

      {/* Active Goals */}
      <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
        {t('activeGoals')}
      </Typography>

      {activeGoals.length === 0 ? (
        <EmptyState
          message="هنوز هیچ هدفی فعال ندارید"
          onAddClick={() => navigate('/goals/new')}
        />
      ) : (
        <Grid container spacing={3}>
          {activeGoals.slice(0, 6).map((goal) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={goal.id}>
              <GoalCard
                goal={goal}
                onMarkProgress={markProgress}
                onEdit={(id) => navigate(`/goals/${id}`)}
                onTogglePause={togglePause}
                onDelete={deleteGoal}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* Completed Goals Preview */}
      {completedGoals.length > 0 && (
        <Box mt={6}>
          <Typography variant="h5" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
            {t('completed')} ({completedGoals.length})
          </Typography>
          <Grid container spacing={3}>
            {completedGoals.slice(0, 4).map((goal) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={goal.id}>
                <GoalCard
                  goal={goal}
                  onMarkProgress={() => {}}
                  onEdit={() => {}}
                  onTogglePause={() => {}}
                  onDelete={() => {}}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
