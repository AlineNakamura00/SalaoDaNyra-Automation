"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Users,
  TrendingUp,
  AlertTriangle,
  CreditCard,
  Calendar,
  Edit,
  ToggleLeft,
} from "lucide-react";
import { plans, clientPlans, clients } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from "recharts";

export default function PlanosPage() {
  const activePlans = clientPlans.filter((cp) => cp.status === "active");
  const expiringPlans = activePlans.filter((cp) => {
    const daysUntilExpiry = Math.ceil(
      (cp.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
  });

  const planUsageData = plans.map((plan) => {
    const clientsWithPlan = clientPlans.filter(
      (cp) => cp.planId === plan.id && cp.status === "active"
    );
    return {
      name: plan.name.split(" - ")[1] || plan.name,
      clients: clientsWithPlan.length,
      revenue: clientsWithPlan.length * plan.price,
    };
  });

  const utilizationData = activePlans.map((cp) => {
    const plan = plans.find((p) => p.id === cp.planId);
    const client = clients.find((c) => c.id === cp.clientId);
    return {
      name: client?.name || "Cliente",
      used: cp.servicesUsed,
      total: plan?.servicesIncluded || 0,
      percentage: plan
        ? Math.round((cp.servicesUsed / plan.servicesIncluded) * 100)
        : 0,
    };
  });

  const pieData = plans.map((plan, index) => {
    const count = clientPlans.filter(
      (cp) => cp.planId === plan.id && cp.status === "active"
    ).length;
    return {
      name: plan.name.split(" - ")[1] || plan.name,
      value: count,
    };
  });

  const COLORS = ["hsl(14, 79%, 53%)", "hsl(142, 76%, 36%)", "hsl(220, 70%, 50%)"];

  return (
    <DashboardLayout title="Planos Recorrentes">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Planos Ativos
                  </p>
                  <p className="mt-1 text-3xl font-bold text-foreground">
                    {activePlans.length}
                  </p>
                </div>
                <div className="rounded-lg bg-primary/10 p-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Receita Mensal
                  </p>
                  <p className="mt-1 text-3xl font-bold text-foreground">
                    {formatCurrency(
                      activePlans.reduce((sum, cp) => {
                        const plan = plans.find((p) => p.id === cp.planId);
                        return sum + (plan?.price || 0);
                      }, 0)
                    )}
                  </p>
                </div>
                <div className="rounded-lg bg-success/10 p-3">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Vencendo em 7 dias
                  </p>
                  <p className="mt-1 text-3xl font-bold text-foreground">
                    {expiringPlans.length}
                  </p>
                </div>
                <div className="rounded-lg bg-warning/10 p-3">
                  <AlertTriangle className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Planos Disponíveis</h2>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Plano
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {plans.map((plan) => {
            const activeCount = clientPlans.filter(
              (cp) => cp.planId === plan.id && cp.status === "active"
            ).length;
            return (
              <Card
                key={plan.id}
                className="relative overflow-hidden border-2 hover:border-primary/50 transition-colors"
              >
                {plan.id === "3" && (
                  <div className="absolute right-0 top-0 bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                    Popular
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{plan.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {plan.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold">
                      {formatCurrency(plan.price)}
                    </span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Serviços inclusos:
                      </span>
                      <span className="font-medium">
                        {plan.servicesIncluded === 99
                          ? "Ilimitado"
                          : plan.servicesIncluded}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Validade:</span>
                      <span className="font-medium">
                        {plan.durationDays} dias
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Clientes ativos:
                      </span>
                      <Badge variant="secondary">{activeCount}</Badge>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="mr-1 h-3 w-3" />
                      Editar
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ToggleLeft className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Utilização dos Planos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {utilizationData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {item.used}/{item.total} ({item.percentage}%)
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base font-medium">
                Distribuição de Planos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">
              Planos Próximos ao Vencimento
            </CardTitle>
          </CardHeader>
          <CardContent>
            {expiringPlans.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Nenhum plano próximo ao vencimento nos próximos 7 dias.
              </p>
            ) : (
              <div className="space-y-3">
                {expiringPlans.map((cp) => {
                  const client = clients.find((c) => c.id === cp.clientId);
                  const plan = plans.find((p) => p.id === cp.planId);
                  const daysUntilExpiry = Math.ceil(
                    (cp.endDate.getTime() - new Date().getTime()) /
                      (1000 * 60 * 60 * 24)
                  );
                  return (
                    <div
                      key={cp.id}
                      className="flex items-center justify-between rounded-lg border border-warning/50 bg-warning/10 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-warning" />
                        <div>
                          <p className="font-medium">{client?.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {plan?.name}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="warning">
                          Vence em {daysUntilExpiry} dias
                        </Badge>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {formatDate(cp.endDate)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
