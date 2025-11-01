// src/components/common/ModernDataGrid.tsx
import * as React from 'react';
import  {
  DataGrid,
  type GridColDef,
  GridToolbar,
  type GridRenderCellParams,
} from '@mui/x-data-grid';
import { Box, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface GenericGridProps {
  title: string;
  rows: any[];
  columns: GridColDef[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
}

export const GenericGrid: React.FC<GenericGridProps> = ({
  title,
  rows,
  columns,
  onEdit,
  onDelete,
}) => {
  // Append action column dynamically
  const actionColumn: GridColDef = {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    filterable: false,
    width: 120,
    align: 'center',
    renderCell: (params: GridRenderCellParams) => (
      <Box>
        {onEdit && (
          <IconButton
            color="primary"
            size="small"
            onClick={() => onEdit(params.row)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        )}
        {onDelete && (
          <IconButton
            color="error"
            size="small"
            onClick={() => onDelete(params.row)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    ),
  };

  return (
    <Box sx={{ height: 500, width: '100%' }}>
      <Typography variant="h6" mb={2}>
        {title}
      </Typography>
      <DataGrid
        rows={rows}
        columns={[...columns, actionColumn]}
        pageSizeOptions={[5, 10, 25]}
        pagination
        disableRowSelectionOnClick
        slots={{
          toolbar: GridToolbar, // ✅ Adds filter/search toolbar
        }}
        sx={{
          borderRadius: 2,
          boxShadow: 3,
          backgroundColor: '#fff',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f5f5f5',
            fontWeight: 'bold',
          },
        }}
      />
    </Box>
  );
};
