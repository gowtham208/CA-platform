// src/components/modules/documents/DocumentList.tsx
import React from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableHead, TableRow, Box } from '@mui/material';

export const DocumentList: React.FC = () => {
  const documents = [
    { id: 1, name: 'GST_Report_2025.pdf', type: 'PDF', uploadedOn: '2025-10-20' },
    { id: 2, name: 'Client_List.xlsx', type: 'Excel', uploadedOn: '2025-10-22' },
    { id: 3, name: 'Service_Agreement.docx', type: 'Word', uploadedOn: '2025-10-25' },
  ];

  return (
    <Box>
      <Typography variant="h5" mb={2}>Documents</Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Document Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Uploaded On</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {documents.map((d) => (
              <TableRow key={d.id}>
                <TableCell>{d.name}</TableCell>
                <TableCell>{d.type}</TableCell>
                <TableCell>{d.uploadedOn}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
};
