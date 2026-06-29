import type { CollectionConfig } from "payload";

export const PZWZones: CollectionConfig = {
  slug: "pzw-zones",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "region"],
    group: "Dane Wędkarskie",
    description: "Strefy i okręgi PZW (Polskiego Związku Wędkarskiego).",
  },
  access: {
    create: ({ req: { user } }) => user?.role === "admin" || user?.role === "editor",
    read: () => true,
    update: ({ req: { user } }) => user?.role === "admin" || user?.role === "editor",
    delete: ({ req: { user } }) => user?.role === "admin",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: {
        pl: "Nazwa okręgu / strefy",
        en: "Zone / District name",
      },
    },
    {
      name: "region",
      type: "text",
      required: true,
      label: {
        pl: "Region",
        en: "Region",
      },
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "rules",
      type: "richText",
      localized: true,
      label: {
        pl: "Zasady wędkowania",
        en: "Fishing rules",
      },
    },
    {
      name: "permitsRequired",
      type: "text",
      localized: true,
      label: {
        pl: "Wymagane zezwolenia",
        en: "Required permits",
      },
      admin: {
        description: "np. 'Zezwolenie PZW Okręg Mazowiecki, Wody Nizinne'",
      },
    },
  ],
  timestamps: true,
};
