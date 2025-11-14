// src/components/modules/tickets/types/Ticket.ts
export interface Attachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

export interface Ticket {
  id: string;
  title: string;
  clientId: string;
  serviceId: string;
  activityId: string;
  deadline: Date;
  priority: 'high' | 'medium' | 'low';
  status: 'open' | 'in-progress' | 'completed' | 'overdue';
  assignedTo: string;
  createdBy: string;
  createdAt: Date;
  attachments?: Attachment[]; // Make it optional
}