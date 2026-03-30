import { Chip } from '@mui/material';

const CategoryChip = ({ category }) => {
  const colors = {
    Health: 'success',
    Study: 'primary',
    Work: 'warning',
    Personal: 'secondary',
    Fitness: 'error',
    Finance: 'info',
  };

  return (
    <Chip
      label={category}
      color={colors[category] || 'default'}
      size="small"
      sx={{ fontWeight: 500 }}
    />
  );
};

export default CategoryChip;
