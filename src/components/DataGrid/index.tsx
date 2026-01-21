import { Box } from '@mui/material';
import {
  GridColDef,
  GridRowsProp,
  GridToolbar,
  DataGrid as MuiDataGrid,
} from '@mui/x-data-grid';

type DataGridProps = {
  rows: GridRowsProp;
  columns: GridColDef[];
};

const componentsProps = {
  toolbar: {
    showQuickFilter: true,
    quickFilterProps: { debounceMs: 500 },
  },
};

const DataGrid = ({ rows, columns }: DataGridProps) => {
  return (
    <Box sx={{ height: '82%', width: '100%' }}>
      <Box sx={{ display: 'flex', height: '100%' }}>
        <Box sx={{ flexGrow: 1 }}>
          <MuiDataGrid
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            componentsProps={componentsProps}
            disableSelectionOnClick
            rows={rows}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default DataGrid;
