import type { CollectionConfig } from "payload";

export const Locations: CollectionConfig = {
	slug: "locations",
	versions: {
		drafts: false,
	},
	admin: {
		useAsTitle: "name",
	},
	labels: {
		singular: {
			en: "Location",
			fr: "Localisation",
		},
		plural: {
			en: "Locations",
			fr: "Localisations",
		},
	},
	fields: [
		{
			name: "name",
			type: "text",
			label: "Nom de la localisation",
			required: true,
		},
		{
			name: "relatedToolsEnterprise",
			type: "join",
			collection: "tools",
			label: {
				fr: "Outils : Localisation de l'entreprise",
			},
			on: "locations_enterprise.location",
			maxDepth: 2,
			defaultLimit: 0,
		},
	],
};
