import type { Activity } from './Activity';

export interface Service {
  id: string;
  name: string;
  activities: Activity[];
  status: 'active' | 'discontinued';
}
