import type { CollectionConfig } from "payload";

export const ContactSubmissions: CollectionConfig = {
	slug: "contactSubmissions",
	versions: {
		drafts: false,
	},
	admin: {
		useAsTitle: "name",
	},
	fields: [
		{
			name: "state",
			type: "select",
			label: "État de la demande",
			options: [
				{ label: "Demande non traitée", value: "pending" },
				{ label: "Demande en cours de traitement", value: "in_progress" },
				{ label: "Demande traitée", value: "processed" },
				{ label: "Demande rejetée", value: "rejected" },
			],
			defaultValue: "pending",
		},
		{
			name: "category",
			type: "relationship",
			relationTo: "categories",
			hasMany: false,
			label: "Catégorie de l'outil",
			required: true,
		},
		{
			name: "name",
			type: "text",
			label: "Nom de l'outil",
			required: true,
		},
		{
			name: "url",
			type: "text",
			label: "Site web de l'outil",
			required: true,
		},
		{
			name: "comment",
			type: "textarea",
			label: "Commentaire",
		},
	],
};
