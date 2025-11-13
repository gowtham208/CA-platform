// src/components/modules/clients/ClientList.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,

  Snackbar,
  CircularProgress,
  
  
  Paper
} from '@mui/material';
import {
  Add
} from '@mui/icons-material';
import { GenericGrid } from '../../components/common/GenericGrid';
import { ClientForm } from './ClientForm';
import { clientService } from '../clients/ClientService';
import type { Client } from '../../modules/clients/types/Client';

export const ClientList: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  //const [searchQuery] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  // Load clients on component mount
  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      setLoading(true);
      const data = await clientService.getAll();
      setClients(data);
    } catch (error) {
      showSnackbar('Failed to load clients', 'error');
    } finally {
      setLoading(false);
    }
  };

  // const handleSearch = async () => {
  //   if (!searchQuery.trim()) {
  //     loadClients();
  //     return;
  //   }

  //   try {
  //     setLoading(true);
  //     const results = await clientService.search(searchQuery);
  //     setClients(results);
  //   } catch (error) {
  //     showSnackbar('Search failed', 'error');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleAddClient = () => {
    setEditingClient(null);
    setOpen(true);
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setOpen(true);
  };

  const handleDelete = async (client: Client) => {
    if (window.confirm(`Are you sure you want to delete ${client.name}? This action cannot be undone.`)) {
      try {
        await clientService.delete(client.id);
        showSnackbar(`Client ${client.name} deleted successfully`, 'success');
        loadClients(); // Refresh the list
      } catch (error) {
        showSnackbar('Failed to delete client', 'error');
      }
    }
  };

  const handleSubmit = async (clientData: Omit<Client, 'id'>) => {
    try {
      if (editingClient) {
        // Update existing client
        await clientService.update(editingClient.id, clientData);
        showSnackbar(`Client ${clientData.name} updated successfully`, 'success');
      } else {
        // Create new client
        await clientService.create(clientData);
        showSnackbar(`Client ${clientData.name} created successfully`, 'success');
      }
      
      handleClose();
      loadClients(); // Refresh the list
    } catch (error) {
      showSnackbar('Failed to save client', 'error');
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditingClient(null);
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  // Transform data for display
  const rows = clients.map(client => ({
    ...client,
    serviceNames: client.services?.map(service => service.name).join(', '),
    activityNames: client.services?.flatMap(service => 
      service.activities.map(activity => activity.name)
    ).join(', ')
  }));

  const columns = [
    { field: 'name', headerName: 'Client Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    { 
      field: 'serviceNames', 
      headerName: 'Services', 
      flex: 1.2,
    },
    { 
      field: 'activityNames', 
      headerName: 'Activities', 
      flex: 1.5,
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 100 
    },
    { 
      field: 'assignedTo', 
      headerName: 'Assigned To', 
      width: 130 
    },
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      {/* Header Section */}
      <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'stretch', sm: 'center' }} gap={2} mb={3}>
        <Box>
          <h2>Manage Clients</h2>
        </Box>
        
        <Box display="flex" gap={1} flexDirection={{ xs: 'column', sm: 'row' }} width={{ xs: '100%', sm: 'auto' }}>
         
          {/* Action Buttons */}
          <Box display="flex" gap={1}>
           
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddClient}
              startIcon={<Add />}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Add Client
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Data Grid */}
      <Paper elevation={1} sx={{ overflow: 'hidden' }}>
        <GenericGrid
          title=""
          rows={rows}
          columns={columns}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Paper>

      {/* Add/Edit Client Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle>
          {editingClient ? `Edit Client - ${editingClient.name}` : 'Add New Client'}
        </DialogTitle>
        <DialogContent>
          <ClientForm 
            client={editingClient || undefined}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        </DialogContent>
      </Dialog>

      {/* Snackbar for notifications - Simple version */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </Box>
  );
};