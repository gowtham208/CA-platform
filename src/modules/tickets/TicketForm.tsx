// src/components/modules/tickets/TicketForm.tsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Paper,
  Grid,
  Chip
} from '@mui/material';
import { Delete, AttachFile } from '@mui/icons-material';
import type { Ticket } from './types/Ticket';

import {mockClients,mockServices,mockActivities,mockTeamMembers} from '../../constants/mockdata';

interface TicketFormProps {
  ticket?: Ticket;
  onSubmit?: (ticket: Omit<Ticket, 'id'>) => void;
}

// // Mock data for dropdowns
// const mockClients = [
//   { id: '1', name: 'ABC Pvt Ltd' },
//   { id: '2', name: 'XYZ Associates' },
//   { id: '3', name: 'DEF Enterprises' },
// ];

// const mockServices = [
//   { id: '1', name: 'GST Filing' },
//   { id: '2', name: 'Income Tax' },
//   { id: '3', name: 'Audit' },
//   { id: '4', name: 'ROC Filing' },
// ];

// const mockActivities = [
//   { id: '1', name: 'GST 3B Filing', serviceId: '1' },
//   { id: '2', name: 'GST 1 Filing', serviceId: '1' },
//   { id: '3', name: 'ITR Filing - Individual', serviceId: '2' },
//   { id: '4', name: 'ITR Filing - Corporate', serviceId: '2' },
//   { id: '5', name: 'Statutory Audit', serviceId: '3' },
//   { id: '6', name: 'Tax Audit', serviceId: '3' },
// ];

// const mockTeamMembers = [
//   'John Doe',
//   'Jane Smith',
//   'Mark Lee',
//   'Sarah Wilson',
// ];

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

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

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles: UploadedFile[] = [];
    
    Array.from(files).forEach((file) => {
      const fileId = Math.random().toString(36).substring(2, 9);
      newFiles.push({
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        file: file
      });
    });

    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Clear the input value to allow uploading the same file again
    e.target.value = '';
  };

  const handleRemoveFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const ticketData: Omit<Ticket, 'id'> = {
      ...formData,
      deadline: new Date(formData.deadline),
      createdBy: ticket?.createdBy || 'current-user',
      createdAt: ticket?.createdAt || new Date(),
      attachments: uploadedFiles.map(file => ({
        id: file.id,
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file.file) // In real app, this would be the uploaded file URL
      }))
    };
    
    if (onSubmit) {
      onSubmit(ticketData);
    }
    
    console.log('Submitted Ticket:', ticketData);
    console.log('Uploaded Files:', uploadedFiles);
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

          {/* Document Upload */}
          <Grid xs={12}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                Attach Documents
              </Typography>
              <Button
                variant="outlined"
                component="label"
                startIcon={<AttachFile />}
                sx={{ mb: 2 }}
              >
                Upload Files
                <input
                  type="file"
                  hidden
                  multiple
                  onChange={handleFileUpload}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                />
              </Button>
              
              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Uploaded files ({uploadedFiles.length}):
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {uploadedFiles.map((file) => (
                      <Chip
                        key={file.id}
                        label={`${file.name} (${formatFileSize(file.size)})`}
                        onDelete={() => handleRemoveFile(file.id)}
                        deleteIcon={<Delete />}
                        variant="outlined"
                        size="small"
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
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