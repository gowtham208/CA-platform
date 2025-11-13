// src/data/mockData.ts
import type { Client } from '../modules/clients/types/Client';
import type { Service } from '../modules/services/types/Service';
import type { Activity } from '../modules/services/types/Activity';
import type { Ticket } from '../modules/tickets/types/Ticket';
import type { Document } from '../modules/documents/types/Document';
import { mockActivities, mockClients, mockDocuments, mockServices, mockTeamMembers, mockTickets, mockUsers } from './mockdata';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Service CRUD Operations
export const serviceService = {
  // GET all services
  getAll: async (): Promise<Service[]> => {
    await delay(500);
    return [...mockServices];
  },

  // GET service by ID
  getById: async (id: string): Promise<Service | null> => {
    await delay(300);
    const service = mockServices.find(service => service.id === id);
    return service || null;
  },

  // CREATE new service
  create: async (serviceData: Omit<Service, 'id'>): Promise<Service> => {
    await delay(500);
    const newService: Service = {
      ...serviceData,
      id: Date.now().toString(),
    };
    
    console.log('Creating service:', newService);
    return newService;
  },

  // UPDATE service
  update: async (id: string, serviceData: Partial<Service>): Promise<Service> => {
    await delay(500);
    const existingService = mockServices.find(service => service.id === id);
    
    if (!existingService) {
      throw new Error(`Service with id ${id} not found`);
    }

    const updatedService: Service = {
      ...existingService,
      ...serviceData,
      id,
    };

    console.log('Updating service:', updatedService);
    return updatedService;
  },

  // DELETE service
  delete: async (id: string): Promise<void> => {
    await delay(300);
    const service = mockServices.find(service => service.id === id);
    
    if (!service) {
      throw new Error(`Service with id ${id} not found`);
    }

    console.log('Deleting service:', service.name);
  },

  // SEARCH services
  search: async (query: string): Promise<Service[]> => {
    await delay(400);
    const lowerQuery = query.toLowerCase();
    
    return mockServices.filter(service =>
      service.name.toLowerCase().includes(lowerQuery) ||
      service.activities.some(activity => 
        activity.name.toLowerCase().includes(lowerQuery)
      )
    );
  },
};

// Client CRUD Operations
export const clientService = {
  // GET all clients
  getAll: async (): Promise<Client[]> => {
    await delay(500);
    return [...mockClients];
  },

  // GET client by ID
  getById: async (id: string): Promise<Client | null> => {
    await delay(300);
    const client = mockClients.find(client => client.id === id);
    return client || null;
  },

  // CREATE new client
  create: async (clientData: Omit<Client, 'id'>): Promise<Client> => {
    await delay(500);
    const newClient: Client = {
      ...clientData,
      id: Date.now().toString(),
    };
    
    console.log('Creating client:', newClient);
    return newClient;
  },

  // UPDATE client
  update: async (id: string, clientData: Partial<Client>): Promise<Client> => {
    await delay(500);
    const existingClient = mockClients.find(client => client.id === id);
    
    if (!existingClient) {
      throw new Error(`Client with id ${id} not found`);
    }

    const updatedClient: Client = {
      ...existingClient,
      ...clientData,
      id,
    };

    console.log('Updating client:', updatedClient);
    return updatedClient;
  },

  // DELETE client
  delete: async (id: string): Promise<void> => {
    await delay(300);
    const client = mockClients.find(client => client.id === id);
    
    if (!client) {
      throw new Error(`Client with id ${id} not found`);
    }

    console.log('Deleting client:', client.name);
  },

  // SEARCH clients
  search: async (query: string): Promise<Client[]> => {
    await delay(400);
    const lowerQuery = query.toLowerCase();
    
    return mockClients.filter(client =>
      client.name.toLowerCase().includes(lowerQuery) ||
      client.email.toLowerCase().includes(lowerQuery) ||
      client.businessType.toLowerCase().includes(lowerQuery)
    );
  },
};

