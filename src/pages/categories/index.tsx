import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import {
  GridColDef,
  GridRenderCellParams,
  GridRowsProp,
} from '@mui/x-data-grid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

import DataGrid from '@components/DataGrid';
import { useAppSelector } from '@hooks/index';
import { selectCategories } from '@store/categories/categoriesSlice';
import LayoutPrivate from 'layout/private';

const CategoriesIndex = () => {
  const { push } = useRouter();
  const categories = useAppSelector(selectCategories);

  const rows: GridRowsProp = categories.map((category) => ({
    id: category.id,
    name: category.name,
    description: category.description,
    isActive: true,
    createdAt: new Date(category.created_at).toLocaleDateString('pt-BR'),
  }));

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 1 },
    {
      field: 'isActive',
      headerName: 'Status',
      flex: 1,
      type: 'boolean',
      renderCell: renderIsActiveCell,
    },
    {
      field: 'createdAt',
      headerName: 'Date',
      flex: 1,
      type: 'date',
    },
    {
      field: 'id',
      headerName: 'Actions',
      type: 'actions',
      flex: 0.5,
      renderCell: renderActionCell,
    },
  ];

  function renderIsActiveCell(row: GridRenderCellParams) {
    return (
      <Typography color={row.value ? 'success.main' : 'error'}>
        {row.value ? 'Active' : 'Inactive'}
      </Typography>
    );
  }

  const handleEdit = useCallback(
    (id: string) => {
      push(`/categories/edit/${id}`);
    },
    [push],
  );

  function renderActionCell(row: GridRenderCellParams) {
    const id = row.id.toString();
    return (
      <>
        <IconButton
          color="primary"
          onClick={() => handleEdit(id)}
          arial-label="edit"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="secondary"
          onClick={() => handleEdit(id)}
          arial-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </>
    );
  }
  return (
    <>
      <Box display="flex" justifyContent="flex-end">
        <Link href="/categories/create">
          <Button
            variant="contained"
            color="secondary"
            style={{ marginBottom: '1rem' }}
          >
            New Category
          </Button>
        </Link>
      </Box>

      <DataGrid rows={rows} columns={columns} />
    </>
  );
};

export default CategoriesIndex;

CategoriesIndex.getLayout = function getLayout(page: any) {
  return <LayoutPrivate>{page}</LayoutPrivate>;
};
