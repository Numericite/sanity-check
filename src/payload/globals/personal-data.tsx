import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { GlobalConfig } from "payload";

export const PersonalData: GlobalConfig = {
	slug: "personal-data",
	label: "Données à caractère personnel",
	fields: [
		{
			name: "content",
			type: "richText",
			label: "Contenu des données à caractère personnel",
			editor: lexicalEditor({
				features: ({ defaultFeatures }) => [...defaultFeatures],
			}),
		},
	],
};
