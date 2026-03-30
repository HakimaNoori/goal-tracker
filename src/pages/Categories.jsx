import { Box, Typography, Grid, Paper } from '@mui/material';
import { useGoals } from '../contexts/GoalContext';

const Categories = () => {
  const { goals } = useGoals();

  const categoryStats = goals.reduce((acc, goal) => {
    if (!acc[goal.category]) {
      acc[goal.category] = { active: 0, completed: 0 };
    }
    if (goal.status === 'active') acc[goal.category].active++;
    if (goal.status === 'completed') acc[goal.category].completed++;
    return acc;
  }, {});

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        دسته‌بندی‌ها
      </Typography>

      <Grid container spacing={3}>
        {Object.keys(categoryStats).map((cat) => {
          const stats = categoryStats[cat];
          return (
            <Grid item xs={12} sm={6} md={4} key={cat}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6">{cat}</Typography>
                <Typography>فعال: {stats.active}</Typography>
                <Typography>تکمیل شده: {stats.completed}</Typography>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Categories;
