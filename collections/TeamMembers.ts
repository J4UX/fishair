import type { CollectionConfig } from "payload";

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "order"],
    group: "Treści Strony",
  },
  access: {
    create: ({ req: { user } }) => user?.role === "admin",
    read: () => true,
    update: ({ req: { user } }) => user?.role === "admin",
    delete: ({ req: { user } }) => user?.role === "admin",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "text",
      required: true,
      localized: true,
      label: "Stanowisko",
    },
    {
      name: "bio",
      type: "textarea",
      localized: true,
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "order",
      type: "number",
      admin: {
        position: "sidebar",
        description: "Kolejność wyświetlania (niższa = wcześniej)",
      },
    },
  ],
  timestamps: true,
  defaultSort: "order",
};
