import type { GlobalConfig } from "payload";

export const Lines: GlobalConfig = {
	slug: "lines",
	versions: {
		drafts: false,
	},
	label: {
		en: "Lines",
		fr: "Lignes",
	},
	fields: [
		{
			name: "items",
			type: "array",
			label: {
				en: "Lines",
				fr: "Lignes",
			},
			fields: [
				{
					name: "slug",
					type: "text",
					label: "Slug de la ligne",
					required: true,
				},
				{
					name: "name",
					type: "text",
					label: "Nom de la ligne",
					required: true,
				},
				{
					name: "active",
					type: "checkbox",
					label: "Ligne visible",
				},
				{
					name: "type",
					type: "select",
					required: true,
					options: [
						{ label: "Lien", value: "link" },
						{ label: "Text enrichi", value: "richtext" },
						{ label: "Localisations", value: "locations" },
						{ label: "Vrai/Faux", value: "boolean" },
						{ label: "Oui/Non/Au choix", value: "choice" },
						{ label: "Badges", value: "badges" },
						{ label: "Catégories", value: "categories" },
						{ label: "Privacy Score", value: "privacy_score" },
					],
				},
			],
		},
	],
};
