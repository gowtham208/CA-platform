// src/data/mockData.ts
import type { Client } from '../modules/clients/types/Client';
import type { Service } from '../modules/services/types/Service';
import type { Activity } from '../modules/services/types/Activity';
import type { Ticket } from '../modules/tickets/types/Ticket';
import type { Document } from '../modules/documents/types/Document';
import type { User } from '../modules/users/types/user';

// Mock Activities Data
export const mockActivities: Activity[] = [
  // GST Activities
  { 
    id: '1', 
    name: 'GST 3B Filing', 
    serviceId: '1', 
    frequency: 'monthly',
    amount: 1000,
    deadline: new Date('2024-02-20'),
    financialYear: '2024-25'
  },
  { 
    id: '2', 
    name: 'GST 1 Filing', 
    serviceId: '1', 
    frequency: 'monthly',
    amount: 1500,
    deadline: new Date('2024-02-11'),
    financialYear: '2024-25'
  },
  { 
    id: '3', 
    name: 'GST 9/9C Filing', 
    serviceId: '1', 
    frequency: 'yearly',
    amount: 2000,
    deadline: new Date('2024-03-31'),
    financialYear: '2024-25'
  },
  
  // Income Tax Activities
  { 
    id: '4', 
    name: 'ITR Filing - Individual', 
    serviceId: '2', 
    frequency: 'yearly',
    amount: 2000,
    deadline: new Date('2024-07-31'),
    financialYear: '2024-25'
  },
  { 
    id: '5', 
    name: 'ITR Filing - Corporate', 
    serviceId: '2', 
    frequency: 'yearly',
    amount: 5000,
    deadline: new Date('2024-09-30'),
    financialYear: '2024-25'
  },
  { 
    id: '6', 
    name: 'TDS Return Filing', 
    serviceId: '2', 
    frequency: 'quarterly',
    amount: 2500,
    deadline: new Date('2024-01-31'),
    financialYear: '2024-25'
  },
  
  // Audit Activities
  { 
    id: '7', 
    name: 'Statutory Audit', 
    serviceId: '3', 
    frequency: 'yearly',
    amount: 15000,
    deadline: new Date('2024-09-30'),
    financialYear: '2024-25'
  },
  { 
    id: '8', 
    name: 'Tax Audit', 
    serviceId: '3', 
    frequency: 'yearly',
    amount: 10000,
    deadline: new Date('2024-09-30'),
    financialYear: '2024-25'
  },
  
  // ROC Activities
  { 
    id: '9', 
    name: 'Annual Return Filing', 
    serviceId: '4', 
    frequency: 'yearly',
    amount: 8000,
    deadline: new Date('2024-10-28'),
    financialYear: '2024-25'
  },
  { 
    id: '10', 
    name: 'Compliance Report', 
    serviceId: '4', 
    frequency: 'quarterly',
    amount: 5000,
    deadline: new Date('2024-03-30'),
    financialYear: '2024-25'
  },
  
  // Accounting Activities
  { 
    id: '11', 
    name: 'Bookkeeping', 
    serviceId: '5', 
    frequency: 'monthly',
    amount: 5000,
    deadline: new Date('2024-02-07'),
    financialYear: '2024-25'
  },
  { 
    id: '12', 
    name: 'Payroll Processing', 
    serviceId: '5', 
    frequency: 'monthly',
    amount: 4000,
    deadline: new Date('2024-02-07'),
    financialYear: '2024-25'
  },
];

// Mock Services Data
export const mockServices: Service[] = [
  {
    id: '1',
    name: 'GST Services',
    status: 'active',
    activities: mockActivities.filter(a => a.serviceId === '1'),
  },
  {
    id: '2',
    name: 'Income Tax Services',
    status: 'active',
    activities: mockActivities.filter(a => a.serviceId === '2'),
  },
  {
    id: '3',
    name: 'Audit Services',
    status: 'active',
    activities: mockActivities.filter(a => a.serviceId === '3'),
  },
  {
    id: '4',
    name: 'ROC Services',
    status: 'active',
    activities: mockActivities.filter(a => a.serviceId === '4'),
  },
  {
    id: '5',
    name: 'Accounting Services',
    status: 'active',
    activities: mockActivities.filter(a => a.serviceId === '5'),
  },
];

