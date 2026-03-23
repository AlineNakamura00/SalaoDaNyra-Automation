import type {
  Client,
  Barber,
  Service,
  Product,
  Plan,
  ClientPlan,
  Appointment,
  DashboardMetrics,
} from "./types";

export const barbers: Barber[] = [
  {
    id: "1",
    name: "Carlos Silva",
    avatar: "/avatars/carlos.jpg",
    specialties: ["Corte", "Barba", "Sobrancelha"],
    workingHours: { start: "09:00", end: "18:00" },
  },
  {
    id: "2",
    name: "Rafael Costa",
    avatar: "/avatars/rafael.jpg",
    specialties: ["Corte", "Barba"],
    workingHours: { start: "10:00", end: "19:00" },
  },
  {
    id: "3",
    name: "Bruno Oliveira",
    avatar: "/avatars/bruno.jpg",
    specialties: ["Corte", "Degradê", "Barba"],
    workingHours: { start: "09:00", end: "17:00" },
  },
];

export const services: Service[] = [
  {
    id: "1",
    name: "Corte Masculino",
    duration: 30,
    price: 45,
    description: "Corte completo com máquina e tesoura",
    active: true,
  },
  {
    id: "2",
    name: "Barba",
    duration: 20,
    price: 30,
    description: "Barba com navalha e toalha quente",
    active: true,
  },
  {
    id: "3",
    name: "Corte + Barba",
    duration: 45,
    price: 65,
    description: "Combo completo",
    active: true,
  },
  {
    id: "4",
    name: "Sobrancelha",
    duration: 10,
    price: 15,
    description: "Design de sobrancelha",
    active: true,
  },
  {
    id: "5",
    name: "Degradê",
    duration: 40,
    price: 55,
    description: "Corte degradê moderno",
    active: true,
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Pomada Modeladora",
    price: 45,
    stock: 24,
    description: "Fixação forte, acabamento fosco",
    active: true,
  },
  {
    id: "2",
    name: "Óleo para Barba",
    price: 35,
    stock: 18,
    description: "Hidratação e brilho",
    active: true,
  },
  {
    id: "3",
    name: "Shampoo Anticaspa",
    price: 28,
    stock: 32,
    description: "Tratamento intensivo",
    active: true,
  },
  {
    id: "4",
    name: "Cera Capilar",
    price: 40,
    stock: 15,
    description: "Fixação média, acabamento natural",
    active: true,
  },
];

export const plans: Plan[] = [
  {
    id: "1",
    name: "Plano Mensal - 4 Cortes",
    description: "4 cortes por mês",
    price: 150,
    servicesIncluded: 4,
    durationDays: 30,
    active: true,
  },
  {
    id: "2",
    name: "Plano Mensal - 6 Cortes",
    description: "6 cortes por mês",
    price: 200,
    servicesIncluded: 6,
    durationDays: 30,
    active: true,
  },
  {
    id: "3",
    name: "Plano VIP",
    description: "Cortes ilimitados + barba",
    price: 300,
    servicesIncluded: 99,
    durationDays: 30,
    active: true,
  },
];

export const clients: Client[] = [
  {
    id: "1",
    name: "Ana Silva",
    phone: "(11) 99999-1234",
    email: "ana.silva@email.com",
    planId: "1",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "João Souza",
    phone: "(11) 98888-5678",
    email: "joao.souza@email.com",
    createdAt: new Date("2024-02-20"),
  },
  {
    id: "3",
    name: "Pedro Santos",
    phone: "(11) 97777-9012",
    email: "pedro.santos@email.com",
    planId: "2",
    createdAt: new Date("2024-03-10"),
  },
  {
    id: "4",
    name: "Lucas Ferreira",
    phone: "(11) 96666-3456",
    planId: "1",
    createdAt: new Date("2024-04-05"),
  },
  {
    id: "5",
    name: "Marcos Oliveira",
    phone: "(11) 95555-7890",
    email: "marcos.o@email.com",
    createdAt: new Date("2024-05-12"),
  },
];

export const clientPlans: ClientPlan[] = [
  {
    id: "1",
    clientId: "1",
    planId: "1",
    servicesUsed: 2,
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-03-31"),
    status: "active",
  },
  {
    id: "2",
    clientId: "3",
    planId: "2",
    servicesUsed: 4,
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-03-31"),
    status: "active",
  },
  {
    id: "3",
    clientId: "4",
    planId: "1",
    servicesUsed: 3,
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-03-31"),
    status: "active",
  },
];

const today = new Date();
const formatDate = (daysOffset: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() + daysOffset);
  return date;
};

export const appointments: Appointment[] = [
  {
    id: "1",
    clientId: "1",
    clientName: "Ana Silva",
    barberId: "1",
    barberName: "Carlos Silva",
    serviceId: "1",
    serviceName: "Corte Masculino",
    date: formatDate(0),
    time: "09:00",
    duration: 30,
    status: "confirmed",
  },
  {
    id: "2",
    clientId: "2",
    clientName: "João Souza",
    barberId: "2",
    barberName: "Rafael Costa",
    serviceId: "3",
    serviceName: "Corte + Barba",
    date: formatDate(0),
    time: "10:30",
    duration: 45,
    status: "scheduled",
  },
  {
    id: "3",
    clientId: "3",
    clientName: "Pedro Santos",
    barberId: "1",
    barberName: "Carlos Silva",
    serviceId: "2",
    serviceName: "Barba",
    date: formatDate(0),
    time: "14:00",
    duration: 20,
    status: "confirmed",
  },
  {
    id: "4",
    clientId: "4",
    clientName: "Lucas Ferreira",
    barberId: "3",
    barberName: "Bruno Oliveira",
    serviceId: "5",
    serviceName: "Degradê",
    date: formatDate(0),
    time: "15:00",
    duration: 40,
    status: "scheduled",
  },
  {
    id: "5",
    clientId: "5",
    clientName: "Marcos Oliveira",
    barberId: "2",
    barberName: "Rafael Costa",
    serviceId: "1",
    serviceName: "Corte Masculino",
    date: formatDate(0),
    time: "16:30",
    duration: 30,
    status: "scheduled",
  },
  {
    id: "6",
    clientId: "1",
    clientName: "Ana Silva",
    barberId: "1",
    barberName: "Carlos Silva",
    serviceId: "3",
    serviceName: "Corte + Barba",
    date: formatDate(1),
    time: "09:00",
    duration: 45,
    status: "scheduled",
  },
  {
    id: "7",
    clientId: "3",
    clientName: "Pedro Santos",
    barberId: "2",
    barberName: "Rafael Costa",
    serviceId: "1",
    serviceName: "Corte Masculino",
    date: formatDate(1),
    time: "11:00",
    duration: 30,
    status: "scheduled",
  },
];

export const dashboardMetrics: DashboardMetrics = {
  appointmentsToday: 5,
  occupancyRate: 78,
  activePlans: 12,
  noShowsMonth: 3,
};

export const weeklyServicesData = [
  { name: "Corte", value: 45 },
  { name: "Barba", value: 28 },
  { name: "Corte + Barba", value: 32 },
  { name: "Degradê", value: 18 },
  { name: "Sobrancelha", value: 12 },
];

export const occupancyData = [
  { name: "Carlos", occupancy: 85 },
  { name: "Rafael", occupancy: 72 },
  { name: "Bruno", occupancy: 68 },
];
