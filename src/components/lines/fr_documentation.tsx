import type { ToolRichType } from "~/types/tool-rich-types";
import BooleanBadge from "../ui/badge/boolean-badge";

type Props = {
	tool: ToolRichType;
};

export default function FrDocumentation({ tool }: Props) {
	return <BooleanBadge val={tool.fr_documentation ?? null} />;
}
