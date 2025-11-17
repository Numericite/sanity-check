import type { CollectionConfig } from "payload";

export const Accessors: CollectionConfig = {
	slug: "accessors",
	versions: {
		drafts: false,
	},
	admin: {
		useAsTitle: "name",
	},
	labels: {
		singular: {
			en: "Accessor",
			fr: "Accès",
		},
		plural: {
			en: "Accessors",
			fr: "Accès",
		},
	},
	fields: [
		{
			name: "name",
			type: "text",
			label: "Nom de l'accesseur",
			required: true,
		},
		{
			name: "relatedTools",
			type: "join",
			label: {
				fr: "Outils",
			},
			collection: "tools",
			on: "accessors.accessor",
			maxDepth: 2,
			defaultLimit: 0,
		},
	],
};
