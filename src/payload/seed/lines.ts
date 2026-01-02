import type { Payload } from "payload";
import type { Line } from "../payload-types";

const line: Line = {
	id: 1,
	items: [
		{
			slug: "transfer_informations",
			name: "Informations sur les transferts",
			active: true,
			type: "link",
		},
		{
			slug: "location_note",
			name: "Remarque Localisation Hébergement",
			active: true,
			type: "richtext",
		},
		{
			slug: "actions",
			name: "Actions à mener si utilisation de l'outil",
			active: true,
			type: "richtext",
		},
		{
			slug: "locations_data",
			name: "Hébergement des données",
			active: true,
			type: "locations",
		},
		{
			slug: "enterprise_european",
			name: "Entreprise EU",
			active: true,
			type: "boolean",
		},
		{ slug: "site_link", name: "Site internet", active: true, type: "link" },
		{
			slug: "certifications_subcontractors",
			name: "Certifications des sous-traitants ou hébergeurs",
			active: true,
			type: "boolean",
		},
		{
			slug: "dpa_link",
			name: "Lien DPA si applicable",
			active: true,
			type: "link",
		},
		{
			slug: "transfers",
			name: "Encadrement des transferts",
			active: true,
			type: "badges",
		},
		{
			slug: "features",
			name: "Fonctionnalités RGPD/Sécurité",
			active: true,
			type: "badges",
		},
		{
			slug: "fr_documentation",
			name: "Documentation en FR",
			active: true,
			type: "boolean",
		},
		{
			slug: "self_host_possibility",
			name: "Possibilité de selfhost",
			active: true,
			type: "boolean",
		},
		{ slug: "opensource", name: "Open source", active: true, type: "boolean" },
		{
			slug: "certification_dpf",
			name: 'Certifié "DPF"',
			active: true,
			type: "boolean",
		},
		{
			slug: "subcontractors_infra",
			name: "Sous-traitants ultérieurs (Hébergement/Infrastructure)",
			active: true,
			type: "badges",
		},
		{
			slug: "online_accessible_dpa",
			name: "DPA accessible en ligne",
			active: true,
			type: "boolean",
		},
		{
			slug: "categories",
			name: "Type d'outil",
			active: true,
			type: "categories",
		},
		{
			slug: "privacy_score_self_hosted",
			name: "Privacy score SELFHOSTED",
			active: true,
			type: "privacy_score",
		},
		{
			slug: "privacy_score_saas",
			name: "Privacy score SAAS",
			active: true,
			type: "privacy_score",
		},
		{
			slug: "transfer_out_eu",
			name: "Transfert hors EU",
			active: true,
			type: "choice",
		},
		{
			slug: "subcontractors",
			name: "Liste des sous-traitants ultérieurs",
			active: true,
			type: "badges",
		},
		{
			slug: "accessors",
			name: "Accès aux données",
			active: true,
			type: "badges",
		},
		{
			slug: "certifications",
			name: "Certifications de l'entreprise",
			active: true,
			type: "badges",
		},
	],
};

export async function seed(payload: Payload) {
	await payload.updateGlobal({
		slug: "lines",
		data: line,
	});
}
