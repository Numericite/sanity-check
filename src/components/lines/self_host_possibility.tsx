import type { ToolRichType } from "~/types/tool-rich-types";
import BooleanBadge from "../ui/badge/boolean-badge";

type Props = {
	tool: ToolRichType;
};

export default function SelfHostPossibility({ tool }: Props) {
	return <BooleanBadge val={tool.self_host_possibility ?? null} />;
}
