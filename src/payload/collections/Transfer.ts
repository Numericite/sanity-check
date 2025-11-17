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
			name: "relatedTools",
			type: "join",
			label: {
				fr: "Outils",
			},
			collection: "tools",
			on: "transfers.transfer",
			maxDepth: 2,
			defaultLimit: 0,
		},
	],
};
