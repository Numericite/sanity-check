import type { ToolRichType } from "~/types/tool-rich-types";
import PrivacyScoreBadge from "../ui/badge/privacy-score-badge";

type Props = {
	tool: ToolRichType;
};

export default function PrivacyScoreSaas({ tool }: Props) {
	return <PrivacyScoreBadge score={tool.privacy_score_saas} />;
}
