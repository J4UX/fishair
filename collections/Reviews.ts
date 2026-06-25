import type { CollectionConfig } from "payload";

export const Reviews: CollectionConfig = {
  slug: "reviews",
  admin: {
    useAsTitle: "authorName",
    defaultColumns: ["authorName", "rating", "_status", "createdAt"],
    group: "Treści Strony",
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
      name: "authorName",
      type: "text",
      required: true,
    },
    {
      name: "authorRole",
      type: "text",
      localized: true,
      label: "Rola/opis autora",
    },
    {
      name: "content",
      type: "textarea",
      required: true,
      localized: true,
      label: "Treść recenzji",
    },
    {
      name: "rating",
      type: "number",
      min: 1,
      max: 5,
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
    },
  ],
  timestamps: true,
  defaultSort: "-rating",
};
