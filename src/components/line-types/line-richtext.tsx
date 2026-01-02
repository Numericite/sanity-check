import { Text } from "@chakra-ui/react";
import { Prose } from "../ui/prose";
import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "node_modules/lexical/LexicalEditorState";

type Props = {
	val: SerializedEditorState;
};

export default function LineRichtext({ val }: Props) {
	if (val)
		return (
			<Prose>
				<RichText data={val} />
			</Prose>
		);

	return <Text>Aucune information</Text>;
}
