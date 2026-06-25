"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Search,
  Fish,
  Ruler,
  Scale,
  Utensils,
  Clock,
} from "lucide-react";

// Locale-neutral metadata — only latin name and category key are hardcoded.
// All display content comes from rybopedia.fish.<key> in the translation files.
const FISH_META = [
  { id: "1", latinName: "Esox lucius",       category: "predatory" as const, key: "pike"       },
  { id: "2", latinName: "Perca fluviatilis", category: "predatory" as const, key: "perch"      },
  { id: "3", latinName: "Sander lucioperca", category: "predatory" as const, key: "pikeperch"  },
  { id: "4", latinName: "Cyprinus carpio",   category: "cyprinid"  as const, key: "carp"       },
  { id: "5", latinName: "Salmo trutta",      category: "salmonid"  as const, key: "brownTrout" },
  { id: "6", latinName: "Silurus glanis",    category: "predatory" as const, key: "catfish"    },
  { id: "7", latinName: "Rutilus rutilus",   category: "cyprinid"  as const, key: "roach"      },
  { id: "8", latinName: "Anguilla anguilla", category: "predatory" as const, key: "eel"        },
] as const;

type FishKey = typeof FISH_META[number]["key"];
type Category = typeof FISH_META[number]["category"];

interface FishContent {
  name: string;
  overview: string;
  habitat: string;
  behavior: string;
  fishing: string;
  season: string;
  diet: string;
  avgSize: string;
  maxWeight: string;
  appearance: string;
  spawning: string;
  bestBait: string;
  bestTime: string;
  difficulty: string; // key: "easy" | "medium" | "hard" | "veryHard"
}

interface FishSpecies extends FishContent {
  id: string;
  latinName: string;
  category: Category;
  key: FishKey;
}

const categoryKeys = ["predatory", "cyprinid", "salmonid", "marine"] as const;

export function RybopediaPage() {
  const t = useTranslations("rybopedia");
  const [search, setSearch]     = useState("");
  const [selected, setSelected] = useState<FishSpecies | null>(null);
  const [category, setCategory] = useState<string>("all");

  // Build the fish list from translation data each render (cheap — 8 items)
  const fishData: FishSpecies[] = FISH_META.map((meta) => ({
    ...meta,
    ...(t.raw(`fish.${meta.key}`) as FishContent),
  }));

  const filtered = fishData.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.latinName.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || f.category === category;
    return matchesSearch && matchesCategory;
  });

  if (selected) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <button
          onClick={() => setSelected(null)}
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
        >
          &larr; {t("backToList")}
        </button>
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{selected.name}</h1>
          <p className="italic text-muted-foreground">{selected.latinName}</p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader><CardTitle>{t("detail.overview")}</CardTitle></CardHeader>
            <CardContent><p className="text-muted-foreground">{selected.overview}</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>{t("detail.habitat")}</CardTitle></CardHeader>
            <CardContent><p className="text-muted-foreground">{selected.habitat}</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>{t("detail.behavior")}</CardTitle></CardHeader>
            <CardContent><p className="text-muted-foreground">{selected.behavior}</p></CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>{t("detail.fishing")}</CardTitle></CardHeader>
            <CardContent><p className="text-muted-foreground">{selected.fishing}</p></CardContent>
          </Card>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg border p-4 text-center">
            <Ruler className="mx-auto mb-1 size-5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">{t("detail.size")}</p>
            <p className="font-semibold text-sm">{selected.avgSize}</p>
          </div>
          <div className="rounded-lg border p-4 text-center">
            <Scale className="mx-auto mb-1 size-5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">{t("detail.weight")}</p>
            <p className="font-semibold text-sm">{selected.maxWeight}</p>
          </div>
          <div className="rounded-lg border p-4 text-center">
            <Utensils className="mx-auto mb-1 size-5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">{t("detail.bestBait")}</p>
            <p className="font-semibold text-sm">{selected.bestBait}</p>
          </div>
          <div className="rounded-lg border p-4 text-center">
            <Clock className="mx-auto mb-1 size-5 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">{t("detail.bestTime")}</p>
            <p className="font-semibold text-sm">{selected.bestTime}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      {/* Search & Filter */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={t("search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {(["all", ...categoryKeys] as const).map((cat) => (
            <Badge
              key={cat}
              variant={category === cat ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setCategory(cat)}
            >
              {t(`categories.${cat}`)}
            </Badge>
          ))}
        </div>
      </div>

      {/* Fish Grid */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((fish) => (
          <Card
            key={fish.id}
            className="cursor-pointer transition-shadow hover:shadow-lg"
            onClick={() => setSelected(fish)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{fish.name}</CardTitle>
                  <CardDescription className="italic">{fish.latinName}</CardDescription>
                </div>
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                  <Fish className="size-5 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="line-clamp-3 text-sm text-muted-foreground">
                {fish.overview}
              </p>
              <div className="mt-4 flex flex-wrap gap-1">
                <Badge variant="secondary" className="text-xs">
                  {t(`categories.${fish.category}`)}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {t(`difficulty.${fish.difficulty}`)}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Fish className="mb-4 size-16 text-muted-foreground/30" />
          <h3 className="font-semibold">{t("noResults.title")}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("noResults.description")}
          </p>
        </div>
      )}
    </div>
  );
}
