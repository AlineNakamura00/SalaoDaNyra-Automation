"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  MessageSquare,
  Clock,
  Users,
  Link,
  Check,
  Edit,
  Plus,
  Trash2,
  Save,
} from "lucide-react";
import { barbers } from "@/lib/mock-data";

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState("calendario");
  const [googleConnected, setGoogleConnected] = useState(false);

  const [horarioFuncionamento, setHorarioFuncionamento] = useState({
    segunda: { ativo: true, abertura: "09:00", fechamento: "19:00" },
    terca: { ativo: true, abertura: "09:00", fechamento: "19:00" },
    quarta: { ativo: true, abertura: "09:00", fechamento: "19:00" },
    quinta: { ativo: true, abertura: "09:00", fechamento: "19:00" },
    sexta: { ativo: true, abertura: "09:00", fechamento: "19:00" },
    sabado: { ativo: true, abertura: "09:00", fechamento: "17:00" },
    domingo: { ativo: false, abertura: "00:00", fechamento: "00:00" },
  });

  const [mensagens, setMensagens] = useState({
    confirmacao: true,
    lembrete24h: true,
    lembrete2h: true,
    posAtendimento: false,
  });

  const diasSemana = [
    { key: "segunda", label: "Segunda-feira" },
    { key: "terca", label: "Terça-feira" },
    { key: "quarta", label: "Quarta-feira" },
    { key: "quinta", label: "Quinta-feira" },
    { key: "sexta", label: "Sexta-feira" },
    { key: "sabado", label: "Sábado" },
    { key: "domingo", label: "Domingo" },
  ];

  return (
    <DashboardLayout title="Configurações">
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="calendario" className="gap-2">
              <Calendar className="h-4 w-4" />
              Calendário
            </TabsTrigger>
            <TabsTrigger value="mensagens" className="gap-2">
              <MessageSquare className="h-4 w-4" />
              Mensagens
            </TabsTrigger>
            <TabsTrigger value="horarios" className="gap-2">
              <Clock className="h-4 w-4" />
              Horários
            </TabsTrigger>
            <TabsTrigger value="barbeiros" className="gap-2">
              <Users className="h-4 w-4" />
              Barbeiros
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calendario" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                  <Calendar className="h-5 w-5 text-primary" />
                  Integração com Google Calendar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-8 w-8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.316 5.684H24v12.632h-5.684V5.684z"
                          fill="#EA4335"
                        />
                        <path
                          d="M0 5.684h5.684v12.632H0V5.684z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.684 18.316h12.632V24H5.684v-5.684z"
                          fill="#4285F4"
                        />
                        <path
                          d="M5.684 0h12.632v5.684H5.684V0z"
                          fill="#FBBC04"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Google Calendar</p>
                      <p className="text-sm text-muted-foreground">
                        {googleConnected
                          ? "Conectado - sincronizando agendas"
                          : "Conecte para sincronizar as agendas dos barbeiros"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {googleConnected ? (
                      <>
                        <Badge variant="success">Conectado</Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGoogleConnected(false)}
                        >
                          Desconectar
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => setGoogleConnected(true)}>
                        <Link className="mr-2 h-4 w-4" />
                        Conectar Conta
                      </Button>
                    )}
                  </div>
                </div>

                {googleConnected && (
                  <div className="space-y-4">
                    <h4 className="font-medium">Calendários Sincronizados</h4>
                    {barbers.map((barber) => (
                      <div
                        key={barber.id}
                        className="flex items-center justify-between rounded-lg bg-secondary/50 p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{barber.name}</p>
                            <p className="text-sm text-muted-foreground">
                              calendario.{barber.name.toLowerCase().replace(" ", ".")}@gmail.com
                            </p>
                          </div>
                        </div>
                        <Badge variant="success" className="gap-1">
                          <Check className="h-3 w-3" />
                          Sincronizado
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mensagens" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Mensagens Automáticas (WhatsApp)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <p className="font-medium">Confirmação de Agendamento</p>
                    <p className="text-sm text-muted-foreground">
                      Enviada imediatamente após o cliente agendar
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={mensagens.confirmacao}
                      onChange={(e) =>
                        setMensagens({ ...mensagens, confirmacao: e.target.checked })
                      }
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-muted after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white" />
                  </label>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <p className="font-medium">Lembrete 24h antes</p>
                    <p className="text-sm text-muted-foreground">
                      Enviada 24 horas antes do agendamento
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={mensagens.lembrete24h}
                      onChange={(e) =>
                        setMensagens({ ...mensagens, lembrete24h: e.target.checked })
                      }
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-muted after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white" />
                  </label>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <p className="font-medium">Lembrete 2h antes</p>
                    <p className="text-sm text-muted-foreground">
                      Enviada 2 horas antes do agendamento
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={mensagens.lembrete2h}
                      onChange={(e) =>
                        setMensagens({ ...mensagens, lembrete2h: e.target.checked })
                      }
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-muted after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white" />
                  </label>
                </div>

                <div className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <p className="font-medium">Pós-atendimento</p>
                    <p className="text-sm text-muted-foreground">
                      Enviada após o atendimento para feedback
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={mensagens.posAtendimento}
                      onChange={(e) =>
                        setMensagens({ ...mensagens, posAtendimento: e.target.checked })
                      }
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-muted after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white" />
                  </label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  Templates de Mensagens
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-medium">Confirmação de Agendamento</p>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="rounded-lg bg-secondary/50 p-3 text-sm text-muted-foreground">
                    Olá [NOME]! Seu agendamento foi confirmado para [DATA] às
                    [HORA] com [BARBEIRO]. Serviço: [SERVICO]. Até lá!
                  </p>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="font-medium">Lembrete 24h</p>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="rounded-lg bg-secondary/50 p-3 text-sm text-muted-foreground">
                    Oi [NOME]! Lembrando que amanhã você tem horário marcado às
                    [HORA]. Confirme sua presença respondendo SIM ou reagende
                    se necessário.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="horarios" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                  <Clock className="h-5 w-5 text-primary" />
                  Horário de Funcionamento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {diasSemana.map((dia) => {
                  const config =
                    horarioFuncionamento[
                      dia.key as keyof typeof horarioFuncionamento
                    ];
                  return (
                    <div
                      key={dia.key}
                      className="flex items-center justify-between rounded-lg border border-border p-4"
                    >
                      <div className="flex items-center gap-4">
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            checked={config.ativo}
                            onChange={(e) =>
                              setHorarioFuncionamento({
                                ...horarioFuncionamento,
                                [dia.key]: {
                                  ...config,
                                  ativo: e.target.checked,
                                },
                              })
                            }
                            className="peer sr-only"
                          />
                          <div className="peer h-6 w-11 rounded-full bg-muted after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white" />
                        </label>
                        <span
                          className={`font-medium ${!config.ativo ? "text-muted-foreground" : ""}`}
                        >
                          {dia.label}
                        </span>
                      </div>

                      {config.ativo ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="time"
                            value={config.abertura}
                            onChange={(e) =>
                              setHorarioFuncionamento({
                                ...horarioFuncionamento,
                                [dia.key]: {
                                  ...config,
                                  abertura: e.target.value,
                                },
                              })
                            }
                            className="h-9 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary"
                          />
                          <span className="text-muted-foreground">até</span>
                          <input
                            type="time"
                            value={config.fechamento}
                            onChange={(e) =>
                              setHorarioFuncionamento({
                                ...horarioFuncionamento,
                                [dia.key]: {
                                  ...config,
                                  fechamento: e.target.value,
                                },
                              })
                            }
                            className="h-9 rounded-lg border border-input bg-background px-3 text-sm outline-none focus:border-primary"
                          />
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          Fechado
                        </span>
                      )}
                    </div>
                  );
                })}

                <div className="flex justify-end pt-4">
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Alterações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="barbeiros" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Equipe de Barbeiros</h3>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Barbeiro
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {barbers.map((barber) => (
                <Card key={barber.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                          <Users className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{barber.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {barber.workingHours.start} - {barber.workingHours.end}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <p className="mb-2 text-sm text-muted-foreground">
                        Especialidades:
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {barber.specialties.map((specialty) => (
                          <Badge key={specialty} variant="secondary">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
