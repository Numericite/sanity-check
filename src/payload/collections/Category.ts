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
			type: "text",
			label: "En savoir plus -> Fonctionnalités",
		},
		{
			name: "vigilances",
			type: "text",
			label: "En savoir plus -> Points de vigilance",
		},
		{
			name: "recommendations",
			type: "text",
			label: "En savoir plus -> Recommandations et mentions obligatoires",
		},
		{
			name: "relatedTools",
			type: "join",
			collection: "tools",
			on: "categories.category",
			maxDepth: 2,
			defaultSort: ["privacy_score_saas", "dpa_compliant"],
		},
	],
};
