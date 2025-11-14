import { Text } from "@chakra-ui/react";
import { Prose } from "../ui/prose";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { ToolRichType } from "~/types/tool-rich-types";

type Props = {
	tool: ToolRichType;
};

export default function LocationNote({ tool }: Props) {
	if (tool.location_note)
		return (
			<Prose>
				<RichText data={tool.location_note} />
			</Prose>
		);

	return <Text>Aucune information</Text>;
}
