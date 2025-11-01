import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface HeaderProps {
  onMenuToggle: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => (
  <AppBar position="fixed" color="inherit" elevation={1} sx={{ zIndex: 1201 }}>
    <Toolbar>
      <IconButton edge="start" color="primary" onClick={onMenuToggle} sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        CA Management platform
      </Typography>
      <Avatar alt="User" src="/avatar.png" />
    </Toolbar>
  </AppBar>
);
