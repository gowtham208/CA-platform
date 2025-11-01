// src/components/modules/services/ServiceList.tsx
import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

export const ServiceList: React.FC = () => {
  const services = [
    { name: 'Tax Filing', description: 'Income and GST filing services' },
    { name: 'Auditing', description: 'Statutory and internal audits' },
    { name: 'Consulting', description: 'Business and financial consulting' },
  ];

  return (
    <Box>
      <Typography variant="h5" mb={2}>Services</Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
          gap: 3,
        }}
      >
        {services.map((s) => (
          <Paper 
            key={s.name} 
            elevation={3} 
            sx={{ 
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              minHeight: 120,
            }}
          >
            <Typography variant="h6" gutterBottom>
              {s.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
              {s.description}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};