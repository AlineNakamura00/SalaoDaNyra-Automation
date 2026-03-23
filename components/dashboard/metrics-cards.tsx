"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Percent, CreditCard, UserX } from "lucide-react";
import type { DashboardMetrics } from "@/lib/types";

interface MetricsCardsProps {
  metrics: DashboardMetrics;
}

export function MetricsCards({ metrics }: MetricsCardsProps) {
  const cards = [
    {
      title: "Agendamentos Hoje",
      value: metrics.appointmentsToday,
      icon: Calendar,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Taxa de Ocupação",
      value: `${metrics.occupancyRate}%`,
      icon: Percent,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Planos Ativos",
      value: metrics.activePlans,
      icon: CreditCard,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "No-show (Mês)",
      value: metrics.noShowsMonth,
      icon: UserX,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </p>
                <p className="mt-1 text-3xl font-bold text-foreground">
                  {card.value}
                </p>
              </div>
              <div className={`rounded-lg p-3 ${card.bgColor}`}>
                <card.icon className={`h-6 w-6 ${card.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
