import { Text } from "@chakra-ui/react";
import { Prose } from "../ui/prose";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { ToolRichType } from "~/types/tool-rich-types";

type Props = {
	tool: ToolRichType;
};

export default function Actions({ tool }: Props) {
	if (tool.actions)
		return (
			<Prose>
				<RichText data={tool.actions} />
			</Prose>
		);

	return <Text>Aucune information</Text>;
}
