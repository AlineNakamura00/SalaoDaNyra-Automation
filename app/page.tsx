"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { MetricsCards } from "@/components/dashboard/metrics-cards";
import { ServicesChart } from "@/components/dashboard/services-chart";
import { UpcomingAppointments } from "@/components/dashboard/upcoming-appointments";
import { MiniCalendar } from "@/components/dashboard/mini-calendar";
import {
  dashboardMetrics,
  weeklyServicesData,
  appointments,
} from "@/lib/mock-data";

export default function DashboardPage() {
  const todayAppointments = appointments.filter((apt) => {
    const today = new Date();
    return apt.date.toDateString() === today.toDateString();
  });

  const highlightedDates = appointments.map((apt) => apt.date);

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        <MetricsCards metrics={dashboardMetrics} />

        <div className="grid gap-6 lg:grid-cols-3">
          <ServicesChart data={weeklyServicesData} />
          <MiniCalendar highlightedDates={highlightedDates} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <UpcomingAppointments appointments={todayAppointments} />
        </div>
      </div>
    </DashboardLayout>
  );
}
