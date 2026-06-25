"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/src/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Map,
  Bell,
  BookOpen,
  TrendingUp,
  ArrowRight,
  Fish,
  Star,
} from "lucide-react";

const featureIcons = {
  map: Map,
  alerts: Bell,
  rybopedia: BookOpen,
  forecast: TrendingUp,
} as const;

export function HomePage() {
  const t = useTranslations("home");

  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
        <video 
          className="absolute inset-0 h-full w-full object-cover opacity-50 pointer-events-none"
          autoPlay 
          loop 
          muted 
          playsInline
          src="/hero-video.mp4"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--primary)/8%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,var(--primary)/5%,transparent_50%)]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6">
              FISH.AIR Beta
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {t("hero.subtitle")}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/mapa">
                <Button size="lg" className="gap-2 text-base">
                  {t("hero.cta")}
                  <ArrowRight data-icon="inline-end" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="text-base"
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {t("hero.secondaryCta")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("features.title")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("features.description")}
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {(Object.keys(featureIcons) as Array<keyof typeof featureIcons>).map(
              (key) => {
                const Icon = featureIcons[key];
                const item = t.raw(`features.items.${key}`);
                return (
                  <Card key={key} className="group transition-shadow hover:shadow-lg">
                    <CardHeader>
                      <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon className="size-6" />
                      </div>
                      <CardTitle>{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-muted/30 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("reviews.title")}
            </h2>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {(
              t.raw("reviews.items") as Array<{
                name: string;
                role: string;
                text: string;
              }>
            ).map((review, index) => (
              <Card key={index} className="flex flex-col">
                <CardContent className="flex flex-1 flex-col pt-6">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-4 fill-primary text-primary"
                      />
                    ))}
                  </div>
                  <p className="flex-1 text-muted-foreground">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <Separator className="my-4" />
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {review.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{review.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {review.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t("team.title")}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t("team.description")}
            </p>
          </div>
          <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
            {/* Team Photo */}
            <div className="overflow-hidden rounded-3xl shadow-2xl border border-border/50 bg-muted">
              <img 
                src="/team.jpg" 
                alt="Our team with a catch" 
                className="h-full w-full object-cover max-h-[500px]"
              />
            </div>

            {/* Team Avatars */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-12">
              {(
                [
                  "sandra",
                  "wiktoria",
                  "olga",
                  "krzysztof",
                ] as const
              ).map((key) => {
                const member = t.raw(`team.members.${key}`);
                const initials = (member.name as string)
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("");
                return (
                  <div key={key} className="flex flex-col items-center text-center">
                    <Avatar className="mb-4 size-24 ring-2 ring-primary/10 ring-offset-2 ring-offset-background transition-all hover:ring-primary/30">
                      <AvatarFallback className="bg-primary/5 text-primary text-2xl font-bold">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold">{member.name}</h3>
                    {member.role && (
                      <p className="mt-1 text-sm text-muted-foreground">{member.role}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
            {t("cta.title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
            {t("cta.description")}
          </p>
          <div className="mt-10">
            <Link href="/mapa">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 text-base"
              >
                <Fish data-icon="inline-start" />
                {t("cta.button")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
