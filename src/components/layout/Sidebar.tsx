import React from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { sidebarMenu } from '../../constants/SidebarMenu';
import { Link } from 'react-router-dom';


const drawerWidth = 240;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ open, onClose }) => (
  <Drawer
    variant="temporary"
    open={open}
    onClose={onClose}
    sx={{
      '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
    }}
  >
    {/* <Toolbar /> */}
   <List>
       {sidebarMenu.map((item) => (
      <ListItemButton key={item.text}>
       <ListItemButton
         key={item.text}
         component={Link}
         to={item.path}
         onClick={onClose} // optional: close drawer after navigating
       >
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.text} />
     </ListItemButton>
     </ListItemButton>
       ))}
       
     </List>
  </Drawer>
);
