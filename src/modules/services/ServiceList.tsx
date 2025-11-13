// src/components/modules/services/ServiceList.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Snackbar,
  CircularProgress,
  Paper,
  Chip
} from '@mui/material';
import { Add } from '@mui/icons-material';
import { GenericGrid } from '../../components/common/GenericGrid';
import { ServiceForm } from './ServiceForm';
import { serviceService } from '../../constants/MockServices';
import type { Service } from '../../modules/services/types/Service';

interface ServiceActivityRow {
  id: string;
  serviceId: string;
  serviceName: string;
  activityId: string;
  activityName: string;
  frequency: string;
  amount: number;
  deadline?: Date;
  financialYear?: string;
  status: string;
}

export const ServiceList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  // Load services on component mount
  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const data = await serviceService.getAll();
      setServices(data);
    } catch (error) {
      showSnackbar('Failed to load services', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAddService = () => {
    setEditingService(null);
    setOpen(true);
  };

  const handleEdit = (row: ServiceActivityRow) => {
    // Find the service to edit
    const serviceToEdit = services.find(service => service.id === row.serviceId);
    if (serviceToEdit) {
      setEditingService(serviceToEdit);
      setOpen(true);
    }
  };

  const handleDelete = async (row: ServiceActivityRow) => {
    if (window.confirm(`Are you sure you want to delete activity "${row.activityName}" from service "${row.serviceName}"?`)) {
      try {
        // Find the service and remove the specific activity
        const serviceToUpdate = services.find(service => service.id === row.serviceId);
        if (serviceToUpdate) {
          const updatedActivities = serviceToUpdate.activities.filter(activity => activity.id !== row.activityId);
          await serviceService.update(row.serviceId, {
            ...serviceToUpdate,
            activities: updatedActivities
          });
          showSnackbar(`Activity "${row.activityName}" deleted successfully`, 'success');
          loadServices(); // Refresh the list
        }
      } catch (error) {
        showSnackbar('Failed to delete activity', 'error');
      }
    }
  };

  const handleSubmit = async (serviceData: Omit<Service, 'id'>) => {
    try {
      if (editingService) {
        // Update existing service
        await serviceService.update(editingService.id, serviceData);
        showSnackbar(`Service ${serviceData.name} updated successfully`, 'success');
      } else {
        // Create new service
        await serviceService.create(serviceData);
        showSnackbar(`Service ${serviceData.name} created successfully`, 'success');
      }
      
      handleClose();
      loadServices(); // Refresh the list
    } catch (error) {
      showSnackbar('Failed to save service', 'error');
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditingService(null);
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  // Transform data for display - one row per service-activity combination
  const rows: ServiceActivityRow[] = services.flatMap(service =>
    service.activities.map(activity => ({
      id: `${service.id}-${activity.id}`, // Unique ID for each row
      serviceId: service.id,
      serviceName: service.name,
      activityId: activity.id,
      activityName: activity.name,
      frequency: activity.frequency || 'N/A',
      amount: activity.amount,
      deadline: activity.deadline,
      financialYear: activity.financialYear,
      status: service.status
    }))
  );

  const columns = [
    { 
      field: 'serviceName', 
      headerName: 'Service Name', 
      flex: 1,
      renderCell: (params: any) => (
        <Box>
          <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
            {params.value}
          </div>
          <Chip 
            label={params.row.status} 
            size="small"
            color={params.row.status === 'active' ? 'success' : 'default'}
            variant="outlined"
          />
        </Box>
      )
    },
    { 
      field: 'activityName', 
      headerName: 'Activity Name', 
      flex: 1,
      renderCell: (params: any) => (
        <Box>
          <div style={{ fontWeight: 'medium' }}>
            {params.value}
          </div>
        </Box>
      )
    },
    { 
      field: 'frequency', 
      headerName: 'Frequency', 
      width: 100,
      renderCell: (params: any) => (
        <Chip 
          label={params.value} 
          size="small"
          color={
            params.value === 'monthly' ? 'primary' :
            params.value === 'quarterly' ? 'secondary' :
            params.value === 'yearly' ? 'warning' : 'default'
          }
          variant="outlined"
        />
      )
    },
    { 
      field: 'amount', 
      headerName: 'Amount', 
      width: 100,
      renderCell: (params: any) => `₹${params.value}`
    },
    { 
      field: 'financialYear', 
      headerName: 'Financial Year', 
      width: 120,
      renderCell: (params: any) => params.value || 'N/A'
    },
    { 
      field: 'deadline', 
      headerName: 'Deadline', 
      width: 120,
      renderCell: (params: any) => 
        params.value ? new Date(params.value).toLocaleDateString() : 'N/A'
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
          <h2>Manage Services & Activities</h2>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>
            Showing {rows.length} service-activity mappings
          </div>
        </Box>
        
        <Box display="flex" gap={1} flexDirection={{ xs: 'column', sm: 'row' }} width={{ xs: '100%', sm: 'auto' }}>
          {/* Action Buttons */}
          <Box display="flex" gap={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddService}
              startIcon={<Add />}
              sx={{ whiteSpace: 'nowrap' }}
            >
              Add Service
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

      {/* Add/Edit Service Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="lg"
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <DialogTitle>
          {editingService ? `Edit Service - ${editingService.name}` : 'Add New Service'}
        </DialogTitle>
        <DialogContent>
          <ServiceForm 
            service={editingService || undefined}
            onSubmit={handleSubmit}
          />
        </DialogContent>
      </Dialog>

      {/* Snackbar for notifications */}
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