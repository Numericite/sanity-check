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
		// {
		// 	name: "enterprise_european",
		// 	type: "text",
		// 	label: "Entreprise européenne",
		// 	admin: {
		// 		components: {
		// 			Field: {
		// 				path: "/components/CustomSelect#CustomSelectFieldServer",
		// 				exportName: "CustomSelectFieldServer",
		// 			},
		// 		},
		// 	},
		// },
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
			label: "Catégories",
			fields: [
				{
					name: "category",
					type: "relationship",
					relationTo: "categories",
					required: true,
					hasMany: false,
					unique: false,
				},
				{
					name: "main",
					type: "checkbox",
					label: "Catégorie principale",
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
			label: "Certifications",
			fields: [
				{
					name: "certification",
					type: "relationship",
					relationTo: "certifications",
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
			label: "Certifications des sous-traitants",
			fields: [
				{
					name: "certification",
					type: "relationship",
					relationTo: "certifications",
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
			label: "Personne ayant accès",
			fields: [
				{
					name: "accessor",
					type: "relationship",
					relationTo: "accessors",
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
			label: "Localisation de l'entreprise",
			fields: [
				{
					name: "location",
					type: "relationship",
					relationTo: "locations",
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
			name: "locations_host_client",
			type: "array",
			label: "Localisation hébergement : relation client",
			fields: [
				{
					name: "location",
					type: "relationship",
					relationTo: "locations",
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
			name: "locations_final_users",
			type: "array",
			label: "Localisation hébergement : utilisateurs finaux",
			fields: [
				{
					name: "location",
					type: "relationship",
					relationTo: "locations",
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
			label: "Encadrements des transferts",
			fields: [
				{
					name: "transfer",
					type: "relationship",
					relationTo: "transfers",
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
			label: "Fonctionnalités RGPB",
			fields: [
				{
					name: "feature",
					type: "relationship",
					relationTo: "features",
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
