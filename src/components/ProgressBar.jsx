import { LinearProgress, Box, Typography } from '@mui/material';

const ProgressBar = ({ progress, target }) => {
  const percentage = Math.min(Math.round((progress / target) * 100), 100);

  return (
    <Box sx={{ width: '100%', mt: 1, mb: 2 }}>
      <Box display="flex" justifyContent="space-between" mb={0.5}>
        <Typography variant="body2" color="text.secondary">
          {progress} / {target}
        </Typography>
        <Typography variant="body2" fontWeight="bold">
          {percentage}%
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{ height: 10, borderRadius: 5 }}
      />
    </Box>
  );
};

export default ProgressBar;
