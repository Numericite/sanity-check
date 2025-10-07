import type { CollectionConfig } from "payload";

export const Tools: CollectionConfig = {
	slug: "tools",
	versions: {
		drafts: false,
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
			name: "image_link",
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
			name: "enterprise_certifications",
			type: "text",
			label: "Certifications de l'entreprise",
			admin: {
				components: {
					Field: {
						path: "/components/CustomSelect#CustomSelectFieldServer",
						exportName: "CustomSelectFieldServer",
					},
				},
			},
		},
		{
			name: "data_access",
			type: "text",
			label: "Accès aux données",
			admin: {
				components: {
					Field: {
						path: "/components/CustomSelect#CustomSelectFieldServer",
						exportName: "CustomSelectFieldServer",
					},
				},
			},
		},
		{
			name: "subcontractors",
			type: "text",
			label: "Sous-traitants",
		},
		{
			name: "transfer_out_eu",
			type: "text",
			label: "Transfert des données en dehors de l'UE",
		},
		{
			name: "privacy_score_saas",
			type: "text",
			label: "Privacy score (SaaS)",
		},
		{
			name: "privacy_score_self_hosted",
			type: "text",
			label: "Privacy score (auto-hébergé)",
		},
		{
			name: "tool_kind",
			type: "text",
			label: "Type d'outil",
			admin: {
				components: {
					Field: {
						path: "/components/CustomSelect#CustomSelectFieldServer",
						exportName: "CustomSelectFieldServer",
					},
				},
			},
		},
		{
			name: "location_host_client",
			type: "text",
			label: "Localisation hébergement: relation client",
			admin: {
				components: {
					Field: {
						path: "/components/CustomSelect#CustomSelectFieldServer",
						exportName: "CustomSelectFieldServer",
					},
				},
			},
		},
		{
			name: "online_accessible_dpa",
			type: "text",
			label: "Accès en ligne au DPA",
		},
		{
			name: "subcontractors_infra",
			type: "text",
			label: "Sous-traitants (infrastructure)",
			admin: {
				components: {
					Field: {
						path: "/components/CustomSelect#CustomSelectFieldServer",
						exportName: "CustomSelectFieldServer",
					},
				},
			},
		},
		{
			name: "certification_dpf",
			type: "checkbox",
			label: "Certification DPF",
		},
		{
			name: "opensource",
			type: "text",
			label: "Open source",
		},
		{
			name: "self_host_possibility",
			type: "text",
			label: "Possibilité d'auto-hébergement",
		},
		{
			name: "fr_documentation",
			type: "text",
			label: "Documentation en français",
		},
		{
			name: "dpa_compliant",
			type: "text",
			label: "Conformité au DPA",
		},
		{
			name: "subkind",
			type: "text",
			label: "Sous Type d'outil / fonctionnalités",
			admin: {
				components: {
					Field: {
						path: "/components/CustomSelect#CustomSelectFieldServer",
						exportName: "CustomSelectFieldServer",
					},
				},
			},
		},
		{
			name: "rgpd_feature",
			type: "text",
			label: "Fonctionnalités RGPD / Sécurité",
			admin: {
				components: {
					Field: {
						path: "/components/CustomSelect#CustomSelectFieldServer",
						exportName: "CustomSelectFieldServer",
					},
				},
			},
		},
		{
			name: "transfer_supervision",
			type: "text",
			label: "Supervision des transferts",
			admin: {
				components: {
					Field: {
						path: "/components/CustomSelect#CustomSelectFieldServer",
						exportName: "CustomSelectFieldServer",
					},
				},
			},
		},
		{
			name: "enterprise_location",
			type: "text",
			label: "Localisation de l'entreprise",
			admin: {
				components: {
					Field: {
						path: "/components/CustomSelect#CustomSelectFieldServer",
						exportName: "CustomSelectFieldServer",
					},
				},
			},
		},
		{
			name: "dpa_link",
			type: "text",
			label: "Lien vers le DPA",
		},
		{
			name: "subcontractors_certifications",
			type: "text",
			label: "Certifications des sous-traitants",
			admin: {
				components: {
					Field: {
						path: "/components/CustomSelect#CustomSelectFieldServer",
						exportName: "CustomSelectFieldServer",
					},
				},
			},
		},
		{
			name: "enterprise_european",
			type: "text",
			label: "Entreprise européenne",
			admin: {
				components: {
					Field: {
						path: "/components/CustomSelect#CustomSelectFieldServer",
						exportName: "CustomSelectFieldServer",
					},
				},
			},
		},
		{
			name: "final_users_location",
			type: "text",
			label: "Localisation de l'hébergement des utilisateurs finaux",
			admin: {
				components: {
					Field: {
						path: "/components/CustomSelect#CustomSelectFieldServer",
						exportName: "CustomSelectFieldServer",
					},
				},
			},
		},
		{
			name: "actions",
			type: "richText",
			label: "Actions à mener si utilisation de l'outil",
		},
		{
			name: "location_note",
			type: "richText",
			label: "Note sur la localisation",
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
			name: 'category',
			type: 'relationship',
			relationTo: 'categories',
			required: false,
		},
		{
			name: 'subCategories',
			type: 'relationship',
			relationTo: 'categories',
			hasMany: true,
		},
	],
};
