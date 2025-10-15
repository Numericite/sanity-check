import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { buildConfig } from "payload";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { Media } from "./collections/Media";
import { Tools } from "./collections/Tools";
import { Categories } from "./collections/Category";
import { Certifications } from "./collections/Certification";
import { Accessors } from "./collections/Accessor";
import { Locations } from "./collections/Location";
import { Transfers } from "./collections/Transfer";
import { Features } from "./collections/Feature";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	editor: lexicalEditor(),
	collections: [Tools, Media, Categories, Certifications, Accessors, Locations, Transfers, Features],
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