// Mock Clients Data
export const mockClients: Client[] = [
  {
    id: '1',
    name: 'ABC Corporation Pvt Ltd',
    email: 'contact@abccorp.com',
    phone: '+91 9876543210',
    businessType: 'Private Limited',
    gstin: '07AABCU9603R1ZM',
    pan: 'AABCU9603R',
    address: '123 Business Park, Connaught Place, New Delhi, India - 110001',
    services: [mockServices[0], mockServices[1], mockServices[4]], // GST, Income Tax, Accounting
    status: 'active',
    assignedTo: 'John Doe',
    dateAdded: new Date('2023-01-15'),
  },
  {
    id: '2',
    name: 'XYZ Associates LLP',
    email: 'info@xyzassociates.com',
    phone: '+91 9123456789',
    businessType: 'Limited Liability Partnership',
    gstin: '08BXYZA1234M1Z2',
    pan: 'BXYZA1234M',
    address: '456 Trade Center, Bandra Kurla Complex, Mumbai, India - 400051',
    services: [mockServices[0], mockServices[3]], // GST, ROC
    status: 'premium',
    assignedTo: 'Jane Smith',
    dateAdded: new Date('2023-03-20'),
  },
  {
    id: '3',
    name: 'DEF Enterprises',
    email: 'support@defent.com',
    phone: '+91 9988776655',
    businessType: 'Sole Proprietorship',
    gstin: '09CDEFE5678N2Z3',
    pan: 'CDEFE5678N',
    address: '789 Industrial Area, Electronic City, Bangalore, India - 560100',
    services: [mockServices[0], mockServices[1], mockServices[2]], // GST, Income Tax, Audit
    status: 'active',
    assignedTo: 'Mark Lee',
    dateAdded: new Date('2023-02-10'),
  },
  {
    id: '4',
    name: 'PQR Traders & Co.',
    email: 'accounts@pqrtraders.com',
    phone: '+91 8899776655',
    businessType: 'Partnership Firm',
    gstin: '06DPQRT9012O3Z4',
    pan: 'DPQRT9012O',
    address: '321 Market Street, T Nagar, Chennai, India - 600017',
    services: [mockServices[0]], // Only GST
    status: 'pending',
    assignedTo: 'Sarah Wilson',
    dateAdded: new Date('2023-04-05'),
  },
  {
    id: '5',
    name: 'LMN Industries Ltd',
    email: 'finance@lmnindustries.com',
    phone: '+91 7766554433',
    businessType: 'Public Limited',
    gstin: '10ELMNI2345P4Z5',
    pan: 'ELMNI2345P',
    address: '555 Corporate Tower, Salt Lake, Kolkata, India - 700091',
    services: mockServices, // All services
    status: 'premium',
    assignedTo: 'John Doe',
    dateAdded: new Date('2023-05-12'),
  },
];

// Mock Documents Data
export const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'PAN Card - ABC Corporation',
    financialYear: '2024-25',
    clientId: '1',
    uploadedOn: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'GST Registration Certificate',
    financialYear: '2024-25',
    clientId: '1',
    uploadedOn: new Date('2024-01-16'),
  },
  {
    id: '3',
    name: 'Audited Financial Statements FY 2023-24',
    financialYear: '2023-24',
    clientId: '2',
    uploadedOn: new Date('2024-01-10'),
  },
  {
    id: '4',
    name: 'ITR Acknowledgement FY 2023-24',
    financialYear: '2023-24',
    clientId: '3',
    uploadedOn: new Date('2024-01-20'),
  },
  {
    id: '5',
    name: 'Partnership Deed - XYZ Associates',
    financialYear: '2024-25',
    clientId: '2',
    uploadedOn: new Date('2024-01-05'),
  },
  {
    id: '6',
    name: 'Bank Statements - Jan 2024',
    financialYear: '2024-25',
    clientId: '1',
    uploadedOn: new Date('2024-01-25'),
  },
  {
    id: '7',
    name: 'TDS Certificate Q3 FY24',
    financialYear: '2023-24',
    clientId: '4',
    uploadedOn: new Date('2024-01-18'),
  },
  {
    id: '8',
    name: 'ROC Form MGT-7 FY 2022-23',
    financialYear: '2022-23',
    clientId: '5',
    uploadedOn: new Date('2024-01-22'),
  },
];

