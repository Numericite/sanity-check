import { Text } from "@chakra-ui/react";
import PrivacyScoreBadge from "../ui/badge/privacy-score-badge";
import type { ToolRichType } from "~/types/tool-rich-types";

type Props = {
	tool: ToolRichType;
};

export default function PrivacyScoreSelfHosted({ tool }: Props) {
	if (tool.privacy_score_self_hosted)
		return <PrivacyScoreBadge score={tool.privacy_score_self_hosted} />;

	return <Text>Aucun score SELFHOSTED</Text>;
}
