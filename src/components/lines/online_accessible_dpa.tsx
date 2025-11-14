import type { ToolRichType } from "~/types/tool-rich-types";
import BooleanBadge from "../ui/badge/boolean-badge";

type Props = {
	tool: ToolRichType;
};

export default function OnlineAccessibleDpa({ tool }: Props) {
	return <BooleanBadge val={tool.online_accessible_dpa ?? null} />;
}
