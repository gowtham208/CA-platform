// src/components/modules/services/ServiceForm.tsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  Paper,
  Grid,
  IconButton,
  Card,
  CardContent
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import type { Service } from './types/Service';
import type { Activity } from './types/Activity';

interface ServiceFormProps {
  service?: Service;
  onSubmit?: (service: Omit<Service, 'id'>) => void;
}

export const ServiceForm: React.FC<ServiceFormProps> = ({
  service,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    name: service?.name || '',
    status: service?.status || 'active',
  });

  const [activities, setActivities] = useState<Activity[]>(
    service?.activities || []
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleActivityChange = (index: number, field: keyof Activity, value: string | number | Date) => {
    const updatedActivities = [...activities];
    updatedActivities[index] = {
      ...updatedActivities[index],
      [field]: field === 'amount' ? Number(value) : value
    };
    setActivities(updatedActivities);
  };

  const addActivity = () => {
    const newActivity: Activity = {
      id: `temp-${Date.now()}`,
      name: '',
      serviceId: service?.id || '',
      amount: 0,
      frequency: 'monthly',
      deadline: undefined,
      financialYear: new Date().getFullYear().toString() + '-' + (new Date().getFullYear() + 1).toString().slice(-2)
    };
    setActivities([...activities, newActivity]);
  };

  const removeActivity = (index: number) => {
    const updatedActivities = activities.filter((_, i) => i !== index);
    setActivities(updatedActivities);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const serviceData: Omit<Service, 'id'> = {
      ...formData,
      activities: activities.map(activity => ({
        ...activity,
        serviceId: service?.id || '' // This will be set when service is created
      }))
    };
    
    if (onSubmit) {
      onSubmit(serviceData);
    }
    
    console.log('Submitted Service:', serviceData);
  };

  // Get current financial year (e.g., 2024-25)
  const getCurrentFinancialYear = () => {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    return `${currentYear}-${nextYear.toString().slice(-2)}`;
  };

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
          {service ? 'Edit Service' : 'Create New Service'}
        </Typography>

        <Grid container spacing={2}>
          {/* Service Name */}
          <Grid xs={12}>
            <TextField
              label="Service Name"
              name="name"
              fullWidth
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., GST Filing, Income Tax Return"
            />
          </Grid>

          {/* Status */}
          <Grid xs={12}>
            <TextField
              select
              label="Status"
              name="status"
              fullWidth
              required
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="discontinued">Discontinued</MenuItem>
            </TextField>
          </Grid>

          {/* Activities Section */}
          <Grid xs={12}>
            <Box sx={{ mt: 3, mb: 2 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight="bold">
                  Activities
                </Typography>
                <Button
                  startIcon={<Add />}
                  onClick={addActivity}
                  variant="outlined"
                  size="small"
                >
                  Add Activity
                </Button>
              </Box>

              {activities.map((activity, index) => (
                <Card key={activity.id} sx={{ mb: 2, p: 2 }} variant="outlined">
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      {/* Activity Name */}
                      <Grid xs={12} sm={4}>
                        <TextField
                          label="Activity Name"
                          fullWidth
                          size="small"
                          value={activity.name}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            handleActivityChange(index, 'name', e.target.value)
                          }
                          placeholder="e.g., GST 3B Filing, ITR Filing"
                          required
                        />
                      </Grid>

                      {/* Frequency */}
                      <Grid xs={12} sm={2}>
                        <TextField
                          select
                          label="Frequency"
                          fullWidth
                          size="small"
                          value={activity.frequency || 'monthly'}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            handleActivityChange(index, 'frequency', e.target.value)
                          }
                        >
                          <MenuItem value="monthly">Monthly</MenuItem>
                          <MenuItem value="quarterly">Quarterly</MenuItem>
                          <MenuItem value="yearly">Yearly</MenuItem>
                        </TextField>
                      </Grid>

                      {/* Amount */}
                      <Grid xs={12} sm={2}>
                        <TextField
                          label="Amount (₹)"
                          type="number"
                          fullWidth
                          size="small"
                          value={activity.amount}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            handleActivityChange(index, 'amount', Number(e.target.value))
                          }
                          InputProps={{
                            startAdornment: <Box sx={{ mr: 1, fontSize: '0.8rem' }}>₹</Box>,
                          }}
                          required
                        />
                      </Grid>

                      {/* Financial Year */}
                      <Grid xs={12} sm={2}>
                        <TextField
                          label="Financial Year"
                          fullWidth
                          size="small"
                          value={activity.financialYear || getCurrentFinancialYear()}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            handleActivityChange(index, 'financialYear', e.target.value)
                          }
                          placeholder="e.g., 2024-25"
                        />
                      </Grid>

                      {/* Deadline */}
                      <Grid xs={12} sm={1}>
                        <TextField
                          label="Deadline"
                          type="date"
                          fullWidth
                          size="small"
                          value={activity.deadline ? new Date(activity.deadline).toISOString().split('T')[0] : ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                            handleActivityChange(index, 'deadline', new Date(e.target.value))
                          }
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Grid>

                      {/* Remove Button */}
                      <Grid xs={12} sm={1}>
                        <IconButton
                          size="small"
                          onClick={() => removeActivity(index)}
                          color="error"
                        >
                          <Delete />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}

              {activities.length === 0 && (
                <Typography color="textSecondary" textAlign="center" py={3}>
                  No activities added. Click "Add Activity" to get started.
                </Typography>
              )}
            </Box>
          </Grid>

          {/* Action Buttons */}
          <Grid xs={12} display="flex" justifyContent="flex-end" mt={2}>
            <Button type="submit" variant="contained" color="primary">
              {service ? 'Update Service' : 'Create Service'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};