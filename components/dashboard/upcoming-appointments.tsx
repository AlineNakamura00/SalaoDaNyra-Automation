"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User, Scissors } from "lucide-react";
import type { Appointment } from "@/lib/types";
import { getStatusColor, getStatusLabel } from "@/lib/utils";

interface UpcomingAppointmentsProps {
  appointments: Appointment[];
}

export function UpcomingAppointments({
  appointments,
}: UpcomingAppointmentsProps) {
  return (
    <Card className="col-span-1">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-medium">
          Próximos Agendamentos
        </CardTitle>
        <span className="text-sm text-muted-foreground">Próximas 24h</span>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.slice(0, 5).map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">
                    {appointment.clientName}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{appointment.time}</span>
                    <span className="text-muted-foreground/50">|</span>
                    <Scissors className="h-3 w-3" />
                    <span>{appointment.serviceName}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge variant={getStatusColor(appointment.status)}>
                  {getStatusLabel(appointment.status)}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {appointment.barberName}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