// Ticket CRUD Operations
export const ticketService = {
  getAll: async (): Promise<Ticket[]> => {
    await delay(500);
    return [...mockTickets];
  },

  getById: async (id: string): Promise<Ticket | null> => {
    await delay(300);
    const ticket = mockTickets.find(ticket => ticket.id === id);
    return ticket || null;
  },

  create: async (ticketData: Omit<Ticket, 'id'>): Promise<Ticket> => {
    await delay(500);
    const newTicket: Ticket = {
      ...ticketData,
      id: Date.now().toString(),
    };
    
    console.log('Creating ticket:', newTicket);
    return newTicket;
  },

  update: async (id: string, ticketData: Partial<Ticket>): Promise<Ticket> => {
    await delay(500);
    const existingTicket = mockTickets.find(ticket => ticket.id === id);
    
    if (!existingTicket) {
      throw new Error(`Ticket with id ${id} not found`);
    }

    const updatedTicket: Ticket = {
      ...existingTicket,
      ...ticketData,
      id,
    };

    console.log('Updating ticket:', updatedTicket);
    return updatedTicket;
  },

  delete: async (id: string): Promise<void> => {
    await delay(300);
    const ticket = mockTickets.find(ticket => ticket.id === id);
    
    if (!ticket) {
      throw new Error(`Ticket with id ${id} not found`);
    }

    console.log('Deleting ticket:', ticket.title);
  },
};

// Document CRUD Operations
export const documentService = {
  getAll: async (): Promise<Document[]> => {
    await delay(500);
    return [...mockDocuments];
  },

  getByClientId: async (clientId: string): Promise<Document[]> => {
    await delay(300);
    return mockDocuments.filter(doc => doc.clientId === clientId);
  },

  create: async (documentData: Omit<Document, 'id'>): Promise<Document> => {
    await delay(500);
    const newDocument: Document = {
      ...documentData,
      id: Date.now().toString(),
    };
    
    console.log('Creating document:', newDocument);
    return newDocument;
  },

  delete: async (id: string): Promise<void> => {
    await delay(300);
    const document = mockDocuments.find(doc => doc.id === id);
    
    if (!document) {
      throw new Error(`Document with id ${id} not found`);
    }

    console.log('Deleting document:', document.name);
  },
};

// Helper Functions
export const getActivitiesByServiceId = (serviceId: string): Activity[] => {
  return mockActivities.filter(activity => activity.serviceId === serviceId);
};

export const getServiceById = (serviceId: string): Service | undefined => {
  return mockServices.find(service => service.id === serviceId);
};

export const getClientById = (clientId: string): Client | undefined => {
  return mockClients.find(client => client.id === clientId);
};

export const getTicketsByClientId = (clientId: string): Ticket[] => {
  return mockTickets.filter(ticket => ticket.clientId === clientId);
};

export const getDocumentsByClientId = (clientId: string): Document[] => {
  return mockDocuments.filter(document => document.clientId === clientId);
};

export const getServicesByClientId = (clientId: string): Service[] => {
  const client = getClientById(clientId);
  return client ? client.services || [] : [];
};

export const getActivitiesByClientId = (clientId: string): Activity[] => {
  const clientServices = getServicesByClientId(clientId);
  const allActivities: Activity[] = [];
  clientServices.forEach(service => {
    allActivities.push(...service.activities);
  });
  return allActivities;
};

// Export all mock data and services
export default {
  // Mock Data
  mockUsers,
  mockClients,
  mockServices,
  mockActivities,
  mockTickets,
  mockDocuments,
  mockTeamMembers,
  
  // CRUD Services
  serviceService,
  clientService,
  ticketService,
  documentService,
  
  // Helper Functions
  getActivitiesByServiceId,
  getServiceById,
  getClientById,
  getTicketsByClientId,
  getDocumentsByClientId,
  getServicesByClientId,
  getActivitiesByClientId,
};