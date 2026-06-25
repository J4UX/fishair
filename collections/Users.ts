import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    tokenExpiration: 7200,
    verify: true,
    maxLoginAttempts: 5,
    lockTime: 600 * 1000,
  },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "email", "role", "createdAt"],
    group: "Administracja",
  },
  versions: {
    drafts: false,
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => {
      if (user?.role === "admin") return true;
      return { id: { equals: user?.id } };
    },
    update: ({ req: { user } }) => {
      if (user?.role === "admin") return true;
      return { id: { equals: user?.id } };
    },
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
      type: "select",
      options: ["user", "editor", "admin"],
      defaultValue: "user",
      required: true,
      saveToJWT: true,
      admin: {
        position: "sidebar",
      },
      access: {
        update: ({ req: { user } }) => user?.role === "admin",
      },
    },
    {
      name: "experience",
      type: "select",
      options: ["beginner", "intermediate", "advanced", "expert"],
      defaultValue: "beginner",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "location",
      type: "text",
    },
    {
      name: "preferredSpecies",
      type: "relationship",
      relationTo: "fish-species",
      hasMany: true,
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
    },
  ],
  timestamps: true,
};
