import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

export function formatTime(time: string): string {
  return time;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
}

export function getStatusColor(
  status: string
): "default" | "success" | "warning" | "destructive" {
  switch (status) {
    case "confirmed":
    case "completed":
    case "active":
      return "success";
    case "scheduled":
      return "default";
    case "no-show":
    case "cancelled":
    case "expired":
      return "destructive";
    default:
      return "default";
  }
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    scheduled: "Agendado",
    confirmed: "Confirmado",
    completed: "Concluído",
    "no-show": "Não compareceu",
    cancelled: "Cancelado",
    active: "Ativo",
    expired: "Expirado",
  };
  return labels[status] || status;
}
