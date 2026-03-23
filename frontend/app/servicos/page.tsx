"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Scissors,
  Package,
  Clock,
  Edit,
  ToggleLeft,
  ToggleRight,
  AlertCircle,
} from "lucide-react";
import { services, products } from "@/lib/mock-data";
import { formatCurrency, formatDuration } from "@/lib/utils";

export default function ServicosPage() {
  const [activeTab, setActiveTab] = useState("servicos");

  const activeServices = services.filter((s) => s.active);
  const inactiveServices = services.filter((s) => !s.active);

  const lowStockProducts = products.filter((p) => p.stock <= 10);

  return (
    <DashboardLayout title="Serviços e Produtos">
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="servicos" className="gap-2">
                <Scissors className="h-4 w-4" />
                Serviços
              </TabsTrigger>
              <TabsTrigger value="produtos" className="gap-2">
                <Package className="h-4 w-4" />
                Produtos
              </TabsTrigger>
            </TabsList>

            <Button>
              <Plus className="mr-2 h-4 w-4" />
              {activeTab === "servicos" ? "Novo Serviço" : "Novo Produto"}
            </Button>
          </div>

          <TabsContent value="servicos" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Total de Serviços
                      </p>
                      <p className="mt-1 text-3xl font-bold text-foreground">
                        {services.length}
                      </p>
                    </div>
                    <div className="rounded-lg bg-primary/10 p-3">
                      <Scissors className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Serviços Ativos
                      </p>
                      <p className="mt-1 text-3xl font-bold text-foreground">
                        {activeServices.length}
                      </p>
                    </div>
                    <div className="rounded-lg bg-success/10 p-3">
                      <ToggleRight className="h-6 w-6 text-success" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Preço Médio
                      </p>
                      <p className="mt-1 text-3xl font-bold text-foreground">
                        {formatCurrency(
                          services.reduce((sum, s) => sum + s.price, 0) /
                            services.length
                        )}
                      </p>
                    </div>
                    <div className="rounded-lg bg-blue-500/10 p-3">
                      <span className="text-xl font-bold text-blue-500">R$</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Duração Média
                      </p>
                      <p className="mt-1 text-3xl font-bold text-foreground">
                        {Math.round(
                          services.reduce((sum, s) => sum + s.duration, 0) /
                            services.length
                        )}{" "}
                        min
                      </p>
                    </div>
                    <div className="rounded-lg bg-purple-500/10 p-3">
                      <Clock className="h-6 w-6 text-purple-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Card
                  key={service.id}
                  className={`transition-all ${!service.active ? "opacity-60" : "hover:shadow-md"}`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`rounded-lg p-2 ${service.active ? "bg-primary/10" : "bg-muted"}`}
                        >
                          <Scissors
                            className={`h-5 w-5 ${service.active ? "text-primary" : "text-muted-foreground"}`}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{service.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {service.description}
                          </p>
                        </div>
                      </div>
                      <Badge variant={service.active ? "success" : "secondary"}>
                        {service.active ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <div className="rounded-lg bg-secondary/50 p-3 text-center">
                        <p className="text-sm text-muted-foreground">Preço</p>
                        <p className="text-lg font-bold text-primary">
                          {formatCurrency(service.price)}
                        </p>
                      </div>
                      <div className="rounded-lg bg-secondary/50 p-3 text-center">
                        <p className="text-sm text-muted-foreground">Duração</p>
                        <p className="text-lg font-bold">
                          {formatDuration(service.duration)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="mr-1 h-3 w-3" />
                        Editar
                      </Button>
                      <Button variant="ghost" size="sm">
                        {service.active ? (
                          <ToggleRight className="h-4 w-4 text-success" />
                        ) : (
                          <ToggleLeft className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="produtos" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Total de Produtos
                      </p>
                      <p className="mt-1 text-3xl font-bold text-foreground">
                        {products.length}
                      </p>
                    </div>
                    <div className="rounded-lg bg-primary/10 p-3">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Estoque Total
                      </p>
                      <p className="mt-1 text-3xl font-bold text-foreground">
                        {products.reduce((sum, p) => sum + p.stock, 0)}
                      </p>
                    </div>
                    <div className="rounded-lg bg-success/10 p-3">
                      <Package className="h-6 w-6 text-success" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Valor em Estoque
                      </p>
                      <p className="mt-1 text-3xl font-bold text-foreground">
                        {formatCurrency(
                          products.reduce(
                            (sum, p) => sum + p.price * p.stock,
                            0
                          )
                        )}
                      </p>
                    </div>
                    <div className="rounded-lg bg-blue-500/10 p-3">
                      <span className="text-xl font-bold text-blue-500">R$</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Estoque Baixo
                      </p>
                      <p className="mt-1 text-3xl font-bold text-foreground">
                        {lowStockProducts.length}
                      </p>
                    </div>
                    <div className="rounded-lg bg-warning/10 p-3">
                      <AlertCircle className="h-6 w-6 text-warning" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border bg-secondary/50">
                        <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                          Produto
                        </th>
                        <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                          Descrição
                        </th>
                        <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                          Preço
                        </th>
                        <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                          Estoque
                        </th>
                        <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                          Status
                        </th>
                        <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr
                          key={product.id}
                          className="border-b border-border transition-colors hover:bg-secondary/30"
                        >
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <Package className="h-5 w-5 text-primary" />
                              </div>
                              <span className="font-medium">{product.name}</span>
                            </div>
                          </td>
                          <td className="p-4 text-muted-foreground">
                            {product.description}
                          </td>
                          <td className="p-4 font-medium">
                            {formatCurrency(product.price)}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <span
                                className={`font-medium ${product.stock <= 10 ? "text-warning" : ""}`}
                              >
                                {product.stock} un.
                              </span>
                              {product.stock <= 10 && (
                                <AlertCircle className="h-4 w-4 text-warning" />
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge
                              variant={product.active ? "success" : "secondary"}
                            >
                              {product.active ? "Ativo" : "Inativo"}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                {product.active ? (
                                  <ToggleRight className="h-4 w-4 text-success" />
                                ) : (
                                  <ToggleLeft className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
