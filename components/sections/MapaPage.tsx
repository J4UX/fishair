"use client";

/**
 * MapaPage — map page shell.
 *
 * State lives here; PolandMap is a pure presentation component.
 * Data: fetched from the Payload REST API (/api/fishing-spots);
 *       falls back to MOCK_SPOTS during development.
 */

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  MapPin,
  Search,
  X,
  List,
  Thermometer,
  Wind,
  Gauge,
  Clock,
  Cloud,
  FileText,
} from "lucide-react";
import { PolandMap } from "@/components/map/PolandMap";
import type { FishingSpot } from "@/types/fishing-spots";

// ---------------------------------------------------------------------------
// Mock data — curated real coordinates for famous Polish fishing waters
// ---------------------------------------------------------------------------
const MOCK_SPOTS: FishingSpot[] = [
  {
    id: "1",
    name: "Jezioro Śniardwy",
    coordinates: { latitude: 53.7500, longitude: 21.7000 },
    waterBodyType: "lake",
    region: "Warmińsko-Mazurskie",
    biteChance: 87,
    environmentalData: { waterTemp: 18, airTemp: 22, pressure: 1013, windSpeed: 12, bestHours: "05:00 – 09:00" },
    species: ["Szczupak", "Okoń", "Sandacz", "Węgorz"],
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "2",
    name: "Jezioro Mamry",
    coordinates: { latitude: 54.1400, longitude: 21.7500 },
    waterBodyType: "lake",
    region: "Warmińsko-Mazurskie",
    biteChance: 75,
    environmentalData: { waterTemp: 17, airTemp: 21, pressure: 1015, windSpeed: 15, bestHours: "06:00 – 10:00" },
    species: ["Szczupak", "Okoń", "Sandacz", "Leszcz"],
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "3",
    name: "Wisła — Warszawa",
    coordinates: { latitude: 52.2297, longitude: 21.0122 },
    waterBodyType: "river",
    region: "Mazowieckie",
    biteChance: 62,
    environmentalData: { waterTemp: 16, airTemp: 23, pressure: 1012, windSpeed: 8, bestHours: "04:00 – 08:00" },
    species: ["Sum", "Sandacz", "Boleń", "Kleń"],
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "4",
    name: "Jezioro Wigry",
    coordinates: { latitude: 54.0300, longitude: 23.0800 },
    waterBodyType: "lake",
    region: "Podlaskie",
    biteChance: 91,
    environmentalData: { waterTemp: 16, airTemp: 20, pressure: 1014, windSpeed: 10, bestHours: "05:00 – 08:00" },
    species: ["Sielawa", "Sieja", "Szczupak", "Okoń"],
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "5",
    name: "Odra — Wrocław",
    coordinates: { latitude: 51.1079, longitude: 17.0385 },
    waterBodyType: "river",
    region: "Dolnośląskie",
    biteChance: 58,
    environmentalData: { waterTemp: 15, airTemp: 19, pressure: 1016, windSpeed: 14, bestHours: "06:00 – 10:00" },
    species: ["Boleń", "Sandacz", "Sum", "Szczupak"],
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "6",
    name: "Zalew Soliński",
    coordinates: { latitude: 49.3800, longitude: 22.4500 },
    waterBodyType: "reservoir",
    region: "Podkarpackie",
    biteChance: 82,
    environmentalData: { waterTemp: 19, airTemp: 24, pressure: 1011, windSpeed: 7, bestHours: "05:00 – 09:00" },
    species: ["Sandacz", "Szczupak", "Okoń", "Pstrąg"],
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "7",
    name: "Jezioro Łebsko",
    coordinates: { latitude: 54.7140, longitude: 17.4100 },
    waterBodyType: "lake",
    region: "Pomorskie",
    biteChance: 70,
    environmentalData: { waterTemp: 17, airTemp: 20, pressure: 1013, windSpeed: 18, bestHours: "04:00 – 08:00" },
    species: ["Szczupak", "Okoń", "Węgorz", "Leszcz"],
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "8",
    name: "Warta — Poznań",
    coordinates: { latitude: 52.4064, longitude: 16.9252 },
    waterBodyType: "river",
    region: "Wielkopolskie",
    biteChance: 55,
    environmentalData: { waterTemp: 14, airTemp: 18, pressure: 1017, windSpeed: 11, bestHours: "07:00 – 11:00" },
    species: ["Boleń", "Kleń", "Sum", "Szczupak"],
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "9",
    name: "Jezioro Gopło",
    coordinates: { latitude: 52.5700, longitude: 18.2500 },
    waterBodyType: "lake",
    region: "Kujawsko-Pomorskie",
    biteChance: 78,
    environmentalData: { waterTemp: 16, airTemp: 21, pressure: 1012, windSpeed: 9, bestHours: "05:00 – 09:00" },
    species: ["Szczupak", "Okoń", "Leszcz", "Karp"],
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "10",
    name: "Zbiornik Włocławski",
    coordinates: { latitude: 52.5800, longitude: 19.0700 },
    waterBodyType: "reservoir",
    region: "Kujawsko-Pomorskie",
    biteChance: 73,
    environmentalData: { waterTemp: 17, airTemp: 20, pressure: 1014, windSpeed: 13, bestHours: "06:00 – 10:00" },
    species: ["Sandacz", "Sum", "Szczupak", "Leszcz"],
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "11",
    name: "Jezioro Drawsko",
    coordinates: { latitude: 53.6500, longitude: 15.8200 },
    waterBodyType: "lake",
    region: "Zachodniopomorskie",
    biteChance: 80,
    environmentalData: { waterTemp: 18, airTemp: 21, pressure: 1015, windSpeed: 11, bestHours: "05:00 – 09:00" },
    species: ["Szczupak", "Sieja", "Okoń", "Węgorz"],
    createdAt: "",
    updatedAt: "",
  },
  {
    id: "12",
    name: "San — Przemyśl",
    coordinates: { latitude: 49.7839, longitude: 22.7677 },
    waterBodyType: "river",
    region: "Podkarpackie",
    biteChance: 68,
    environmentalData: { waterTemp: 14, airTemp: 18, pressure: 1018, windSpeed: 6, bestHours: "06:00 – 11:00" },
    species: ["Pstrąg", "Lipień", "Boleń", "Kleń"],
    createdAt: "",
    updatedAt: "",
  },
];

