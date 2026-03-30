import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Tabs,
  Tab,
  Grid,
  InputAdornment,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import GoalCard from '../components/GoalCard';
import EmptyState from '../components/EmptyState';
import { useGoals } from '../contexts/GoalContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const GoalsList = () => {
  const { goals, markProgress, togglePause, deleteGoal } = useGoals();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState('');

  const filteredGoals = goals
    .filter((goal) => {
      const matchesSearch = goal.title
        .toLowerCase()
        .includes(search.toLowerCase());
      if (tab === 0) return matchesSearch;
      if (tab === 1) return goal.status === 'active' && matchesSearch;
      if (tab === 2) return goal.status === 'completed' && matchesSearch;
      if (tab === 3) return goal.status === 'paused' && matchesSearch;
      return matchesSearch;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleTabChange = (event, newValue) => setTab(newValue);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1400, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom fontWeight={600}>
        {t('allGoals') || 'همه اهداف'}
      </Typography>

      <TextField
        fullWidth
        placeholder={t('searchGoals') || 'جستجو در اهداف...'}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 4 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      <Tabs value={tab} onChange={handleTabChange} sx={{ mb: 4 }}>
        <Tab label="همه" />
        <Tab label="فعال" />
        <Tab label="تکمیل شده" />
        <Tab label="متوقف" />
      </Tabs>

      {filteredGoals.length === 0 ? (
        <EmptyState message="هیچ هدفی یافت نشد" />
      ) : (
        <Grid container spacing={3}>
          {filteredGoals.map((goal) => (
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
    </Box>
  );
};

export default GoalsList;
