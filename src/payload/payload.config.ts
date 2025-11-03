import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Accessors } from "./collections/Accessor";
import { Categories } from "./collections/Category";
import { Certifications } from "./collections/Certification";
import { Features } from "./collections/Feature";
import { Locations } from "./collections/Location";
import { Media } from "./collections/Media";
import { Tools } from "./collections/Tools";
import { Transfers } from "./collections/Transfer";
import { ContactSubmissions } from "./collections/ContactSubmission";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	editor: lexicalEditor(),
	collections: [
		Tools,
		Media,
		Categories,
		Certifications,
		Accessors,
		Locations,
		Transfers,
		Features,
		ContactSubmissions,
	],
	secret: process.env.PAYLOAD_SECRET || "",
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI || "",
		},
		migrationDir: path.resolve(dirname, "./migrations"),
		generateSchemaOutputFile: path.resolve(
			dirname,
			"./payload-generated-schema.ts",
		),
	}),
	sharp,
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
});
