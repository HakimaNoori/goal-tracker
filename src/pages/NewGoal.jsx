import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  Paper,
} from '@mui/material';
import { useGoals } from '../contexts/GoalContext';
import { useTranslation } from 'react-i18next';

const categories = [
  'Health',
  'Study',
  'Work',
  'Personal',
  'Fitness',
  'Finance',
];

const NewGoal = () => {
  const { addGoal } = useGoals();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [form, setForm] = useState({
    title: '',
    category: '',
    type: 'daily',
    target: '',
    startDate: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.category || !form.target) return;

    addGoal({
      ...form,
      target: Number(form.target),
    });

    navigate('/goals');
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 700, mx: 'auto' }}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom align="center" fontWeight={600}>
          {t('newGoal')}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('title')}
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>{t('category')}</InputLabel>
                <Select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  label={t('category')}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>{t('type')}</InputLabel>
                <Select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  label={t('type')}
                >
                  <MenuItem value="daily">روزانه</MenuItem>
                  <MenuItem value="count">تعدادمحور</MenuItem>
                  <MenuItem value="time">زمان‌محور</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label={t('target')}
                name="target"
                type="number"
                value={form.target}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="تاریخ شروع"
                name="startDate"
                type="date"
                value={form.startDate}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="یادداشت (اختیاری)"
                name="notes"
                multiline
                rows={4}
                value={form.notes}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained" size="large" fullWidth>
                {t('save')}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default NewGoal;
