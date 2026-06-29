import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { fileURLToPath } from "url";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { WaterBodies } from "./collections/WaterBodies";
import { Alerts } from "./collections/Alerts";
import { FishSpecies } from "./collections/FishSpecies";
import { Reviews } from "./collections/Reviews";
import { TeamMembers } from "./collections/TeamMembers";
import { FishingSpots } from "./collections/FishingSpots";
import { PZWZones } from "./collections/PZWZones";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, WaterBodies, Alerts, FishSpecies, Reviews, TeamMembers, FishingSpots, PZWZones],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "dev-secret-change-in-production",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
    autoGenerate: true,
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "postgres://fishair:fishair_secret@localhost:5432/fishair",
    },
  }),
  localization: {
    locales: ["pl", "en"],
    defaultLocale: "pl",
    fallback: true,
  },
  cors: ["http://localhost:3000"],
});
