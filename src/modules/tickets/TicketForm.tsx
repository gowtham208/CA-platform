// src/components/modules/tickets/TicketForm.tsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Paper,
  Grid
} from '@mui/material';
import type { Ticket } from './types/Ticket';

interface TicketFormProps {
  ticket?: Ticket;
  onSubmit?: (ticket: Omit<Ticket, 'id'>) => void;
}

// Mock data for dropdowns
const mockClients = [
  { id: '1', name: 'ABC Pvt Ltd' },
  { id: '2', name: 'XYZ Associates' },
  { id: '3', name: 'DEF Enterprises' },
];

const mockServices = [
  { id: '1', name: 'GST Filing' },
  { id: '2', name: 'Income Tax' },
  { id: '3', name: 'Audit' },
  { id: '4', name: 'ROC Filing' },
];

const mockActivities = [
  { id: '1', name: 'GST 3B Filing', serviceId: '1' },
  { id: '2', name: 'GST 1 Filing', serviceId: '1' },
  { id: '3', name: 'ITR Filing - Individual', serviceId: '2' },
  { id: '4', name: 'ITR Filing - Corporate', serviceId: '2' },
  { id: '5', name: 'Statutory Audit', serviceId: '3' },
  { id: '6', name: 'Tax Audit', serviceId: '3' },
];

const mockTeamMembers = [
  'John Doe',
  'Jane Smith',
  'Mark Lee',
  'Sarah Wilson',
];

export const TicketForm: React.FC<TicketFormProps> = ({
  ticket,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    title: ticket?.title || '',
    clientId: ticket?.clientId || '',
    serviceId: ticket?.serviceId || '',
    activityId: ticket?.activityId || '',
    assignedTo: ticket?.assignedTo || '',
    deadline: ticket?.deadline ? ticket.deadline.toISOString().split('T')[0] : '',
    priority: ticket?.priority || 'medium',
    status: ticket?.status || 'open',
  });

  const [filteredActivities, setFilteredActivities] = useState(
    mockActivities.filter(activity => activity.serviceId === formData.serviceId)
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData((prev) => {
      const updatedData = { ...prev, [name]: value };
      
      // Reset activity when service changes
      if (name === 'serviceId') {
        updatedData.activityId = '';
        setFilteredActivities(mockActivities.filter(activity => activity.serviceId === value));
      }
      
      return updatedData;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const ticketData: Omit<Ticket, 'id'> = {
      ...formData,
      deadline: new Date(formData.deadline),
      createdBy: ticket?.createdBy || 'current-user',
      createdAt: ticket?.createdAt || new Date(),
    };
    
    if (onSubmit) {
      onSubmit(ticketData);
    }
    
    console.log('Submitted Ticket:', ticketData);
  };

  // Get activities filtered by selected service
  React.useEffect(() => {
    if (formData.serviceId) {
      setFilteredActivities(mockActivities.filter(activity => activity.serviceId === formData.serviceId));
    } else {
      setFilteredActivities([]);
    }
  }, [formData.serviceId]);

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 3,
        backgroundColor: '#fff',
        maxWidth: 900,
        mx: 'auto',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h6" mb={3} fontWeight="bold" color="primary">
          {ticket ? 'Edit Ticket' : 'Create New Ticket'}
        </Typography>

        <Grid container spacing={2}>
          {/* Ticket Title */}
          <Grid xs={12}>
            <TextField
              label="Ticket Title"
              name="title"
              fullWidth
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., GST Filing for ABC Corp"
            />
          </Grid>

          {/* Client Selection */}
          <Grid xs={12} sm={6}>
            <TextField
              select
              label="Client"
              name="clientId"
              fullWidth
              required
              value={formData.clientId}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Select Client</em>
              </MenuItem>
              {mockClients.map((client) => (
                <MenuItem key={client.id} value={client.id}>
                  {client.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Service Selection */}
          <Grid xs={12} sm={6}>
            <TextField
              select
              label="Service"
              name="serviceId"
              fullWidth
              required
              value={formData.serviceId}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Select Service</em>
              </MenuItem>
              {mockServices.map((service) => (
                <MenuItem key={service.id} value={service.id}>
                  {service.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Activity Selection */}
          <Grid xs={12} sm={6}>
            <TextField
              select
              label="Activity"
              name="activityId"
              fullWidth
              required
              value={formData.activityId}
              onChange={handleChange}
              disabled={!formData.serviceId}
            >
              <MenuItem value="">
                <em>Select Activity</em>
              </MenuItem>
              {filteredActivities.map((activity) => (
                <MenuItem key={activity.id} value={activity.id}>
                  {activity.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Assigned To */}
          <Grid xs={12} sm={6}>
            <TextField
              select
              label="Assigned To"
              name="assignedTo"
              fullWidth
              required
              value={formData.assignedTo}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Assign Team Member</em>
              </MenuItem>
              {mockTeamMembers.map((member) => (
                <MenuItem key={member} value={member}>
                  {member}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Priority */}
          <Grid xs={12} sm={6}>
            <TextField
              select
              label="Priority"
              name="priority"
              fullWidth
              required
              value={formData.priority}
              onChange={handleChange}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </TextField>
          </Grid>

          {/* Status */}
          <Grid xs={12} sm={6}>
            <TextField
              select
              label="Status"
              name="status"
              fullWidth
              required
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value="open">Open</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="overdue">Overdue</MenuItem>
            </TextField>
          </Grid>

          {/* Deadline */}
          <Grid xs={12}>
            <TextField
              label="Deadline"
              name="deadline"
              type="date"
              fullWidth
              required
              value={formData.deadline}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Action Buttons */}
          <Grid xs={12} display="flex" justifyContent="flex-end" mt={2}>
            <Button type="submit" variant="contained" color="primary">
              {ticket ? 'Update Ticket' : 'Create Ticket'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};