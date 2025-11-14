// src/components/modules/services/ActivityForm.tsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import type { Activity } from './types/Activity';

interface ActivityFormProps {
  activity: Activity;
  serviceName: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (activity: Activity) => void;
}

export const ActivityForm: React.FC<ActivityFormProps> = ({
  activity,
  serviceName,
  open,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState<Activity>({
    ...activity
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: name === 'amount' ? Number(value) : value 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  // Get current financial year (e.g., 2024-25)
  const getCurrentFinancialYear = () => {
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    return `${currentYear}-${nextYear.toString().slice(-2)}`;
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{ sx: { borderRadius: 2 } }}
    >
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold" color="primary">
          Edit Activity
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {serviceName}
        </Typography>
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            {/* Activity Name */}
            <Grid xs={12}>
              <TextField
                label="Activity Name"
                name="name"
                fullWidth
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., GST 3B Filing, ITR Filing"
              />
            </Grid>

            {/* Frequency */}
            <Grid xs={12} sm={6}>
              <TextField
                select
                label="Frequency"
                name="frequency"
                fullWidth
                required
                value={formData.frequency || 'monthly'}
                onChange={handleChange}
              >
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="quarterly">Quarterly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
              </TextField>
            </Grid>

            {/* Amount */}
            <Grid xs={12} sm={6}>
              <TextField
                label="Amount (₹)"
                name="amount"
                type="number"
                fullWidth
                required
                value={formData.amount}
                onChange={handleChange}
                InputProps={{
                  startAdornment: <Box sx={{ mr: 1 }}>₹</Box>,
                }}
              />
            </Grid>

            {/* Financial Year */}
            <Grid xs={12} sm={6}>
              <TextField
                label="Financial Year"
                name="financialYear"
                fullWidth
                value={formData.financialYear || getCurrentFinancialYear()}
                onChange={handleChange}
                placeholder="e.g., 2024-25"
              />
            </Grid>

            {/* Deadline */}
            <Grid xs={12} sm={6}>
              <TextField
                label="Deadline"
                name="deadline"
                type="date"
                fullWidth
                value={formData.deadline ? new Date(formData.deadline).toISOString().split('T')[0] : ''}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button 
            onClick={onClose}
            variant="outlined"
            size="large"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            size="large"
          >
            Update Activity
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};