// src/components/modules/tickets/TicketList.tsx
import React, { useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { GenericGrid } from '../../components/common/GenericGrid';
import { TicketForm } from './TicketForm';
import type { Ticket } from './types/Ticket';

export const TicketList: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);

  // Mock data matching your Ticket interface
  const rows: Ticket[] = [
    { 
      id: '1', 
      title: 'GST Filing - ABC Corp', 
      clientId: '1',
      serviceId: '1',
      activityId: '1',
      deadline: new Date('2024-02-15'),
      priority: 'high',
      status: 'open',
      assignedTo: 'John Doe',
      createdBy: 'admin',
      createdAt: new Date('2024-01-20')
    },
    { 
      id: '2', 
      title: 'Income Tax Return - XYZ Ltd', 
      clientId: '2',
      serviceId: '2',
      activityId: '3',
      deadline: new Date('2024-02-20'),
      priority: 'medium',
      status: 'in-progress',
      assignedTo: 'Jane Smith',
      createdBy: 'admin',
      createdAt: new Date('2024-01-18')
    },
    { 
      id: '3', 
      title: 'Audit Report - DEF Enterprises', 
      clientId: '3',
      serviceId: '3',
      activityId: '5',
      deadline: new Date('2024-01-30'),
      priority: 'low',
      status: 'completed',
      assignedTo: 'Mark Lee',
      createdBy: 'admin',
      createdAt: new Date('2024-01-15')
    },
  ];

  const columns = [
    { field: 'title', headerName: 'Ticket Title', flex: 2 },
    { 
      field: 'priority', 
      headerName: 'Priority', 
      width: 120,
      renderCell: (params: any) => (
        <Box
          sx={{
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.75rem',
            fontWeight: 'bold',
            textAlign: 'center',
            backgroundColor: 
              params.value === 'high' ? '#ffebee' :
              params.value === 'medium' ? '#fff3e0' : '#e8f5e8',
            color:
              params.value === 'high' ? '#c62828' :
              params.value === 'medium' ? '#ef6c00' : '#2e7d32',
          }}
        >
          {params.value.toUpperCase()}
        </Box>
      )
    },
    { 
      field: 'status', 
      headerName: 'Status', 
      width: 130,
      renderCell: (params: any) => (
        <Box
          sx={{
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.75rem',
            fontWeight: 'bold',
            textAlign: 'center',
            backgroundColor: 
              params.value === 'completed' ? '#e8f5e8' :
              params.value === 'in-progress' ? '#e3f2fd' :
              params.value === 'overdue' ? '#ffebee' : '#fff3e0',
            color:
              params.value === 'completed' ? '#2e7d32' :
              params.value === 'in-progress' ? '#1565c0' :
              params.value === 'overdue' ? '#c62828' : '#ef6c00',
          }}
        >
          {params.value.replace('-', ' ').toUpperCase()}
        </Box>
      )
    },
    { field: 'assignedTo', headerName: 'Assigned To', flex: 1 },
    { 
      field: 'deadline', 
      headerName: 'Deadline', 
      width: 120,
      valueFormatter: (params: any) => 
        new Date(params.value).toLocaleDateString()
    },
  ];

  const handleAddTicket = () => {
    setEditingTicket(null);
    setOpen(true);
  };

  const handleEdit = (row: Ticket) => {
    setEditingTicket(row);
    setOpen(true);
  };

  const handleDelete = (row: Ticket) => {
    alert(`Delete ticket: ${row.title}`);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingTicket(null);
  };

  const handleSubmit = (ticketData: Omit<Ticket, 'id'>) => {
    console.log('Ticket submitted:', ticketData);
    handleClose();
  };

  return (
    <Box>
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <h2>Manage Tickets</h2>
        <Button variant="contained" color="primary" onClick={handleAddTicket}>
          + Add Ticket
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

      {/* Dialog for Add/Edit Ticket */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        PaperProps={{ 
          sx: { 
            borderRadius: 2,
            maxHeight: '90vh'
          } 
        }}
      >
        <DialogTitle>
          {editingTicket ? 'Edit Ticket' : 'Create New Ticket'}
        </DialogTitle>
        <DialogContent>
          <TicketForm 
            ticket={editingTicket || undefined}
            onSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};