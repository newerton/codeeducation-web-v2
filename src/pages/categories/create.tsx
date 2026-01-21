import { Box, Typography } from '@mui/material';

import LayoutPrivate from 'layout/private';

const CategoriesCreate = () => {
  return (
    <Box>
      <Typography variant="h4">Create Category</Typography>
    </Box>
  );
};

export default CategoriesCreate;

CategoriesCreate.getLayout = function getLayout(page: any) {
  return <LayoutPrivate>{page}</LayoutPrivate>;
};
