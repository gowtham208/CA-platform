// src/components/modules/tickets/TicketList.tsx
import React, { useState } from 'react';
import { Box, Button, Dialog, DialogContent, DialogTitle, Chip } from '@mui/material';
import { GenericGrid } from '../../components/common/GenericGrid';
import { TicketForm } from './TicketForm';
import type { Ticket, Attachment } from './types/Ticket';
import { mockTickets } from '../../constants/mockdata';

export const TicketList: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);

  // Debug: Check what's in mockTickets
  console.log('Mock Tickets:', mockTickets);

  // Process dates to ensure they are valid Date objects
  const rows: Ticket[] = mockTickets.map(ticket => {
    // Handle deadline
    let deadlineDate: Date;
    if (ticket.deadline instanceof Date) {
      deadlineDate = ticket.deadline;
    } else if (typeof ticket.deadline === 'string') {
      deadlineDate = new Date(ticket.deadline);
    } else {
      deadlineDate = new Date(); // fallback
    }

    // Handle createdAt
    let createdDate: Date;
    if (ticket.createdAt instanceof Date) {
      createdDate = ticket.createdAt;
    } else if (typeof ticket.createdAt === 'string') {
      createdDate = new Date(ticket.createdAt);
    } else {
      createdDate = new Date(); // fallback
    }

    return {
      ...ticket,
      deadline: deadlineDate,
      createdAt: createdDate
    };
  });

  // Improved date formatter
  const formatDate = (date: any): string => {
    if (!date) return 'N/A';
    
    try {
      const dateObj = date instanceof Date ? date : new Date(date);
      return isNaN(dateObj.getTime()) 
        ? 'Invalid Date' 
        : dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });
    } catch (error) {
      console.error('Date formatting error:', error, date);
      return 'Invalid Date';
    }
  };

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
      valueFormatter: (params: any) => formatDate(params.value)
    },
    { 
      field: 'attachments', 
      headerName: 'Documents', 
      width: 150,
      renderCell: (params: any) => {
        const attachments: Attachment[] = params.value || [];
        if (attachments.length === 0) {
          return <Chip label="No files" size="small" variant="outlined" />;
        }
        return (
          <Box>
            <Chip 
              label={`${attachments.length} file${attachments.length > 1 ? 's' : ''}`}
              size="small"
              color="primary"
              variant="outlined"
            />
          </Box>
        );
      }
    },
    { 
      field: 'createdAt', 
      headerName: 'Created', 
      width: 120,
      valueFormatter: (params: any) => formatDate(params.value)
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
    if (window.confirm(`Are you sure you want to delete ticket: ${row.title}?`)) {
      console.log('Delete ticket:', row.id);
      // Add your delete logic here
    }
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