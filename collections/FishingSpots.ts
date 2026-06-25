import type { CollectionConfig } from "payload";

/**
 * FishingSpots collection — stores individual fishing locations (visplekken)
 * with geographic coordinates that are rendered as map markers.
 *
 * Key design decisions:
 * - `coordinates` group holds separate `latitude` / `longitude` Number fields
 *   for maximum CMS editability and explicit labelling in the admin UI.
 * - Coordinates are required — a spot without a location is meaningless on the map.
 * - `name` and `description` are localized (pl/en) per the project i18n rules.
 * - `biteChance` lives in the sidebar for quick at-a-glance editing.
 * - Drafts are enabled so editors can prepare entries before publishing.
 */
export const FishingSpots: CollectionConfig = {
  slug: "fishing-spots",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "waterBodyType", "region", "biteChance", "_status"],
    group: "Dane Wędkarskie",
    description: "Visplekken die als stippen op de interactieve kaart verschijnen.",
  },
  versions: {
    drafts: true,
  },
  access: {
    create: ({ req: { user } }) =>
      user?.role === "admin" || user?.role === "editor",
    read: ({ req: { user } }) => {
      if (!user) return { _status: { equals: "published" } };
      return true;
    },
    update: ({ req: { user } }) =>
      user?.role === "admin" || user?.role === "editor",
    delete: ({ req: { user } }) => user?.role === "admin",
  },
  fields: [
    // -------------------------------------------------------------------------
    // Main area — editorial content
    // -------------------------------------------------------------------------
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
      label: {
        pl: "Nazwa lokalizacji",
        en: "Location name",
      },
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
      label: {
        pl: "Opis / szanse połowu",
        en: "Description / fishing opportunities",
      },
      admin: {
        description: "Krótki opis łowiska i typowych szans na branie.",
      },
    },

    // -------------------------------------------------------------------------
    // Coordinates group — the heart of the map feature
    // -------------------------------------------------------------------------
    {
      name: "coordinates",
      type: "group",
      label: {
        pl: "Współrzędne geograficzne",
        en: "Geographic Coordinates",
      },
      admin: {
        description:
          "Wpisz dokładne współrzędne. Możesz je skopiować z Google Maps (prawy przycisk myszy → 'Co tutaj jest?').",
      },
      fields: [
        {
          name: "latitude",
          type: "number",
          required: true,
          min: 49.0,
          max: 55.0,
          label: {
            pl: "Szerokość geograficzna (φ)",
            en: "Latitude (φ)",
          },
          admin: {
            description: "Zakres dla Polski: 49.0 – 55.0 (np. 52.2297 dla Warszawy)",
            step: 0.000001,
          },
        },
        {
          name: "longitude",
          type: "number",
          required: true,
          min: 14.0,
          max: 24.15,
          label: {
            pl: "Długość geograficzna (λ)",
            en: "Longitude (λ)",
          },
          admin: {
            description: "Zakres dla Polski: 14.0 – 24.15 (np. 21.0122 dla Warszawy)",
            step: 0.000001,
          },
        },
      ],
    },

    // -------------------------------------------------------------------------
    // Sidebar — quick-glance classification & live data
    // -------------------------------------------------------------------------
    {
      name: "waterBodyType",
      type: "select",
      required: true,
      options: [
        { label: { pl: "Jezioro", en: "Lake" }, value: "lake" },
        { label: { pl: "Rzeka", en: "River" }, value: "river" },
        { label: { pl: "Zalew / Zbiornik", en: "Reservoir" }, value: "reservoir" },
      ],
      label: {
        pl: "Typ akwenu",
        en: "Water body type",
      },
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "region",
      type: "text",
      label: {
        pl: "Województwo / Region",
        en: "Voivodeship / Region",
      },
      admin: {
        position: "sidebar",
        description: "np. Warmińsko-Mazurskie",
      },
    },
    {
      name: "biteChance",
      type: "number",
      min: 0,
      max: 100,
      label: {
        pl: "Szansa na branie (%)",
        en: "Bite chance (%)",
      },
      admin: {
        position: "sidebar",
        description: "Procentowa szansa na branie (0–100). Aktualizowana automatycznie.",
        step: 1,
      },
    },

    // -------------------------------------------------------------------------
    // Environmental data — populated by weather jobs
    // -------------------------------------------------------------------------
    {
      name: "environmentalData",
      type: "group",
      label: {
        pl: "Dane środowiskowe",
        en: "Environmental data",
      },
      admin: {
        description:
          "Pola te są zazwyczaj aktualizowane automatycznie przez zadania pogodowe.",
      },
      fields: [
        {
          name: "waterTemp",
          type: "number",
          label: { pl: "Temperatura wody (°C)", en: "Water temperature (°C)" },
        },
        {
          name: "airTemp",
          type: "number",
          label: { pl: "Temperatura powietrza (°C)", en: "Air temperature (°C)" },
        },
        {
          name: "pressure",
          type: "number",
          label: { pl: "Ciśnienie atmosferyczne (hPa)", en: "Atmospheric pressure (hPa)" },
        },
        {
          name: "windSpeed",
          type: "number",
          label: { pl: "Prędkość wiatru (km/h)", en: "Wind speed (km/h)" },
        },
        {
          name: "bestHours",
          type: "text",
          label: { pl: "Najlepsze godziny połowu", en: "Best fishing hours" },
          admin: {
            description: 'np. "05:00 – 09:00"',
          },
        },
      ],
    },

    // -------------------------------------------------------------------------
    // Relationships
    // -------------------------------------------------------------------------
    {
      name: "species",
      type: "relationship",
      relationTo: "fish-species",
      hasMany: true,
      label: {
        pl: "Dostępne gatunki ryb",
        en: "Available fish species",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: {
        pl: "Zdjęcie łowiska",
        en: "Spot photo",
      },
    },
  ],
  timestamps: true,
};
