import type { CollectionConfig } from "payload";

export const Alerts: CollectionConfig = {
  slug: "alerts",
  admin: {
    useAsTitle: "location",
    defaultColumns: ["location", "species", "biteChance", "status", "createdAt"],
    group: "Dane Wędkarskie",
  },
  access: {
    create: ({ req: { user } }) => Boolean(user),
    read: ({ req: { user } }) => {
      if (!user) return false;
      return { user: { equals: user?.id } };
    },
    update: ({ req: { user } }) => {
      if (!user) return false;
      return { user: { equals: user?.id } };
    },
    delete: ({ req: { user } }) => {
      if (!user) return false;
      return { user: { equals: user?.id } };
    },
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      admin: {
        position: "sidebar",
        readOnly: true,
      },
    },
    {
      name: "location",
      type: "relationship",
      relationTo: "water-bodies",
      required: true,
    },
    {
      name: "species",
      type: "relationship",
      relationTo: "fish-species",
      required: true,
    },
    {
      name: "biteChance",
      type: "number",
      min: 0,
      max: 100,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "status",
      type: "select",
      options: ["active", "triggered", "dismissed"],
      defaultValue: "active",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "threshold",
      type: "number",
      min: 0,
      max: 100,
      defaultValue: 60,
      label: "Minimalna szansa brania do wyzwolenia alertu",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "notifyByEmail",
      type: "checkbox",
      defaultValue: true,
      label: "Powiadomienia email",
    },
    {
      name: "notifyByPush",
      type: "checkbox",
      defaultValue: true,
      label: "Powiadomienia push",
    },
    {
      name: "triggeredAt",
      type: "date",
      admin: {
        readOnly: true,
        position: "sidebar",
      },
    },
  ],
  timestamps: true,
};
