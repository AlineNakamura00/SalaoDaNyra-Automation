export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  planId?: string;
  notes?: string;
  createdAt: Date;
}

export interface Barber {
  id: string;
  name: string;
  avatar?: string;
  specialties: string[];
  workingHours: {
    start: string;
    end: string;
  };
}

export interface Service {
  id: string;
  name: string;
  duration: number; // in minutes
  price: number;
  description?: string;
  active: boolean;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  description?: string;
  active: boolean;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  servicesIncluded: number;
  durationDays: number;
  active: boolean;
}

export interface ClientPlan {
  id: string;
  clientId: string;
  planId: string;
  servicesUsed: number;
  startDate: Date;
  endDate: Date;
  status: "active" | "expired" | "cancelled";
}

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  barberId: string;
  barberName: string;
  serviceId: string;
  serviceName: string;
  date: Date;
  time: string;
  duration: number;
  status: "scheduled" | "confirmed" | "completed" | "no-show" | "cancelled";
  notes?: string;
}

export interface DashboardMetrics {
  appointmentsToday: number;
  occupancyRate: number;
  activePlans: number;
  noShowsMonth: number;
}
