import { Box } from "@chakra-ui/react";
import Line from "./line";
import TransferInformations from "./lines/transfer_informations";
import LocationNote from "./lines/location_note";
import Actions from "./lines/actions";
import LocationsFinalUsers from "./lines/locations_final_users";
import EnterpriseEuropean from "./lines/enterprise_european";
import SiteLink from "./lines/site_link";
import CertificationsSubcontractors from "./lines/certifications_subcontractors";
import DpaLink from "./lines/dpa_link";
import Transfers from "./lines/transfers";
import Features from "./lines/features";
import FrDocumentation from "./lines/fr_documentation";
import SelfHostPossibility from "./lines/self_host_possibility";
import Opensource from "./lines/opensource";
import CertificationDpf from "./lines/certification_dpf";
import SubcontractorsInfra from "./lines/subcontractors_infra";
import OnlineAccessibleDpa from "./lines/online_accessible_dpa";
import LocationsHostClient from "./lines/locations_host_client";
import Categories from "./lines/categories";
import PrivacyScoreSelfHosted from "./lines/privacy_score_self_hosted";
import PrivacyScoreSaas from "./lines/privacy_score_saas";
import TransferOutEu from "./lines/transfer_out_eu";
import Subcontractors from "./lines/subcontractors";
import Accessors from "./lines/accessors";
import Certifications from "./lines/certifications";
import { api } from "~/utils/api";
import type { ToolRichType } from "~/types/tool-rich-types";

type Props = {
	tool: ToolRichType;
};

const lineDefinitions = {
	transfer_informations: TransferInformations,
	location_note: LocationNote,
	actions: Actions,
	locations_final_users: LocationsFinalUsers,
	enterprise_european: EnterpriseEuropean,
	site_link: SiteLink,
	certifications_subcontractors: CertificationsSubcontractors,
	dpa_link: DpaLink,
	transfers: Transfers,
	features: Features,
	fr_documentation: FrDocumentation,
	self_host_possibility: SelfHostPossibility,
	opensource: Opensource,
	certification_dpf: CertificationDpf,
	subcontractors_infra: SubcontractorsInfra,
	online_accessible_dpa: OnlineAccessibleDpa,
	locations_host_client: LocationsHostClient,
	categories: Categories,
	privacy_score_self_hosted: PrivacyScoreSelfHosted,
	privacy_score_saas: PrivacyScoreSaas,
	transfer_out_eu: TransferOutEu,
	subcontractors: Subcontractors,
	accessors: Accessors,
	certifications: Certifications,
} as const;

type LineSlug = keyof typeof lineDefinitions;

export default function Lines({ tool }: Props) {
	const { data: lines, isLoading } = api.line.getAll.useQuery();

	if (isLoading || !tool) return null;

	return (
		<Box px={6} rounded={"xl"} borderColor={"blue.50"} borderWidth={1}>
			{lines?.map((line, index) => {
				const Comp = lineDefinitions[line.slug as LineSlug];
				const isLast = index === lines.length - 1;

				return (
					<Line
						title={line.name}
						key={line.slug}
						last={isLast}
						content={<Comp tool={tool} />}
					/>
				);
			})}
		</Box>
	);
}
