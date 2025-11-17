import type { CollectionConfig } from "payload";

export const Features: CollectionConfig = {
	slug: "features",
	versions: {
		drafts: false,
	},
	admin: {
		useAsTitle: "name",
	},
	labels: {
		singular: {
			en: "Feature",
			fr: "Fonctionnalité",
		},
		plural: {
			en: "Features",
			fr: "Fonctionnalités",
		},
	},
	fields: [
		{
			name: "name",
			type: "text",
			label: "Nom de la fonctionnalité RGPD",
			required: true,
		},
		{
			name: "relatedTools",
			label: {
				fr: "Outils",
			},
			type: "join",
			collection: "tools",
			on: "features.feature",
			maxDepth: 2,
			defaultLimit: 0,
		},
	],
};
