// src/config/sidebarMenu.ts
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import BuildIcon from '@mui/icons-material/Build';
import DescriptionIcon from '@mui/icons-material/Description';
import GroupIcon from '@mui/icons-material/Group';
import type { ElementType, JSX } from 'react';
import { Dashboard } from '../modules/dashboard/Dashboard';
import { ClientList } from '../modules/clients/ClientList';
import { TicketList } from '../modules/tickets/TicketList';
import { ServiceList } from '../modules/services/ServiceList';
import { DocumentList } from '../modules/documents/DocumentList';
import { UserList } from '../modules/users/UserList';

export interface MenuItem {
  text: string;
  icon: JSX.Element;
  path: string;
  component: ElementType;
}

export const sidebarMenu: MenuItem[] = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' ,component:Dashboard} ,
  { text: 'Clients', icon: <PeopleIcon />, path: '/clients',component:ClientList },
  { text: 'Tickets', icon: <ConfirmationNumberIcon />, path: '/tickets',component:TicketList},
  { text: 'Services', icon: <BuildIcon />, path: '/services',component:ServiceList},
  { text: 'Documents', icon: <DescriptionIcon />, path: '/documents',component:DocumentList},
  { text: 'Users', icon: <GroupIcon />, path: '/users',component:UserList},
];




