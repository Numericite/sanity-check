import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";
import { s3Storage } from "@payloadcms/storage-s3";

import { Accessors } from "./collections/Accessor";
import { Categories } from "./collections/Category";
import { Certifications } from "./collections/Certification";
import { Features } from "./collections/Feature";
import { Locations } from "./collections/Location";
import { Media } from "./collections/Media";
import { Tools } from "./collections/Tools";
import { Transfers } from "./collections/Transfer";
import { ContactSubmissions } from "./collections/ContactSubmission";
import { Lines } from "./collections/Line";
import { fr } from "@payloadcms/translations/languages/fr";

const hasAwsCreds = Boolean(
	process.env.S3_ACCESS_KEY_ID &&
		process.env.S3_SECRET_ACCESS_KEY &&
		process.env.S3_BUCKET &&
		process.env.S3_REGION,
);

const isUsingAws = hasAwsCreds && process.env.NODE_ENV === "production";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		importMap: {
			baseDir: path.resolve(dirname),
		},
		dateFormat: "dd/MM/yy HH:mm",
	},
	i18n: {
		fallbackLanguage: "fr",
		supportedLanguages: { fr },
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
		Lines,
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
	plugins: [
		s3Storage({
			enabled: isUsingAws,
			collections: {
				media: true,
			},
			bucket: process.env.S3_BUCKET || "",
			config: {
				credentials: {
					accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
					secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
				},
				region: process.env.S3_REGION,
			},
		}),
	],
	sharp,
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
});
