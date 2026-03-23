"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

interface MiniCalendarProps {
  highlightedDates?: Date[];
}

export function MiniCalendar({ highlightedDates = [] }: MiniCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const days: (number | null)[] = [];

  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const isHighlighted = (day: number) => {
    return highlightedDates.some(
      (date) =>
        date.getDate() === day &&
        date.getMonth() === month &&
        date.getFullYear() === year
    );
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Calendário</CardTitle>
          <div className="flex items-center gap-2">
            <button
              onClick={prevMonth}
              className="rounded-lg p-1 hover:bg-secondary"
            >
              <ChevronLeft className="h-4 w-4 text-muted-foreground" />
            </button>
            <span className="text-sm font-medium">
              {MONTHS[month]} {year}
            </span>
            <button
              onClick={nextMonth}
              className="rounded-lg p-1 hover:bg-secondary"
            >
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {DAYS.map((day) => (
            <div
              key={day}
              className="py-2 text-center text-xs font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
          {days.map((day, index) => (
            <div key={index} className="aspect-square p-0.5">
              {day && (
                <button
                  className={`flex h-full w-full items-center justify-center rounded-lg text-sm transition-colors ${
                    isToday(day)
                      ? "bg-primary text-primary-foreground"
                      : isHighlighted(day)
                        ? "bg-primary/20 text-primary"
                        : "hover:bg-secondary"
                  }`}
                >
                  {day}
                </button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