// Mock Tickets Data
export const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'GST 3B Filing for January 2024',
    clientId: '1',
    serviceId: '1',
    activityId: '1',
    deadline: new Date('2024-02-20'),
    priority: 'high',
    status: 'open',
    assignedTo: 'John Doe',
    createdBy: 'admin',
    createdAt: new Date('2024-01-28'),
  },
  {
    id: '2',
    title: 'Income Tax Return FY 2023-24',
    clientId: '3',
    serviceId: '2',
    activityId: '4',
    deadline: new Date('2024-07-31'),
    priority: 'medium',
    status: 'in-progress',
    assignedTo: 'Jane Smith',
    createdBy: 'admin',
    createdAt: new Date('2024-01-25'),
  },
  {
    id: '3',
    title: 'Statutory Audit FY 2023-24',
    clientId: '2',
    serviceId: '3',
    activityId: '7',
    deadline: new Date('2024-03-15'),
    priority: 'high',
    status: 'open',
    assignedTo: 'Mark Lee',
    createdBy: 'admin',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '4',
    title: 'Annual ROC Filing FY 2023-24',
    clientId: '5',
    serviceId: '4',
    activityId: '9',
    deadline: new Date('2024-04-30'),
    priority: 'medium',
    status: 'completed',
    assignedTo: 'Sarah Wilson',
    createdBy: 'admin',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '5',
    title: 'Monthly Bookkeeping - January 2024',
    clientId: '1',
    serviceId: '5',
    activityId: '11',
    deadline: new Date('2024-02-07'),
    priority: 'low',
    status: 'overdue',
    assignedTo: 'Mike Johnson',
    createdBy: 'admin',
    createdAt: new Date('2024-01-30'),
  },
  {
    id: '6',
    title: 'TDS Return Q3 FY 2023-24',
    clientId: '4',
    serviceId: '2',
    activityId: '6',
    deadline: new Date('2024-01-31'),
    priority: 'high',
    status: 'completed',
    assignedTo: 'Jane Smith',
    createdBy: 'admin',
    createdAt: new Date('2024-01-10'),
  },
  {
    id: '7',
    title: 'GST 1 Filing for January 2024',
    clientId: '2',
    serviceId: '1',
    activityId: '2',
    deadline: new Date('2024-02-11'),
    priority: 'medium',
    status: 'in-progress',
    assignedTo: 'John Doe',
    createdBy: 'admin',
    createdAt: new Date('2024-01-29'),
  },
];

// Mock Users Data
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@cafirm.com',
    name: 'John Doe',
    role: 'admin',
  },
  {
    id: '2',
    email: 'jane.smith@cafirm.com',
    name: 'Jane Smith',
    role: 'staff',
  },
  {
    id: '3',
    email: 'mark.lee@cafirm.com',
    name: 'Mark Lee',
    role: 'staff',
  },
  {
    id: '4',
    email: 'sarah.wilson@cafirm.com',
    name: 'Sarah Wilson',
    role: 'manager'
  },
  {
    id: '5',
    email: 'mike.johnson@cafirm.com',
    name: 'Mike Johnson',
    role: 'staff'
  },
];

// Mock Team Members (for assignment dropdowns)
export const mockTeamMembers = [
  'John Doe',
  'Jane Smith',
  'Mark Lee',
  'Sarah Wilson',
  'Mike Johnson',
];

// Export all mock data
export default {
  mockUsers,
  mockClients,
  mockServices,
  mockActivities,
  mockTickets,
  mockDocuments,
  mockTeamMembers,
};