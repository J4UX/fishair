"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Fish,
  Trophy,
  Target,
  Star,
  Edit3,
} from "lucide-react";

export function ProfilPage() {
  const t = useTranslations("profile");

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary via-primary/80 to-primary/60" />
        <div className="relative px-6 pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="-mt-12 flex items-end gap-4">
              <Avatar className="size-24 border-4 border-background shadow-md">
                <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                  JK
                </AvatarFallback>
              </Avatar>
              <div className="mb-1">
                <h1 className="text-2xl font-bold">Jan Kowalski</h1>
                <p className="text-muted-foreground">{t("profileSubtitle")}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Edit3 data-icon="inline-start" />
              {t("editProfile")}
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: t("stats.totalCatches"), value: "247", icon: Fish },
          { label: t("stats.speciesCount"), value: "18", icon: Target },
          { label: t("stats.biggestCatch"), value: "12,4 kg", icon: Trophy },
          { label: t("stats.favoriteSpot"), value: "Śniardwy", icon: Star },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex flex-col items-center gap-1 pt-6 text-center">
              <stat.icon className="size-5 text-primary" />
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="info" className="mt-8">
        <TabsList>
          <TabsTrigger value="info">{t("personalInfo")}</TabsTrigger>
          <TabsTrigger value="preferences">{t("fishingPreferences")}</TabsTrigger>
          <TabsTrigger value="settings">{t("settings")}</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("personalInfo")}</CardTitle>
              <CardDescription>{t("personalInfoDescription")}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">{t("fields.name")}</label>
                  <Input value="Jan Kowalski" readOnly />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">{t("fields.email")}</label>
                  <Input value="jan.kowalski@email.pl" readOnly />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">{t("fields.phone")}</label>
                  <Input value="+48 123 456 789" readOnly />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium">{t("fields.location")}</label>
                  <Input value="Warszawa, Mazowieckie" readOnly />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium">{t("fields.experience")}</label>
                <Input value={t("experience.intermediate")} readOnly />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("fishingPreferences")}</CardTitle>
              <CardDescription>
                {t("preferencesDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">{t("fields.preferredSpecies")}</label>
                <div className="flex flex-wrap gap-2">
                  {(t.raw("preferredSpecies") as string[]).map((s) => (
                    <Badge key={s} variant="secondary">{s}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">{t("fields.preferredWaterType")}</label>
                <div className="flex flex-wrap gap-2">
                  {(t.raw("preferredWaterTypes") as string[]).map((w) => (
                    <Badge key={w} variant="outline">{w}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>{t("settings")}</CardTitle>
              <CardDescription>
                {t("settingsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">{t("fields.notifications")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("notificationsDescription")}
                  </p>
                </div>
                <Badge variant="secondary">{t("notificationsEnabled")}</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div>
                  <p className="font-medium">{t("fields.language")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("languageDescription")}
                  </p>
                </div>
                <Badge variant="secondary">Polski</Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between rounded-lg border border-destructive/20 bg-destructive/5 p-4">
                <div>
                  <p className="font-medium text-destructive">{t("deleteAccount")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("deleteAccountDescription")}
                  </p>
                </div>
                <Button variant="destructive" size="sm">{t("delete")}</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
