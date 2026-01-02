import { Box, Text } from "@chakra-ui/react";
import type { ToolRichType } from "~/types/tool-rich-types";
import { api } from "~/utils/api";
import LineBoolean from "./line-types/line-boolean";
import Line from "./line";
import LineLink from "./line-types/line-link";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import LineRichtext from "./line-types/line-richtext";
import LineLocations from "./line-types/line-locations";
import LineChoice from "./line-types/line-choice";

type Props = {
	tool: ToolRichType;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const lineComponents: Record<string, (val: any) => React.ReactNode | null> = {
	boolean: (val) =>
		typeof val === "boolean" ? <LineBoolean val={val} /> : null,
	link: (val) =>
		val === null || typeof val === "string" ? <LineLink val={val} /> : null,
	richtext: (val) => <LineRichtext val={val} />,
	locations: (val) => <LineLocations val={val} />,
	choice: (val) => <LineChoice val={val} />,
};

export default function Lines({ tool }: Props) {
	const { data: lines } = api.line.getAll.useQuery();

	return (
		<Box px={6} rounded={"xl"} borderColor={"blue.50"} borderWidth={1}>
			{lines?.map((line, index) => {
				const title = line.name;
				const val = tool[line.slug as keyof ToolRichType];
				const isLast = index === lines.length - 1;

				const Component = lineComponents[line.type];
				if (!Component) return null;

				const content = Component(val);
				if (!content) return null;

				return (
					<Line key={line.slug} title={title} last={isLast} content={content} />
				);
			})}
		</Box>
	);
}
