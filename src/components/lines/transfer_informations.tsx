import { Text } from "@chakra-ui/react";
import NextLink from "next/link";
import type { ToolRichType } from "~/types/tool-rich-types";

type Props = {
	tool: ToolRichType;
};

export default function TransferInformations({ tool }: Props) {
	if (tool.transfer_informations)
		return (
			<NextLink target="_blank" href={tool.transfer_informations ?? ""}>
				<Text
					color={"primary.solid"}
					textDecoration={"underline"}
					textUnderlineOffset={2}
					wordBreak="break-all"
				>
					{tool.transfer_informations}
				</Text>
			</NextLink>
		);

	return <Text>Aucune information</Text>;
}
