"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download,
  Users,
  Scissors,
  UserX,
  Package,
  TrendingUp,
  Calendar,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  barbers,
  services,
  appointments,
  products,
  weeklyServicesData,
  occupancyData,
} from "@/lib/mock-data";
import { formatCurrency } from "@/lib/utils";

const noShowData = [
  { month: "Jan", noShows: 5, total: 120 },
  { month: "Fev", noShows: 3, total: 115 },
  { month: "Mar", noShows: 4, total: 130 },
  { month: "Abr", noShows: 2, total: 125 },
  { month: "Mai", noShows: 6, total: 140 },
  { month: "Jun", noShows: 3, total: 135 },
];

const productSalesData = [
  { name: "Pomada Modeladora", sales: 24, revenue: 1080 },
  { name: "Óleo para Barba", sales: 18, revenue: 630 },
  { name: "Shampoo Anticaspa", sales: 15, revenue: 420 },
  { name: "Cera Capilar", sales: 12, revenue: 480 },
];

const revenueData = [
  { month: "Jan", servicos: 4500, produtos: 1200, planos: 2100 },
  { month: "Fev", servicos: 4800, produtos: 1100, planos: 2300 },
  { month: "Mar", servicos: 5200, produtos: 1400, planos: 2400 },
  { month: "Abr", servicos: 4900, produtos: 1300, planos: 2500 },
  { month: "Mai", servicos: 5500, produtos: 1600, planos: 2600 },
  { month: "Jun", servicos: 5800, produtos: 1500, planos: 2800 },
];

const COLORS = [
  "hsl(14, 79%, 53%)",
  "hsl(142, 76%, 36%)",
  "hsl(220, 70%, 50%)",
  "hsl(38, 92%, 50%)",
];

export default function RelatoriosPage() {
  const [activeTab, setActiveTab] = useState("ocupacao");
  const [dateRange, setDateRange] = useState("month");

  return (
    <DashboardLayout title="Relatórios">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="h-10 rounded-lg border border-input bg-background px-4 text-sm outline-none focus:border-primary"
            >
              <option value="week">Última semana</option>
              <option value="month">Último mês</option>
              <option value="quarter">Último trimestre</option>
              <option value="year">Último ano</option>
            </select>
          </div>

          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar CSV
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="ocupacao" className="gap-2">
              <Users className="h-4 w-4" />
              Ocupação
            </TabsTrigger>
            <TabsTrigger value="servicos" className="gap-2">
              <Scissors className="h-4 w-4" />
              Serviços
            </TabsTrigger>
            <TabsTrigger value="noshow" className="gap-2">
              <UserX className="h-4 w-4" />
              No-show
            </TabsTrigger>
            <TabsTrigger value="vendas" className="gap-2">
              <Package className="h-4 w-4" />
              Vendas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ocupacao" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              {occupancyData.map((barber, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                          <Users className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{barber.name}</p>
                          <p className="text-sm text-muted-foreground">
                            Barbeiro
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                          {barber.occupancy}%
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ocupação
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${barber.occupancy}%` }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  Taxa de Ocupação por Barbeiro
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={occupancyData}>
                      <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        domain={[0, 100]}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => [`${value}%`, "Ocupação"]}
                      />
                      <Bar dataKey="occupancy" fill="hsl(14, 79%, 53%)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="servicos" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium">
                    Serviços Mais Realizados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={weeklyServicesData}
                        layout="vertical"
                        margin={{ left: 20 }}
                      >
                        <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                        <YAxis
                          dataKey="name"
                          type="category"
                          width={100}
                          stroke="hsl(var(--muted-foreground))"
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Bar dataKey="value" fill="hsl(14, 79%, 53%)" radius={[0, 4, 4, 0]}>
                          {weeklyServicesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium">
                    Distribuição de Serviços
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={weeklyServicesData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${(percent * 100).toFixed(0)}%`
                          }
                        >
                          {weeklyServicesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="noshow" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Total No-shows
                      </p>
                      <p className="mt-1 text-3xl font-bold text-foreground">
                        {noShowData.reduce((sum, d) => sum + d.noShows, 0)}
                      </p>
                    </div>
                    <div className="rounded-lg bg-destructive/10 p-3">
                      <UserX className="h-6 w-6 text-destructive" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Taxa Média
                      </p>
                      <p className="mt-1 text-3xl font-bold text-foreground">
                        {(
                          (noShowData.reduce((sum, d) => sum + d.noShows, 0) /
                            noShowData.reduce((sum, d) => sum + d.total, 0)) *
                          100
                        ).toFixed(1)}
                        %
                      </p>
                    </div>
                    <div className="rounded-lg bg-warning/10 p-3">
                      <TrendingUp className="h-6 w-6 text-warning" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Perda Estimada
                      </p>
                      <p className="mt-1 text-3xl font-bold text-foreground">
                        {formatCurrency(
                          noShowData.reduce((sum, d) => sum + d.noShows, 0) * 45
                        )}
                      </p>
                    </div>
                    <div className="rounded-lg bg-primary/10 p-3">
                      <span className="text-xl font-bold text-primary">R$</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  Evolução de No-shows por Mês
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={noShowData}>
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="noShows"
                        stroke="hsl(0, 84%, 60%)"
                        strokeWidth={2}
                        dot={{ fill: "hsl(0, 84%, 60%)" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendas" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Total Vendido
                      </p>
                      <p className="mt-1 text-3xl font-bold text-foreground">
                        {formatCurrency(
                          productSalesData.reduce((sum, p) => sum + p.revenue, 0)
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
                        Unidades Vendidas
                      </p>
                      <p className="mt-1 text-3xl font-bold text-foreground">
                        {productSalesData.reduce((sum, p) => sum + p.sales, 0)}
                      </p>
                    </div>
                    <div className="rounded-lg bg-primary/10 p-3">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  Vendas por Produto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {productSalesData.map((product, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-border p-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Package className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {product.sales} unidades vendidas
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-primary">
                          {formatCurrency(product.revenue)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  Receita por Categoria
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                        formatter={(value: number) => formatCurrency(value)}
                      />
                      <Legend />
                      <Bar
                        dataKey="servicos"
                        name="Serviços"
                        fill="hsl(14, 79%, 53%)"
                        stackId="a"
                        radius={[0, 0, 0, 0]}
                      />
                      <Bar
                        dataKey="produtos"
                        name="Produtos"
                        fill="hsl(142, 76%, 36%)"
                        stackId="a"
                        radius={[0, 0, 0, 0]}
                      />
                      <Bar
                        dataKey="planos"
                        name="Planos"
                        fill="hsl(220, 70%, 50%)"
                        stackId="a"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
