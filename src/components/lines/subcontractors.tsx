import { Text } from "@chakra-ui/react";
import NextLink from "next/link";
import type { ToolRichType } from "~/types/tool-rich-types";

type Props = {
	tool: ToolRichType;
};

export default function Subcontractors({ tool }: Props) {
	if (tool.subcontractors)
		return (
			<NextLink target="_blank" href={tool.subcontractors ?? ""}>
				<Text
					color={"primary.solid"}
					textDecoration={"underline"}
					textUnderlineOffset={2}
					wordBreak="break-all"
				>
					{tool.subcontractors}
				</Text>
			</NextLink>
		);

	return <Text>Aucune liste</Text>;
}
