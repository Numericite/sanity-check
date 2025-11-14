import type { ToolRichType } from "~/types/tool-rich-types";
import BooleanBadge from "../ui/badge/boolean-badge";

type Props = {
	tool: ToolRichType;
};

export default function CertificationDpf({ tool }: Props) {
	return <BooleanBadge val={tool.certification_dpf ?? null} />;
}
