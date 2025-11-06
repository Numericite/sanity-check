import type { CollectionConfig } from "payload";

export const Transfers: CollectionConfig = {
	slug: "transfers",
	versions: {
		drafts: false,
	},
	admin: {
		useAsTitle: "name",
	},
	labels: {
		singular: {
			en: "Transfer",
			fr: "Transfert",
		},
		plural: {
			en: "Transfers",
			fr: "Transferts",
		},
	},
	fields: [
		{
			name: "name",
			type: "text",
			label: "Nom de l'encadrement",
			required: true,
		},
		{
			name: "tools",
			type: "relationship",
			relationTo: "tools",
			hasMany: true,
		},
	],
};
