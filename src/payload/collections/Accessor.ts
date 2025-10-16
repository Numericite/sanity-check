import type { CollectionConfig } from "payload";

export const Accessors: CollectionConfig = {
	slug: "accessors",
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
			label: "Nom de l'accesseur",
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
