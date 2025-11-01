// src/components/modules/tickets/TicketList.tsx
import React from 'react';
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from '@mui/material';

export const TicketList: React.FC = () => {
  const tickets = [
    { id: 1, title: 'Login issue', status: 'Open', assignedTo: 'John Doe' },
    { id: 2, title: 'Billing query', status: 'Closed', assignedTo: 'Jane Smith' },
    { id: 3, title: 'Service not working', status: 'In Progress', assignedTo: 'Mark Lee' },
  ];

  return (
    <Box>
      <Typography variant="h5" mb={2}>Tickets</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Assigned To</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tickets.map((t) => (
              <TableRow key={t.id}>
                <TableCell>{t.id}</TableCell>
                <TableCell>{t.title}</TableCell>
                <TableCell>{t.status}</TableCell>
                <TableCell>{t.assignedTo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};
