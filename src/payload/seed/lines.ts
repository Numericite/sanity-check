import type { Payload } from "payload";
import type { Line } from "../payload-types";

type LineType = Omit<Line, "id" | "updatedAt" | "createdAt">;

const list: LineType[] = [
	{
		slug: "transfer_informations",
		name: "Informations sur les transferts",
		active: true,
	},
	{
		slug: "location_note",
		name: "Remarque Localisation Hébergement",
		active: true,
	},
	{
		slug: "actions",
		name: "Actions à mener si utilisation de l'outil",
		active: true,
	},
	{
		slug: "locations_final_users",
		name: "Localisation hébergement : utilisateurs finaux",
		active: true,
	},
	{ slug: "enterprise_european", name: "Entreprise EU", active: true },
	{ slug: "site_link", name: "Site internet", active: true },
	{
		slug: "certifications_subcontractors",
		name: "Certifications des sous-traitants ou hébergeurs",
		active: true,
	},
	{ slug: "dpa_link", name: "Lien DPA si applicable", active: true },
	{ slug: "transfers", name: "Encadrement des transferts", active: true },
	{ slug: "features", name: "Fonctionnalités RGPD/Sécurité", active: true },
	{ slug: "fr_documentation", name: "Documentation en FR", active: true },
	{
		slug: "self_host_possibility",
		name: "Possibilité de selfhost",
		active: true,
	},
	{ slug: "opensource", name: "Open source", active: true },
	{ slug: "certification_dpf", name: 'Certifié "DPF"', active: true },
	{
		slug: "subcontractors_infra",
		name: "Sous-traitants ultérieurs (Hébergement/Infrastructure)",
		active: true,
	},
	{
		slug: "online_accessible_dpa",
		name: "DPA accessible en ligne",
		active: true,
	},
	{
		slug: "locations_host_client",
		name: "Localisation hébergement : relation client",
		active: true,
	},
	{ slug: "categories", name: "Type d'outil", active: true },
	{
		slug: "privacy_score_self_hosted",
		name: "Privacy score SELFHOSTED",
		active: true,
	},
	{ slug: "privacy_score_saas", name: "Privacy score SAAS", active: true },
	{ slug: "transfer_out_eu", name: "Transfert hors EU", active: true },
	{
		slug: "subcontractors",
		name: "Liste des sous-traitants ultérieurs",
		active: true,
	},
	{ slug: "accessors", name: "Accès aux données", active: true },
	{
		slug: "certifications",
		name: "Certifications de l'entreprise",
		active: true,
	},
];

export async function seed(payload: Payload) {
	for (const elt of list) {
		await payload.create({
			collection: "lines",
			data: elt,
		});
	}
}
