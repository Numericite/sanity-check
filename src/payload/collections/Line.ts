import type { CollectionConfig } from "payload";

export const Lines: CollectionConfig = {
	slug: "lines",
	orderable: true,
	versions: {
		drafts: false,
	},
	admin: {
		useAsTitle: "name",
	},
	access: {
		create: () => false,
		delete: () => false,
	},
	labels: {
		singular: {
			en: "Details line",
			fr: "Ligne de détails",
		},
		plural: {
			en: "Details line",
			fr: "Lignes de détails",
		},
	},
	fields: [
		{
			name: "slug",
			type: "text",
			label: "Slug de la ligne de détails",
			required: true,
		},
		{
			name: "name",
			type: "text",
			label: "Nom de la ligne de détails",
			required: true,
		},
		{
			name: "active",
			type: "checkbox",
			label: "Ligne de détails visible",
		},
	],
};
