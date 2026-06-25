import type { CollectionConfig } from "payload";

export const WaterBodies: CollectionConfig = {
  slug: "water-bodies",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "type", "region", "biteChance", "_status"],
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
      name: "type",
      type: "select",
      options: ["lake", "river", "reservoir"],
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "region",
      type: "text",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "coordinates",
      type: "group",
      fields: [
        { name: "lat", type: "number", required: true },
        { name: "lng", type: "number", required: true },
      ],
    },
    {
      name: "biteChance",
      type: "number",
      min: 0,
      max: 100,
      admin: {
        position: "sidebar",
        description: "Procentowa szansa na branie (0-100)",
      },
    },
    {
      name: "waterTemp",
      type: "number",
    },
    {
      name: "airTemp",
      type: "number",
    },
    {
      name: "pressure",
      type: "number",
      label: "Ciśnienie atmosferyczne (hPa)",
    },
    {
      name: "windSpeed",
      type: "number",
      label: "Prędkość wiatru (km/h)",
    },
    {
      name: "bestHours",
      type: "text",
      label: "Najlepsze godziny połowu",
    },
    {
      name: "species",
      type: "relationship",
      relationTo: "fish-species",
      hasMany: true,
    },
    {
      name: "description",
      type: "richText",
      localized: true,
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "regulations",
      type: "textarea",
      localized: true,
      label: "Przepisy i regulamin",
    },
  ],
  timestamps: true,
};
