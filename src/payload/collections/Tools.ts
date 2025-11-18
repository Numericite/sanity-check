import { lexicalEditor } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

export const Tools: CollectionConfig = {
	slug: "tools",
	versions: {
		drafts: false,
	},
	admin: {
		useAsTitle: "name",
	},
	labels: {
		singular: {
			en: "Tool",
			fr: "Outil",
		},
		plural: {
			en: "Tools",
			fr: "Outils",
		},
	},
	fields: [
		{
			name: "name",
			type: "text",
			label: "Nom de l'outil",
			required: true,
		},
		{
			name: "site_link",
			type: "text",
			label: "Lien vers le site",
			required: true,
		},
		{
			name: "logo",
			label: "Image de l'outil",
			type: "relationship",
			relationTo: "media",
		},
		{
			name: "description",
			type: "textarea",
			label: "Description de l'outil",
		},
		{
			name: "subcontractors",
			type: "text",
			label: "Sous-traitants",
		},
		{
			name: "subcontractors_infra",
			type: "array",
			label: "Liste des infrastructures sous-traitant",
			labels: {
				singular: {
					en: "Subcontractor infrastructure",
					fr: "Infrastructure des sous-traitants",
				},
				plural: {
					en: "Subcontractor infrastructures",
					fr: "Infrastructures des sous-traitants",
				},
			},
			fields: [
				{
					name: "name",
					type: "text",
					label: "Nom du sous-traitant",
				},
			],
		},
		{
			name: "transfer_out_eu",
			type: "select",
			hasMany: false,
			options: [
				{ label: "Oui", value: "Oui" },
				{ label: "Non", value: "Non" },
				{ label: "Au choix", value: "Au choix" },
			],
			label: "Transfert des données en dehors de l'UE",
		},
		{
			name: "privacy_score_saas",
			type: "select",
			label: "Privacy score (SaaS)",
			hasMany: false,
			options: [
				{ label: "A", value: "A" },
				{ label: "B", value: "B" },
				{ label: "C", value: "C" },
				{ label: "D", value: "D" },
				{ label: "E", value: "E" },
				{ label: "F", value: "F" },
			],
		},
		{
			name: "privacy_score_self_hosted",
			type: "select",
			label: "Privacy score (auto-hébergé)",
			hasMany: false,
			options: [
				{ label: "A", value: "A" },
				{ label: "B", value: "B" },
				{ label: "C", value: "C" },
				{ label: "D", value: "D" },
				{ label: "E", value: "E" },
				{ label: "F", value: "F" },
			],
		},
		{
			name: "online_accessible_dpa",
			type: "checkbox",
			label: "Accès en ligne au DPA",
		},
		{
			name: "certification_dpf",
			type: "checkbox",
			label: "Certification DPF",
		},
		{
			name: "opensource",
			type: "checkbox",
			label: "Open source",
		},
		{
			name: "self_host_possibility",
			type: "checkbox",
			label: "Possibilité d'auto-hébergement",
		},
		{
			name: "fr_documentation",
			type: "checkbox",
			label: "Documentation en français",
		},
		{
			name: "dpa_compliant",
			type: "checkbox",
			label: "Conformité au DPA",
		},
		{
			name: "dpa_link",
			type: "text",
			label: "Lien vers le DPA",
		},
		{
			name: "enterprise_european",
			type: "checkbox",
			label: "Entreprise européenne",
		},
		{
			name: "actions",
			type: "richText",
			label: "Actions à mener si utilisation de l'outil",
			editor: lexicalEditor({
				features: ({ defaultFeatures }) => [...defaultFeatures],
			}),
		},
		{
			name: "location_note",
			type: "richText",
			label: "Note sur la localisation",
			editor: lexicalEditor({
				features: ({ defaultFeatures }) => [...defaultFeatures],
			}),
		},
		{
			name: "transfer_informations",
			type: "text",
			label: "Informations sur les transferts",
		},
		{
			name: "dpa_file",
			type: "upload",
			relationTo: "media",
			label: "DPA (Document de Protection des Données)",
		},
		{
			name: "categories",
			type: "array",
			label: {
				en: "Categories",
				fr: "Catégories",
			},
			labels: {
				singular: {
					en: "Category",
					fr: "Catégorie",
				},
				plural: {
					en: "Categories",
					fr: "Catégories",
				},
			},
			fields: [
				{
					name: "category",
					label: {
						en: "Category",
						fr: "Catégorie",
					},
					type: "relationship",
					relationTo: "categories",
					required: true,
					hasMany: false,
					unique: false,
				},
				{
					name: "main",
					type: "checkbox",
					label: {
						en: "Main category",
						fr: "Catégorie principale",
					},
					defaultValue: false,
				},
			],
			admin: {
				description:
					"Sélectionnez une ou plusieurs catégories et cochez celle qui est principale.",
			},
		},
		{
			name: "certifications",
			type: "array",
			label: {
				en: "Certification",
				fr: "Certifications",
			},
			labels: {
				singular: {
					en: "Certifications",
					fr: "Certifications",
				},
				plural: {
					en: "Certifications",
					fr: "Certifications",
				},
			},
			fields: [
				{
					name: "certification",
					type: "relationship",
					relationTo: "certifications",
					label: {
						en: "Certification",
						fr: "Certification",
					},
					required: true,
					hasMany: false,
					unique: false,
				},
			],
			admin: {
				description: "Sélectionnez une ou plusieurs certifications.",
			},
		},
		{
			name: "certifications_subcontractors",
			type: "array",
			label: {
				en: "Subcontractor's certifications",
				fr: "Certifications des sous-traitants",
			},
			labels: {
				singular: {
					en: "Subcontractor's certification",
					fr: "Certification des sous-traitants",
				},
				plural: {
					en: "Subcontractor's certifications",
					fr: "Certifications des sous-traitants",
				},
			},
			fields: [
				{
					name: "certification",
					type: "relationship",
					relationTo: "certifications",
					label: {
						en: "Subcontractor's certification",
						fr: "Certification des sous-traitants",
					},
					required: true,
					hasMany: false,
					unique: false,
				},
			],
			admin: {
				description: "Sélectionnez une ou plusieurs certifications.",
			},
		},
		{
			name: "accessors",
			type: "array",
			label: {
				en: "People with access",
				fr: "Personnes ayant accès",
			},
			labels: {
				singular: {
					en: "People with access",
					fr: "Personne ayant accès",
				},
				plural: {
					en: "People with access",
					fr: "Personnes ayant accès",
				},
			},
			fields: [
				{
					name: "accessor",
					type: "relationship",
					relationTo: "accessors",
					label: {
						en: "People with access",
						fr: "Personne ayant accès",
					},
					required: true,
					hasMany: false,
					unique: false,
				},
			],
			admin: {
				description: "Sélectionnez une ou plusieurs accesseurs.",
			},
		},
		{
			name: "locations_enterprise",
			type: "array",
			label: {
				en: "Enterprise's locations",
				fr: "Localisations de l'entreprise",
			},
			labels: {
				singular: {
					en: "Enterprise's location",
					fr: "Localisation de l'entreprise",
				},
				plural: {
					en: "Enterprise's locations",
					fr: "Localisations de l'entreprise",
				},
			},
			fields: [
				{
					name: "location",
					type: "relationship",
					relationTo: "locations",
					label: {
						en: "Enterprise's location",
						fr: "Localisation de l'entreprise",
					},
					required: true,
					hasMany: false,
					unique: false,
				},
			],
			admin: {
				description: "Sélectionnez une ou plusieurs localisations.",
			},
		},
		{
			name: "locations_data",
			type: "array",
			label: {
				en: "Data locations",
				fr: "Localisations des données",
			},
			labels: {
				singular: {
					en: "Data location",
					fr: "Localisation des données",
				},
				plural: {
					en: "Data locations",
					fr: "Localisations des données",
				},
			},
			fields: [
				{
					name: "location",
					type: "relationship",
					relationTo: "locations",
					label: {
						en: "Data location",
						fr: "Localisation des données",
					},
					required: true,
					hasMany: false,
					unique: false,
				},
			],
			admin: {
				description: "Sélectionnez une ou plusieurs localisations.",
			},
		},
		{
			name: "transfers",
			type: "array",
			label: {
				en: "Transfer frameworks",
				fr: "Encadrements des transferts",
			},
			labels: {
				singular: {
					en: "Transfer framework",
					fr: "Encadrement des transferts",
				},
				plural: {
					en: "Transfer frameworks",
					fr: "Encadrements des transferts",
				},
			},
			fields: [
				{
					name: "transfer",
					type: "relationship",
					relationTo: "transfers",
					label: {
						en: "Transfer framework",
						fr: "Encadrement des transferts",
					},
					required: true,
					hasMany: false,
					unique: false,
				},
			],
			admin: {
				description: "Sélectionnez une ou plusieurs encadrements.",
			},
		},
		{
			name: "features",
			type: "array",
			label: {
				en: "RGPB functionalities",
				fr: "Fonctionnalités RGPB",
			},
			labels: {
				singular: {
					en: "RGPB functionality",
					fr: "Fonctionnalité RGPB",
				},
				plural: {
					en: "RGPB functionalities",
					fr: "Fonctionnalités RGPB",
				},
			},
			fields: [
				{
					name: "feature",
					type: "relationship",
					relationTo: "features",
					label: {
						en: "RGPB functionality",
						fr: "Fonctionnalité RGPB",
					},
					required: true,
					hasMany: false,
					unique: false,
				},
			],
			admin: {
				description: "Sélectionnez une ou plusieurs fonctionnalités.",
			},
		},
	],
};
