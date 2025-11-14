import { Text } from "@chakra-ui/react";
import Badge from "../ui/badge/badge";
import type { ToolRichType } from "~/types/tool-rich-types";

type Props = {
	tool: ToolRichType;
};

export default function TransferOutEu({ tool }: Props) {
	const colorTransferOutEu =
		tool.transfer_out_eu === "Oui"
			? "green"
			: tool.transfer_out_eu === "Non"
				? "red"
				: "gray";

	if (tool.transfer_out_eu)
		return <Badge color={colorTransferOutEu}>{tool.transfer_out_eu}</Badge>;

	return <Text>Aucune information</Text>;
}
