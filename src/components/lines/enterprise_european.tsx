import type { ToolRichType } from "~/types/tool-rich-types";
import BooleanBadge from "../ui/badge/boolean-badge";

type Props = {
	tool: ToolRichType;
};

export default function EnterpriseEuropean({ tool }: Props) {
	return <BooleanBadge val={tool.enterprise_european ?? null} />;
}
