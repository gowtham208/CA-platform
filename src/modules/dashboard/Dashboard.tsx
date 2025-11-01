// src/components/modules/dashboard/Dashboard.tsx
import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

export const Dashboard: React.FC = () => {
  const metrics = [
    { title: 'Total Clients', value: 42 },
    { title: 'Open Tickets', value: 8 },
    { title: 'Active Services', value: 12 },
    { title: 'Pending Documents', value: 5 },
  ];

  return (
    <Box>
      <Typography variant="h5" mb={3}>
        Dashboard Overview
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)'
          },
          gap: 3,
        }}
      >
        {metrics.map((m) => (
          <Paper
            key={m.title}
            elevation={3}
            sx={{
              p: 3,
              textAlign: 'center',
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <Typography variant="h6">{m.title}</Typography>
            <Typography variant="h4" color="primary" fontWeight="bold">
              {m.value}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};