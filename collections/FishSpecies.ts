import type { CollectionConfig } from "payload";
import { slugField } from "payload";

export const FishSpecies: CollectionConfig = {
  slug: "fish-species",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "latinName", "category", "difficulty", "_status"],
    group: "Dane Wędkarskie",
  },
  versions: {
    drafts: true,
  },
  access: {
    create: ({ req: { user } }) => user?.role === "admin" || user?.role === "editor",
    read: ({ req: { user } }) => {
      if (!user) return { _status: { equals: "published" } };
      return true;
    },
    update: ({ req: { user } }) => user?.role === "admin" || user?.role === "editor",
    delete: ({ req: { user } }) => user?.role === "admin",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "latinName",
      type: "text",
      required: true,
      label: "Nazwa łacińska",
    },
    slugField({ useAsSlug: "name" }),
    {
      name: "category",
      type: "select",
      options: ["predatory", "cyprinid", "salmonid", "marine"],
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "difficulty",
      type: "select",
      options: ["easy", "medium", "hard", "very_hard"],
      defaultValue: "medium",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "overview",
      type: "richText",
      localized: true,
      label: "Przegląd",
    },
    {
      name: "habitat",
      type: "richText",
      localized: true,
      label: "Siedlisko",
    },
    {
      name: "behavior",
      type: "richText",
      localized: true,
      label: "Zachowanie",
    },
    {
      name: "fishingTechniques",
      type: "richText",
      localized: true,
      label: "Techniki połowu",
    },
    {
      name: "diet",
      type: "textarea",
      localized: true,
      label: "Dieta",
    },
    {
      name: "avgSize",
      type: "text",
      label: "Średni rozmiar",
    },
    {
      name: "maxWeight",
      type: "text",
      label: "Maksymalna waga",
    },
    {
      name: "appearance",
      type: "textarea",
      localized: true,
      label: "Wygląd",
    },
    {
      name: "spawning",
      type: "textarea",
      localized: true,
      label: "Tarło",
    },
    {
      name: "season",
      type: "textarea",
      localized: true,
      label: "Sezon i okres ochronny",
    },
    {
      name: "bestBait",
      type: "text",
      localized: true,
      label: "Najlepsza przynęta",
    },
    {
      name: "bestTime",
      type: "text",
      localized: true,
      label: "Najlepszy czas połowu",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
  ],
  timestamps: true,
};