// ---------------------------------------------------------------------------
// Hook: live data from Payload, falls back to mock
// ---------------------------------------------------------------------------
function useFishingSpots() {
  const [spots, setSpots] = useState<FishingSpot[]>(MOCK_SPOTS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(
          "/api/fishing-spots?where[_status][equals]=published&limit=200&depth=0"
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: { docs: Record<string, unknown>[] } = await res.json();
        if (!cancelled && data.docs.length > 0) {
          const mapped: FishingSpot[] = data.docs.map((doc) => ({
            id: doc.id as string,
            name: (doc.name as string) ?? "",
            description: (doc.description as string) ?? null,
            coordinates: {
              latitude: (doc.coordinates as { latitude: number }).latitude,
              longitude: (doc.coordinates as { longitude: number }).longitude,
            },
            waterBodyType: doc.waterBodyType as FishingSpot["waterBodyType"],
            region: (doc.region as string) ?? null,
            biteChance: (doc.biteChance as number) ?? null,
            environmentalData: doc.environmentalData as FishingSpot["environmentalData"],
            pzwZone: (doc.pzwZone as any) ?? null,
            species: (doc.species as string[]) ?? [],
            createdAt: doc.createdAt as string,
            updatedAt: doc.updatedAt as string,
          }));
          setSpots(mapped);
        }
      } catch {
        // Payload not reachable — stick with rich mock data
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return { spots, loading };
}

// ---------------------------------------------------------------------------
// Colour and translation helpers
// ---------------------------------------------------------------------------
function getRegionName(region: string, t: ReturnType<typeof useTranslations<"mapa">>): string {
  const map: Record<string, string> = {
    "Warmińsko-Mazurskie": "warminskoMazurskie",
    "Mazowieckie": "mazowieckie",
    "Podlaskie": "podlaskie",
    "Dolnośląskie": "dolnoslaskie",
    "Podkarpackie": "podkarpackie",
    "Pomorskie": "pomorskie",
    "Wielkopolskie": "wielkopolskie",
    "Kujawsko-Pomorskie": "kujawskoPomorskie",
    "Zachodniopomorskie": "zachodniopomorskie"
  };
  const key = map[region];
  return key ? t(`regions.${key}` as never) : region;
}

function getSpeciesName(species: string, t: ReturnType<typeof useTranslations<"mapa">>): string {
  const map: Record<string, string> = {
    "Szczupak": "pike",
    "Okoń": "perch",
    "Sandacz": "pikeperch",
    "Węgorz": "eel",
    "Leszcz": "bream",
    "Sum": "catfish",
    "Boleń": "asp",
    "Kleń": "chub",
    "Sielawa": "vendace",
    "Sieja": "whitefish",
    "Pstrąg": "brownTrout",
    "Lipień": "grayling",
    "Karp": "carp"
  };
  const key = map[species];
  return key ? t(`species.${key}` as never) : species;
}

function getBiteColor(chance: number | null | undefined): string {
  if (chance == null) return "bg-muted-foreground";
  if (chance >= 80) return "bg-emerald-500";
  if (chance >= 60) return "bg-lime-500";
  if (chance >= 40) return "bg-amber-500";
  return "bg-red-400";
}

function getBiteLabel(
  chance: number | null | undefined,
  t: ReturnType<typeof useTranslations<"mapa">>
): string {
  if (chance == null) return "–";
  if (chance >= 80) return t("legend.excellent");
  if (chance >= 60) return t("legend.good");
  if (chance >= 40) return t("legend.moderate");
  return t("legend.poor");
}

// ---------------------------------------------------------------------------
// Sidebar list
// ---------------------------------------------------------------------------
function SpotList({
  spots,
  search,
  setSearch,
  selected,
  setSelected,
  loading,
  t,
}: {
  spots: FishingSpot[];
  search: string;
  setSearch: (v: string) => void;
  selected: FishingSpot | null;
  setSelected: (s: FishingSpot | null) => void;
  loading: boolean;
  t: ReturnType<typeof useTranslations<"mapa">>;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={`${t("filters.title")}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-1 px-2 pb-4">
          {loading &&
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg p-3">
                <Skeleton className="mt-0.5 size-8 shrink-0 rounded-md" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}

          {!loading &&
            spots.map((spot) => (
              <button
                key={spot.id}
                onClick={() => setSelected(spot)}
                className={`flex items-start gap-3 rounded-lg p-3 text-left transition-colors hover:bg-accent ${
                  selected?.id === spot.id ? "bg-accent" : ""
                }`}
              >
                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <MapPin className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  {/* Name on its own line — no badge competing for space */}
                  <p className="text-sm font-medium leading-snug">{spot.name}</p>
                  {/* Bite chance + region on the second line */}
                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <div className="flex items-center gap-1.5">
                      <div
                        className={`size-2 shrink-0 rounded-full ${getBiteColor(spot.biteChance)}`}
                      />
                      <span className="text-xs text-muted-foreground">
                        {spot.biteChance != null
                          ? `${spot.biteChance}% — ${getBiteLabel(spot.biteChance, t)}`
                          : "—"}
                      </span>
                    </div>
                    {spot.region && (
                      <Badge variant="secondary" className="text-xs">
                        {getRegionName(spot.region, t)}
                      </Badge>
                    )}
                  </div>
                </div>
              </button>
            ))}

          {!loading && spots.length === 0 && (
            <p className="p-4 text-center text-sm text-muted-foreground">
              {t("map.noSpotsFound")}
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Hook: fetch real-time conditions
// ---------------------------------------------------------------------------
function useLiveConditions(spot: FishingSpot | null) {
  const [liveData, setLiveData] = useState<{
    weather: any;
    speciesChances: Record<string, number>;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!spot) {
      setLiveData(null);
      return;
    }
    
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const speciesQuery = (spot.species ?? []).join(",");
        const res = await fetch(
          `/api/fishing-conditions?lat=${spot.coordinates.latitude}&lng=${spot.coordinates.longitude}&species=${speciesQuery}`
        );
        if (!res.ok) throw new Error("Failed to fetch live conditions");
        const data = await res.json();
        if (!cancelled) setLiveData(data);
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [spot]);

  return { liveData, loadingLive: loading };
}

// ---------------------------------------------------------------------------
// Detail panel content
// ---------------------------------------------------------------------------
function DetailContent({
  spot,
  t,
  liveData,
  loadingLive,
}: {
  spot: FishingSpot;
  t: ReturnType<typeof useTranslations<"mapa">>;
  liveData: any;
  loadingLive: boolean;
}) {
  const env = liveData?.weather || spot.environmentalData;
  const speciesArr = spot.species ?? [];
  const pzwZone = spot.pzwZone;

  return (
    <>
      {loadingLive && (
        <div className="mb-4 flex items-center justify-center p-4">
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            <span className="text-xs">{t("detail.loadingConditions")}</span>
          </div>
        </div>
      )}

      {pzwZone && (
        <div className="mb-4 rounded-lg bg-muted/50 p-3">
          <p className="text-xs font-semibold text-primary">{t("detail.pzwZone")}</p>
          <p className="mt-0.5 text-sm font-medium">{pzwZone.name}</p>
          {pzwZone.permitsRequired && (
            <p className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
              <FileText className="mt-0.5 size-3 shrink-0" />
              <span>{pzwZone.permitsRequired}</span>
            </p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-2">
        {env?.waterTemp != null && (
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Thermometer className="size-3" />
              {t("detail.waterTemp")}
            </span>
            <span className="text-sm">{Math.round(env.waterTemp)}°C</span>
          </div>
        )}
        {env?.airTemp != null && (
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Thermometer className="size-3" />
              {t("detail.airTemp")}
            </span>
            <span className="text-sm">{Math.round(env.airTemp)}°C</span>
          </div>
        )}
        {env?.pressure != null && (
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Gauge className="size-3" />
              {t("detail.pressure")}
            </span>
            <span className="text-sm">{Math.round(env.pressure)} hPa</span>
          </div>
        )}
        {env?.windSpeed != null && (
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Wind className="size-3" />
              {t("detail.wind")}
            </span>
            <span className="text-sm">{Math.round(env.windSpeed)} km/h</span>
          </div>
        )}
        {env?.cloudCover != null && (
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Cloud className="size-3" />
              {t("detail.cloudCover")}
            </span>
            <span className="text-sm">{Math.round(env.cloudCover)}%</span>
          </div>
        )}
      </div>

      {speciesArr.length > 0 && (
        <>
          <Separator className="my-3" />
          <p className="text-xs font-medium text-muted-foreground">
            {t("detail.realtimeBiteChance")}:
          </p>
          <div className="mt-2 flex flex-col gap-2.5">
            {speciesArr.map((s) => {
              const chance = liveData?.speciesChances?.[s] ?? spot.biteChance ?? 50;
              return (
                <div key={s} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">{getSpeciesName(s, t)}</span>
                    <span className="font-semibold">{Math.round(chance)}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className={`h-full transition-all duration-1000 ${getBiteColor(chance)}`}
                      style={{ width: `${Math.max(5, chance)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// MapaPage — root export
// ---------------------------------------------------------------------------
export function MapaPage() {
  const t = useTranslations("mapa");
  const { spots, loading } = useFishingSpots();

  const [selected, setSelected] = useState<FishingSpot | null>(null);
  const { liveData, loadingLive } = useLiveConditions(selected);
  const [search, setSearch] = useState("");
  const [listOpen, setListOpen] = useState(false);

  const filtered = spots.filter((s) =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-[calc(100dvh-4rem)] flex-col">
      {/* Page header */}
      <div className="border-b bg-background px-4 py-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold tracking-tight">{t("title")}</h1>
          <p className="text-muted-foreground">{t("description")}</p>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Desktop sidebar ─────────────────────────────────────────── */}
        <div className="hidden w-80 flex-shrink-0 flex-col border-r bg-background lg:flex">
          <SpotList
            spots={filtered}
            search={search}
            setSearch={setSearch}
            selected={selected}
            setSelected={setSelected}
            loading={loading}
            t={t}
          />
        </div>

        {/* ── Map area ────────────────────────────────────────────────── */}
        <div className="relative flex-1 p-2 sm:p-3">
          {/* Mobile list toggle */}
          <div className="absolute left-5 top-5 z-20 lg:hidden">
            <Sheet open={listOpen} onOpenChange={setListOpen}>
              <SheetTrigger
                render={
                  <Button variant="secondary" size="sm" className="gap-2 shadow-md">
                    <List data-icon="inline-start" />
                    {t("filters.title")}
                  </Button>
                }
              />
              <SheetContent side="left" className="w-[300px] p-0">
                <SheetHeader className="px-4 pt-4">
                  <SheetTitle>{t("title")}</SheetTitle>
                </SheetHeader>
                <SpotList
                  spots={filtered}
                  search={search}
                  setSearch={setSearch}
                  selected={selected}
                  setSelected={(s) => {
                    setSelected(s);
                    setListOpen(false);
                  }}
                  loading={loading}
                  t={t}
                />
              </SheetContent>
            </Sheet>
          </div>

          {/* ── Real interactive Poland map ──────────────────────────── */}
          <PolandMap
            spots={spots}
            selectedSpotId={selected?.id ?? null}
            onSpotSelect={(spot) => setSelected(spot)}
          />

          {/* ── Legend — hidden on mobile when detail panel is open ── */}
          <div
            className={`absolute bottom-6 left-5 rounded-lg border bg-background/95 p-3 shadow-md backdrop-blur transition-opacity ${
              selected ? "pointer-events-none opacity-0 sm:pointer-events-auto sm:opacity-100" : "opacity-100"
            }`}
          >
            <p className="mb-2 text-xs font-semibold">{t("legend.title")}</p>
            <div className="flex flex-col gap-1.5">
              {[
                { color: "bg-emerald-500", label: t("legend.excellent") },
                { color: "bg-lime-500",    label: t("legend.good") },
                { color: "bg-amber-500",   label: t("legend.moderate") },
                { color: "bg-red-400",     label: t("legend.poor") },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className={`size-3 rounded-full ${color}`} />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Desktop detail panel ─────────────────────────────────── */}
          {selected && (
            <>
              <div className="absolute right-5 top-5 z-30 hidden w-72 rounded-lg border bg-background/95 p-4 shadow-lg backdrop-blur sm:block">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold leading-tight">{selected.name}</h3>
                  <div className="flex shrink-0 items-center gap-1">
                    {selected.waterBodyType && (
                      <Badge variant="secondary" className="text-xs">
                        {t(`legend.${selected.waterBodyType}` as never)}
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="-mr-1 size-6"
                      onClick={() => setSelected(null)}
                    >
                      <X className="size-3" />
                    </Button>
                  </div>
                </div>
                {selected.region && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {getRegionName(selected.region, t)}
                  </p>
                )}
                <Separator className="my-3" />
                <DetailContent spot={selected} t={t} liveData={liveData} loadingLive={loadingLive} />
              </div>

              {/* Mobile bottom panel — scrollable, capped at ~55% viewport */}
              <div className="absolute inset-x-0 bottom-0 z-30 flex max-h-[55dvh] flex-col rounded-t-2xl border-t bg-background/98 shadow-xl backdrop-blur-md sm:hidden">
                {/* Drag handle */}
                <div className="flex shrink-0 justify-center pb-1 pt-3">
                  <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
                </div>
                {/* Header row — always visible */}
                <div className="flex shrink-0 items-start justify-between px-4 pb-2">
                  <div>
                    <h3 className="font-semibold leading-tight">{selected.name}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      {selected.waterBodyType && (
                        <Badge variant="secondary" className="text-xs">
                          {t(`legend.${selected.waterBodyType}` as never)}
                        </Badge>
                      )}
                      {selected.region && (
                        <span className="text-xs text-muted-foreground">
                          {getRegionName(selected.region, t)}
                        </span>
                      )}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0 size-8"
                    onClick={() => setSelected(null)}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
                {/* Scrollable content */}
                <div className="overflow-y-auto px-4 pb-6">
                  <Separator className="mb-3" />
                  <DetailContent spot={selected} t={t} liveData={liveData} loadingLive={loadingLive} />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
