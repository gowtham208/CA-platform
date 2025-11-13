// src/components/modules/clients/ClientForm.tsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Paper,
  Grid,
  Chip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  ListItemText,
  FormGroup,
  FormControlLabel
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';
import { Close } from '@mui/icons-material';
import type { Service } from '../services/types/Service';
import type { Activity } from '../services/types/Activity';
import type { Client } from './types/Client';
import { mockServices, mockTeamMembers } from '../../constants/mockdata';

interface ClientFormProps {
  client?: Client;
  onSubmit?: (client: Omit<Client, 'id'>) => void;
  onCancel?: () => void; // Add this line
}

interface SelectedService {
  service: Service;
  selectedActivities: Activity[];
}

export const ClientForm: React.FC<ClientFormProps> = ({
  client,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    name: client?.name || '',
    email: client?.email || '',
    phone: client?.phone || '',
    businessType: client?.businessType || '',
    gstin: client?.gstin || '',
    pan: client?.pan || '',
    address: client?.address || '',
    status: client?.status || 'active',
    assignedTo: client?.assignedTo || '',
  });

  const [selectedServices, setSelectedServices] = useState<SelectedService[]>(
    client?.services ? client.services.map(service => ({
      service,
      selectedActivities: service.activities
    })) : []
  );

  const [serviceSelection, setServiceSelection] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceSelectionChange = (e: SelectChangeEvent<string[]>) => {
    const selectedServiceIds = e.target.value as string[];
    setServiceSelection(selectedServiceIds);

    // Add new services to selectedServices
    const newServices = selectedServiceIds
      .filter(serviceId => !selectedServices.some(s => s.service.id === serviceId))
      .map(serviceId => {
        const service = mockServices.find((s:any) => s.id === serviceId);
        return service ? { service, selectedActivities: [] } : null;
      })
      .filter(Boolean) as SelectedService[];

    // Remove services that are no longer selected
    const updatedServices = selectedServices
      .filter(selectedService => selectedServiceIds.includes(selectedService.service.id))
      .concat(newServices);

    setSelectedServices(updatedServices);
  };

  const handleActivitySelection = (serviceId: string, activityId: string, checked: boolean) => {
    setSelectedServices(prev => 
      prev.map(selectedService => {
        if (selectedService.service.id === serviceId) {
          if (checked) {
            // Add activity if not already present
            const activity = selectedService.service.activities.find(a => a.id === activityId);
            if (activity && !selectedService.selectedActivities.some(a => a.id === activityId)) {
              return {
                ...selectedService,
                selectedActivities: [...selectedService.selectedActivities, activity]
              };
            }
          } else {
            // Remove activity
            return {
              ...selectedService,
              selectedActivities: selectedService.selectedActivities.filter(a => a.id !== activityId)
            };
          }
        }
        return selectedService;
      })
    );
  };

  const selectAllActivities = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.map(selectedService => {
        if (selectedService.service.id === serviceId) {
          return {
            ...selectedService,
            selectedActivities: [...selectedService.service.activities]
          };
        }
        return selectedService;
      })
    );
  };

  const deselectAllActivities = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.map(selectedService => {
        if (selectedService.service.id === serviceId) {
          return {
            ...selectedService,
            selectedActivities: []
          };
        }
        return selectedService;
      })
    );
  };

  const removeService = (serviceId: string) => {
    setSelectedServices(prev => prev.filter(selectedService => selectedService.service.id !== serviceId));
    setServiceSelection(prev => prev.filter(id => id !== serviceId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create services with only selected activities
    const servicesWithSelectedActivities: Service[] = selectedServices.map(selectedService => ({
      ...selectedService.service,
      activities: selectedService.selectedActivities
    }));

    const clientData: Omit<Client, 'id'> = {
      ...formData,
      services: servicesWithSelectedActivities,
      dateAdded: client?.dateAdded || new Date(),
    };
    
    if (onSubmit) {
      onSubmit(clientData);
    }
    
    console.log('Submitted Client:', clientData);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 3,
        backgroundColor: '#fff',
        maxWidth: 1000, // Increased width
        mx: 'auto',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h5" mb={3} fontWeight="bold" color="primary">
          {client ? 'Edit Client' : 'Add New Client'}
        </Typography>

        <Grid container spacing={3}> {/* Increased spacing */}
          {/* Basic Client Information */}
          <Grid xs={12} sm={6}>
            <TextField
              label="Client Name *"
              name="name"
              fullWidth
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter client name"
              size="medium"
            />
          </Grid>

          <Grid xs={12} sm={6}>
            <TextField
              label="Email *"
              name="email"
              type="email"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="client@company.com"
              size="medium"
            />
          </Grid>

          <Grid xs={12} sm={6}>
            <TextField
              label="Phone"
              name="phone"
              fullWidth
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 9876543210"
              size="medium"
            />
          </Grid>

          <Grid xs={12} sm={6}>
            <TextField
              select
              label="Business Type"
              name="businessType"
              fullWidth
              value={formData.businessType}
              onChange={handleChange}
              size="medium"
            >
              <MenuItem value="">Select Business Type</MenuItem>
              <MenuItem value="Sole Proprietorship">Sole Proprietorship</MenuItem>
              <MenuItem value="Partnership Firm">Partnership Firm</MenuItem>
              <MenuItem value="Limited Liability Partnership">Limited Liability Partnership</MenuItem>
              <MenuItem value="Private Limited">Private Limited</MenuItem>
              <MenuItem value="Public Limited">Public Limited</MenuItem>
              <MenuItem value="One Person Company">One Person Company</MenuItem>
            </TextField>
          </Grid>

          <Grid xs={12} sm={6}>
            <TextField
              label="GSTIN"
              name="gstin"
              fullWidth
              value={formData.gstin}
              onChange={handleChange}
              placeholder="07AABCU9603R1ZM"
              size="medium"
            />
          </Grid>

          <Grid xs={12} sm={6}>
            <TextField
              label="PAN"
              name="pan"
              fullWidth
              value={formData.pan}
              onChange={handleChange}
              placeholder="AABCU9603R"
              size="medium"
            />
          </Grid>

          <Grid xs={12}>
            <TextField
              label="Address"
              name="address"
              fullWidth
              multiline
              rows={3}
              value={formData.address}
              onChange={handleChange}
              placeholder="Full business address"
              size="medium"
            />
          </Grid>

          {/* Services Selection */}
          <Grid xs={12}>
            <FormControl fullWidth size="medium">
              <InputLabel sx={{ fontSize: '1rem' }}>Select Services</InputLabel>
              <Select
                multiple
                value={serviceSelection}
                onChange={handleServiceSelectionChange}
                label="Select Services"
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, py: 0.5 }}>
                    {selected.map((serviceId) => {
                      const service = mockServices.find((s:any) => s.id === serviceId);
                      return service ? (
                        <Chip 
                          key={service.id} 
                          label={service.name} 
                          size="medium"
                          sx={{ fontSize: '0.875rem' }}
                        />
                      ) : null;
                    })}
                  </Box>
                )}
                MenuProps={ { PaperProps: {
                    sx: {
                      maxHeight: 300,
                      '& .MuiMenuItem-root': {
                        padding: '12px 16px',
                        fontSize: '0.95rem'
                      }
                    }
                  } } as any }
              >
                {mockServices.map((service) => (
                  <MenuItem key={service.id} value={service.id}>
                    <Checkbox checked={serviceSelection.includes(service.id)} />
                    <ListItemText 
                      primary={
                        <Box>
                          <Typography variant="body1" fontWeight="medium">
                            {service.name}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            {service.activities.length} activities available
                          </Typography>
                        </Box>
                      }
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Selected Services with Activity Selection */}
            {selectedServices.length > 0 && (
              <Box mt={3}>
                <Typography variant="h6" fontWeight="bold" mb={2} color="primary">
                  Select Activities for Each Service:
                </Typography>
                <Box display="flex" flexDirection="column" gap={2}>
                  {selectedServices.map((selectedService) => (
                    <Paper 
                      key={selectedService.service.id}
                      elevation={1}
                      sx={{ 
                        p: 3, 
                        border: '2px solid', 
                        borderColor: 'primary.light', 
                        borderRadius: 2,
                        backgroundColor: 'background.default'
                      }}
                    >
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                        <Box>
                          <Typography variant="h6" fontWeight="bold" color="primary">
                            {selectedService.service.name}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            Select specific activities the client will avail
                          </Typography>
                        </Box>
                        <Box display="flex" gap={1}>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => selectAllActivities(selectedService.service.id)}
                          >
                            Select All
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => deselectAllActivities(selectedService.service.id)}
                          >
                            Deselect All
                          </Button>
                          <IconButton
                            size="small"
                            onClick={() => removeService(selectedService.service.id)}
                            color="error"
                            sx={{ ml: 1 }}
                          >
                            <Close />
                          </IconButton>
                        </Box>
                      </Box>

                      <FormGroup>
                        <Grid container spacing={1}>
                          {selectedService.service.activities.map((activity) => (
                            <Grid xs={12} sm={6} key={activity.id}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={selectedService.selectedActivities.some(a => a.id === activity.id)}
                                    onChange={(e) => handleActivitySelection(
                                      selectedService.service.id, 
                                      activity.id, 
                                      e.target.checked
                                    )}
                                    size="medium"
                                  />
                                }
                                label={
                                  <Box>
                                    <Typography variant="body1" fontWeight="medium">
                                      {activity.name}
                                    </Typography>
                                    <Typography variant="caption" color="textSecondary">
                                      {activity.frequency} • ₹{activity.amount}
                                      {activity.deadline && ` • Due by ${activity.deadline}`}
                                    </Typography>
                                  </Box>
                                }
                                sx={{ 
                                  width: '100%',
                                  m: 0,
                                  p: 1,
                                  borderRadius: 1,
                                  backgroundColor: selectedService.selectedActivities.some(a => a.id === activity.id) 
                                    ? 'primary.light' 
                                    : 'transparent',
                                  '&:hover': {
                                    backgroundColor: 'action.hover'
                                  }
                                }}
                              />
                            </Grid>
                          ))}
                        </Grid>
                      </FormGroup>

                      {/* Selected Activities Summary */}
                      {selectedService.selectedActivities.length > 0 && (
                        <Box mt={2} pt={2} borderTop="1px solid" borderColor="divider">
                          <Typography variant="subtitle2" fontWeight="bold" mb={1}>
                            Selected Activities ({selectedService.selectedActivities.length}):
                          </Typography>
                          <Box display="flex" flexWrap="wrap" gap={1}>
                            {selectedService.selectedActivities.map((activity) => (
                              <Chip
                                key={activity.id}
                                label={`${activity.name} (₹${activity.amount})`}
                                size="small"
                                color="primary"
                                variant="filled"
                                onDelete={() => handleActivitySelection(
                                  selectedService.service.id, 
                                  activity.id, 
                                  false
                                )}
                              />
                            ))}
                          </Box>
                        </Box>
                      )}
                    </Paper>
                  ))}
                </Box>
              </Box>
            )}
          </Grid>

          {/* Status and Assignment */}
          <Grid xs={12} sm={6}>
            <TextField
              select
              label="Status *"
              name="status"
              fullWidth
              required
              value={formData.status}
              onChange={handleChange}
              size="medium"
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="premium">Premium</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </TextField>
          </Grid>

          <Grid xs={12} sm={6}>
            <TextField
              select
              label="Assigned To *"
              name="assignedTo"
              fullWidth
              required
              value={formData.assignedTo}
              onChange={handleChange}
              size="medium"
            >
              <MenuItem value="">Select Team Member</MenuItem>
              {mockTeamMembers.map((member) => (
                <MenuItem key={member} value={member}>
                  {member}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Action Buttons */}
          <Grid xs={12} display="flex" justifyContent="flex-end" gap={2} mt={3}>
            <Button type="submit" variant="contained" color="primary" size="large">
              {client ? 'Update Client' : 'Save Client'}
            </Button>
          </Grid>
              // Add cancel button in the form actions section
{/* Action Buttons */}
<Grid xs={12} display="flex" justifyContent="flex-end" gap={2} mt={2}>
  <Button 
    onClick={oncancel}
    variant="outlined"
    size="large"
  >
    Cancel
  </Button>
  <Button type="submit" variant="contained" color="primary" size="large">
    {client ? 'Update Client' : 'Save Client'}
  </Button>
</Grid>
        </Grid>
      </Box>
    </Paper>
  );
};