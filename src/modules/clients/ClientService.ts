// src/services/clientService.ts
import type { Client } from '../clients/types/Client';
import { mockClients } from '../../constants/mockdata';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const clientService = {
  // GET all clients
  getAll: async (): Promise<Client[]> => {
    await delay(500);
    return [...mockClients];
  },

  // GET client by ID
  getById: async (id: string): Promise<Client | null> => {
    await delay(300);
    const client = mockClients.find((client:any) => client.id === id);
    return client || null;
  },

  // CREATE new client
  create: async (clientData: Omit<Client, 'id'>): Promise<Client> => {
    await delay(500);
    const newClient: Client = {
      ...clientData,
      id: Date.now().toString(), // Simple ID generation
    };
    
    // In real app, this would be an API call
    // For demo, we'll just log and return
    console.log('Creating client:', newClient);
    return newClient;
  },

  // UPDATE client
  update: async (id: string, clientData: Partial<Client>): Promise<Client> => {
    await delay(500);
    const existingClient = mockClients.find((client:any) => client.id === id);
    
    if (!existingClient) {
      throw new Error(`Client with id ${id} not found`);
    }

    const updatedClient: Client = {
      ...existingClient,
      ...clientData,
      id, // Ensure ID doesn't change
    };

    console.log('Updating client:', updatedClient);
    return updatedClient;
  },

  // DELETE client
  delete: async (id: string): Promise<void> => {
    await delay(300);
    const client = mockClients.find((client:any) => client.id === id);
    
    if (!client) {
      throw new Error(`Client with id ${id} not found`);
    }

    console.log('Deleting client:', client.name);
    // In real app, this would remove from database
  },

  // SEARCH clients
  search: async (query: string): Promise<Client[]> => {
    await delay(400);
    const lowerQuery = query.toLowerCase();
    
    return mockClients.filter((client:any)=>
      client.name.toLowerCase().includes(lowerQuery) ||
      client.email.toLowerCase().includes(lowerQuery) ||
      client.businessType.toLowerCase().includes(lowerQuery)
    );
  },
};