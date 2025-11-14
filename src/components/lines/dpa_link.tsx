import { Text } from "@chakra-ui/react";
import NextLink from "next/link";
import type { ToolRichType } from "~/types/tool-rich-types";

type Props = {
	tool: ToolRichType;
};

export default function DpaLink({ tool }: Props) {
	if (tool.dpa_link)
		return (
			<NextLink target="_blank" href={tool.dpa_link ?? ""}>
				<Text
					color={"primary.solid"}
					textDecoration={"underline"}
					textUnderlineOffset={2}
					wordBreak="break-all"
				>
					{tool.dpa_link}
				</Text>
			</NextLink>
		);

	return <Text>Aucune information</Text>;
}
