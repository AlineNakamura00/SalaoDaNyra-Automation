"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus, Clock, User } from "lucide-react";
import { appointments, barbers } from "@/lib/mock-data";
import { getStatusColor, getStatusLabel } from "@/lib/utils";
import type { Appointment } from "@/lib/types";

const HOURS = Array.from({ length: 11 }, (_, i) => i + 8);

const DAYS_OF_WEEK = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

function getWeekDates(date: Date): Date[] {
  const week: Date[] = [];
  const start = new Date(date);
  start.setDate(start.getDate() - start.getDay());

  for (let i = 0; i < 7; i++) {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    week.push(day);
  }
  return week;
}

function formatDateShort(date: Date): string {
  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

export default function AgendaPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<"week" | "day">("week");
  const [selectedBarber, setSelectedBarber] = useState<string>("all");

  const weekDates = getWeekDates(currentDate);

  const filteredAppointments = appointments.filter((apt) => {
    if (selectedBarber !== "all" && apt.barberId !== selectedBarber) {
      return false;
    }
    return true;
  });

  const getAppointmentsForDateAndHour = (
    date: Date,
    hour: number
  ): Appointment[] => {
    return filteredAppointments.filter((apt) => {
      const aptDate = new Date(apt.date);
      const aptHour = parseInt(apt.time.split(":")[0]);
      return (
        aptDate.toDateString() === date.toDateString() && aptHour === hour
      );
    });
  };

  const prevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const nextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <DashboardLayout title="Agenda">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={prevWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={goToToday}>
              Hoje
            </Button>
            <Button variant="outline" size="sm" onClick={nextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <span className="ml-2 font-medium">
              {formatDateShort(weekDates[0])} - {formatDateShort(weekDates[6])}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Barbeiro:</span>
              <select
                value={selectedBarber}
                onChange={(e) => setSelectedBarber(e.target.value)}
                className="h-9 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary"
              >
                <option value="all">Todos</option>
                {barbers.map((barber) => (
                  <option key={barber.id} value={barber.id}>
                    {barber.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex rounded-lg border border-input">
              <button
                onClick={() => setView("week")}
                className={`px-3 py-1.5 text-sm ${view === "week" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
              >
                Semana
              </button>
              <button
                onClick={() => setView("day")}
                className={`px-3 py-1.5 text-sm ${view === "day" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"}`}
              >
                Dia
              </button>
            </div>

            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Agendamento
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse">
                <thead>
                  <tr>
                    <th className="w-20 border-b border-r border-border bg-secondary/50 p-3 text-left text-xs font-medium text-muted-foreground">
                      Horário
                    </th>
                    {weekDates.map((date, index) => {
                      const isToday =
                        date.toDateString() === new Date().toDateString();
                      return (
                        <th
                          key={index}
                          className={`border-b border-r border-border p-3 text-center ${isToday ? "bg-primary/10" : "bg-secondary/50"}`}
                        >
                          <div className="text-xs font-medium text-muted-foreground">
                            {DAYS_OF_WEEK[date.getDay()]}
                          </div>
                          <div
                            className={`text-lg font-semibold ${isToday ? "text-primary" : "text-foreground"}`}
                          >
                            {date.getDate()}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {HOURS.map((hour) => (
                    <tr key={hour}>
                      <td className="border-b border-r border-border bg-secondary/30 p-3 text-center text-sm text-muted-foreground">
                        {String(hour).padStart(2, "0")}:00
                      </td>
                      {weekDates.map((date, dateIndex) => {
                        const cellAppointments = getAppointmentsForDateAndHour(
                          date,
                          hour
                        );
                        const isToday =
                          date.toDateString() === new Date().toDateString();
                        return (
                          <td
                            key={dateIndex}
                            className={`relative h-20 border-b border-r border-border p-1 ${isToday ? "bg-primary/5" : ""}`}
                          >
                            {cellAppointments.map((apt) => (
                              <div
                                key={apt.id}
                                className="mb-1 cursor-pointer rounded-md bg-primary/20 p-2 transition-colors hover:bg-primary/30"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-medium text-foreground">
                                    {apt.clientName}
                                  </span>
                                  <Badge
                                    variant={getStatusColor(apt.status)}
                                    className="h-5 text-[10px]"
                                  >
                                    {getStatusLabel(apt.status)}
                                  </Badge>
                                </div>
                                <div className="mt-1 flex items-center gap-2 text-[10px] text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>{apt.time}</span>
                                  <User className="h-3 w-3" />
                                  <span>{apt.barberName.split(" ")[0]}</span>
                                </div>
                              </div>
                            ))}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
