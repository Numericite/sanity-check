import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
	slug: "categories",
	versions: {
		drafts: false,
	},
	admin: {
		useAsTitle: "name",
	},
	fields: [
		{
			name: "name",
			type: "text",
			label: "Nom de la catégorie",
			required: true,
		},
		{
			name: "description",
			type: "text",
			label: "Description de la catégorie",
		},
		{
			name: "icon",
			type: "text",
			label: "Icone de la catégorie",
			required: true,
		},
		{
			name: "color",
			type: "text",
			label: "Couleur de la catégorie",
			required: true,
		},
		{
			name: "fonctionnalities",
			type: "richText",
			label: "En savoir plus -> Fonctionnalités",
			editor: lexicalEditor({
				features: ({ defaultFeatures }) => [...defaultFeatures],
			}),
		},
		{
			name: "vigilances",
			type: "richText",
			label: "En savoir plus -> Points de vigilance",
			editor: lexicalEditor({
				features: ({ defaultFeatures }) => [...defaultFeatures],
			}),
		},
		{
			name: "recommendations",
			type: "richText",
			label: "En savoir plus -> Recommandations et mentions obligatoires",
			editor: lexicalEditor({
				features: ({ defaultFeatures }) => [...defaultFeatures],
			}),
		},
		{
			name: "relatedTools",
			type: "join",
			collection: "tools",
			on: "categories.category",
			maxDepth: 2,
			defaultLimit: 0,
			defaultSort: ["privacy_score_saas", "dpa_compliant"],
		},
	],
};
