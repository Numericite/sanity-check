import type { CollectionConfig } from "payload";

export const Certifications: CollectionConfig = {
	slug: "certifications",
	versions: {
		drafts: false,
	},
	admin: {
		useAsTitle: "name",
	},
	labels: {
		singular: {
			en: "Certification",
			fr: "Certification",
		},
		plural: {
			en: "Certifications",
			fr: "Certifications",
		},
	},
	fields: [
		{
			name: "name",
			type: "text",
			label: "Nom de la certification",
			required: true,
		},
		{
			name: "relatedTools",
			label: {
				fr: "Outils",
			},
			type: "join",
			collection: "tools",
			on: "certifications.certification",
			maxDepth: 2,
			defaultLimit: 0,
		},
	],
};
