import { Box, Typography } from '@mui/material';

import { useAppSelector } from '@app/hooks';

import { selectCategories } from './categoriesSlice';

const CategoriesIndex = () => {
  const categories = useAppSelector(selectCategories);
  return (
    <Box>
      <Typography variant="h3" component="h1">
        ListCategory Page
      </Typography>
    </Box>
  );
};

export default CategoriesIndex;
