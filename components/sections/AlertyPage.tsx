"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  BellRing,
  BellOff,
  Plus,
  MapPin,
  Clock,
  Trash2,
} from "lucide-react";

interface Alert {
  id: string;
  location: string;
  species: string;
  biteChance: number;
  condition: string;
  status: "active" | "triggered" | "dismissed";
  time: string;
}

const mockAlerts: Alert[] = [
  { id: "1", location: "Jezioro Śniardwy", species: "pike",       biteChance: 85, condition: "Doskonałe", status: "active",    time: "2024-06-15 05:30" },
  { id: "2", location: "Wisła (Warszawa)",  species: "catfish",   biteChance: 72, condition: "Dobre",      status: "triggered", time: "2024-06-15 04:00" },
  { id: "3", location: "Jezioro Wigry",    species: "vendace",   biteChance: 91, condition: "Doskonałe", status: "active",    time: "2024-06-15 05:00" },
  { id: "4", location: "Zalew Soliński",   species: "pikeperch", biteChance: 78, condition: "Dobre",      status: "triggered", time: "2024-06-14 18:00" },
  { id: "5", location: "Odra (Wrocław)",   species: "asp",       biteChance: 55, condition: "Umiarkowane", status: "dismissed", time: "2024-06-14 06:00" },
  { id: "6", location: "Jezioro Mamry",    species: "pikeperch", biteChance: 83, condition: "Doskonałe", status: "active",    time: "2024-06-15 06:00" },
  { id: "7", location: "Jezioro Łebsko",    species: "perch",     biteChance: 68, condition: "Dobre",      status: "triggered", time: "2024-06-14 07:30" },
  { id: "8", location: "Warta (Poznań)",   species: "pike",      biteChance: 48, condition: "Słabe",      status: "dismissed", time: "2024-06-13 08:00" },
];

function getStatusBadge(status: string, t: ReturnType<typeof useTranslations<"alerts">>) {
  switch (status) {
    case "active":
      return <Badge variant="secondary"><BellRing className="mr-1 size-3" />{t("statusLabels.active")}</Badge>;
    case "triggered":
      return <Badge><Bell className="mr-1 size-3" />{t("statusLabels.triggered")}</Badge>;
    case "dismissed":
      return <Badge variant="outline"><BellOff className="mr-1 size-3" />{t("statusLabels.dismissed")}</Badge>;
    default:
      return null;
  }
}

export function AlertyPage() {
  const t = useTranslations("alerts");
  const [tab, setTab] = useState("active");

  // Map condition keys to i18n: stored as Polish condition labels → map to keys
  function getConditionLabel(condition: string): string {
    if (condition === "Doskonałe" || condition === "Excellent") return t("conditions.excellent");
    if (condition === "Dobre" || condition === "Good") return t("conditions.good");
    if (condition === "Umiarkowane" || condition === "Moderate") return t("conditions.moderate");
    if (condition === "Słabe" || condition === "Poor") return t("conditions.poor");
    return condition;
  }

  const filtered = mockAlerts.filter((a) => {
    if (tab === "active") return a.status === "active";
    if (tab === "triggered") return a.status === "triggered";
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
          <p className="mt-1 text-muted-foreground">{t("description")}</p>
        </div>
        <Button className="gap-2">
          <Plus data-icon="inline-start" />
          {t("newAlert")}
        </Button>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("activeAlerts")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <BellRing className="size-5 text-primary" />
              <span className="text-3xl font-bold">3</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("table.triggered")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Bell className="size-5 text-amber-500" />
              <span className="text-3xl font-bold">3</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {t("history")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Clock className="size-5 text-muted-foreground" />
              <span className="text-3xl font-bold">8</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs & Alerts */}
      <Card className="mt-8">
        <CardHeader className="pb-4">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="active">{t("activeAlerts")}</TabsTrigger>
              <TabsTrigger value="triggered">{t("table.triggered")}</TabsTrigger>
              <TabsTrigger value="all">{t("history")}</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <BellOff className="mb-4 size-12 text-muted-foreground/40" />
              <h3 className="font-semibold">{t("empty.title")}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t("empty.description")}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b text-left text-sm text-muted-foreground">
                    <th className="pb-3 font-medium">{t("table.location")}</th>
                    <th className="pb-3 font-medium">{t("table.species")}</th>
                    <th className="pb-3 font-medium">{t("table.biteChance")}</th>
                    <th className="pb-3 font-medium">{t("table.condition")}</th>
                    <th className="pb-3 font-medium">{t("table.time")}</th>
                    <th className="pb-3 font-medium">{t("table.status")}</th>
                    <th className="pb-3 font-medium" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((alert) => (
                    <tr key={alert.id} className="border-b text-sm last:border-0">
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <MapPin className="size-4 text-muted-foreground" />
                          {alert.location}
                        </div>
                      </td>
                      <td className="py-3">{t(`species.${alert.species}`)}</td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-primary transition-all"
                              style={{ width: `${alert.biteChance}%` }}
                            />
                          </div>
                          <span>{alert.biteChance}%</span>
                        </div>
                      </td>
                      <td className="py-3">{getConditionLabel(alert.condition)}</td>
                      <td className="py-3 text-muted-foreground">{alert.time}</td>
                      <td className="py-3">{getStatusBadge(alert.status, t)}</td>
                      <td className="py-3">
                        <Button variant="ghost" size="icon" className="size-8">
                          <Trash2 className="size-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
