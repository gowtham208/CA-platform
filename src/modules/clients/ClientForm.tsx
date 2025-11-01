// src/components/modules/clients/ClientForm.tsx
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
// import Grid from '@mui/material/Unstable_Grid2'; // ✅ Modern Grid2 system

export const ClientForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    gstin: '',
    pan: '',
    address: '',
    status: 'active',
    assignedTo: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Client:', formData);
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
          Add / Edit Client
        </Typography>

        {/* ✅ Responsive layout with Grid2 */}
        <Grid container spacing={2}>
          <Grid xs={12} sm={6}>
            <TextField
              label="Client Name"
              name="name"
              fullWidth
              required
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>

          <Grid xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid xs={12} sm={6}>
            <TextField
              label="Phone"
              name="phone"
              fullWidth
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>

          <Grid xs={12} sm={6}>
            <TextField
              label="Business Type"
              name="businessType"
              fullWidth
              value={formData.businessType}
              onChange={handleChange}
            />
          </Grid>

          <Grid xs={12} sm={6}>
            <TextField
              label="GSTIN"
              name="gstin"
              fullWidth
              value={formData.gstin}
              onChange={handleChange}
            />
          </Grid>

          <Grid xs={12} sm={6}>
            <TextField
              label="PAN"
              name="pan"
              fullWidth
              value={formData.pan}
              onChange={handleChange}
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
            />
          </Grid>

          <Grid xs={12} sm={6}>
            <TextField
              select
              label="Status"
              name="status"
              fullWidth
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="premium">Premium</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
            </TextField>
          </Grid>

          <Grid xs={12} sm={6}>
            <TextField
              label="Assigned To"
              name="assignedTo"
              fullWidth
              value={formData.assignedTo}
              onChange={handleChange}
            />
          </Grid>

          {/* ✅ Aligned button area */}
          <Grid xs={12} display="flex" justifyContent="flex-end" mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Save Client
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
