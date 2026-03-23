"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Search,
  Plus,
  Phone,
  Mail,
  Calendar,
  User,
  CreditCard,
  History,
} from "lucide-react";
import { clients, plans, clientPlans, appointments } from "@/lib/mock-data";
import { formatDate, formatCurrency } from "@/lib/utils";
import type { Client } from "@/lib/types";

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPlan, setFilterPlan] = useState<string>("all");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm);
    const matchesPlan =
      filterPlan === "all" ||
      (filterPlan === "with-plan" && client.planId) ||
      (filterPlan === "without-plan" && !client.planId);
    return matchesSearch && matchesPlan;
  });

  const getClientPlan = (clientId: string) => {
    const clientPlan = clientPlans.find((cp) => cp.clientId === clientId);
    if (!clientPlan) return null;
    const plan = plans.find((p) => p.id === clientPlan.planId);
    return { ...clientPlan, plan };
  };

  const getClientAppointments = (clientId: string) => {
    return appointments.filter((apt) => apt.clientId === clientId);
  };

  return (
    <DashboardLayout title="Clientes">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por nome ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-10 w-72 rounded-lg border border-input bg-background pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <select
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
              className="h-10 rounded-lg border border-input bg-background px-4 text-sm outline-none focus:border-primary"
            >
              <option value="all">Todos os clientes</option>
              <option value="with-plan">Com plano ativo</option>
              <option value="without-plan">Sem plano</option>
            </select>
          </div>

          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Cliente
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                      Cliente
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                      Telefone
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                      E-mail
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                      Plano
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                      Cliente desde
                    </th>
                    <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((client) => {
                    const clientPlanData = getClientPlan(client.id);
                    return (
                      <tr
                        key={client.id}
                        className="border-b border-border transition-colors hover:bg-secondary/30"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                              <User className="h-5 w-5 text-primary" />
                            </div>
                            <span className="font-medium text-foreground">
                              {client.name}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <span>{client.phone}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          {client.email ? (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Mail className="h-4 w-4" />
                              <span>{client.email}</span>
                            </div>
                          ) : (
                            <span className="text-muted-foreground/50">-</span>
                          )}
                        </td>
                        <td className="p-4">
                          {clientPlanData ? (
                            <Badge variant="success">
                              {clientPlanData.plan?.name}
                            </Badge>
                          ) : (
                            <Badge variant="secondary">Sem plano</Badge>
                          )}
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {formatDate(client.createdAt)}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedClient(client)}
                            >
                              Ver detalhes
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Calendar className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog
        open={!!selectedClient}
        onOpenChange={() => setSelectedClient(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <User className="h-6 w-6 text-primary" />
              </div>
              {selectedClient?.name}
            </DialogTitle>
            <DialogDescription>
              Cliente desde{" "}
              {selectedClient && formatDate(selectedClient.createdAt)}
            </DialogDescription>
          </DialogHeader>

          {selectedClient && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Telefone</p>
                    <p className="font-medium">{selectedClient.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">E-mail</p>
                    <p className="font-medium">
                      {selectedClient.email || "Não informado"}
                    </p>
                  </div>
                </div>
              </div>

              {getClientPlan(selectedClient.id) && (
                <div className="rounded-lg border border-border p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <h4 className="font-medium">Plano Ativo</h4>
                  </div>
                  {(() => {
                    const planData = getClientPlan(selectedClient.id);
                    if (!planData) return null;
                    return (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Plano:</span>
                          <span className="font-medium">
                            {planData.plan?.name}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Usos:</span>
                          <span className="font-medium">
                            {planData.servicesUsed}/
                            {planData.plan?.servicesIncluded}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">
                            Vencimento:
                          </span>
                          <span className="font-medium">
                            {formatDate(planData.endDate)}
                          </span>
                        </div>
                        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{
                              width: `${(planData.servicesUsed / (planData.plan?.servicesIncluded || 1)) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              <div className="rounded-lg border border-border p-4">
                <div className="mb-3 flex items-center gap-2">
                  <History className="h-5 w-5 text-primary" />
                  <h4 className="font-medium">Histórico de Serviços</h4>
                </div>
                <div className="space-y-2">
                  {getClientAppointments(selectedClient.id)
                    .slice(0, 5)
                    .map((apt) => (
                      <div
                        key={apt.id}
                        className="flex items-center justify-between rounded-lg bg-secondary/50 p-3"
                      >
                        <div>
                          <p className="font-medium">{apt.serviceName}</p>
                          <p className="text-sm text-muted-foreground">
                            {apt.barberName}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">
                            {formatDate(apt.date)} às {apt.time}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">Editar</Button>
                <Button>
                  <Calendar className="mr-2 h-4 w-4" />
                  Agendar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
