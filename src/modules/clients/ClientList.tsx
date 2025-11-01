// src/components/modules/clients/ClientList.tsx
import React, { useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { GenericGrid } from '../../components/common/GenericGrid';
import { ClientForm } from './ClientForm';

export const ClientList: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<any | null>(null);

  const rows = [
    { id: '1', name: 'ABC Pvt Ltd', email: 'info@abc.com', phone: '9876543210' },
    { id: '2', name: 'XYZ Associates', email: 'contact@xyz.com', phone: '9123456789' },
  ];

  const columns = [
    { field: 'name', headerName: 'Client Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phone', headerName: 'Phone', width: 150 },
  ];

  const handleAddClient = () => {
    setEditingClient(null);
    setOpen(true);
  };

  const handleEdit = (row: any) => {
    setEditingClient(row);
    setOpen(true);
  };

  const handleDelete = (row: any) => {
    alert(`Delete client: ${row.name}`);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h2>Manage Clients</h2>
        <Button variant="contained" color="primary" onClick={handleAddClient}>
          + Add Client
        </Button>
      </Box>

      {/* Data Grid */}
      <GenericGrid
        title=""
        rows={rows}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Dialog for Add/Edit Client */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle>{editingClient ? 'Edit Client' : 'Add New Client'}</DialogTitle>
        <DialogContent>
          {  <ClientForm /> }
        </DialogContent>
      </Dialog>
    </Box>
  );
};
