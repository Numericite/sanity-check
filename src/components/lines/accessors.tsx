import { Flex, Text } from "@chakra-ui/react";
import { getPopulated } from "~/utils/payload-helpers";
import Badge from "../ui/badge/badge";
import type { ToolRichType } from "~/types/tool-rich-types";

type Props = {
	tool: ToolRichType;
};

export default function Accessors({ tool }: Props) {
	return (
		<Flex flexDir={"row"} flexWrap={"wrap"} gap={3} overflow={"auto"}>
			{tool.accessors && tool.accessors.length > 0 ? (
				tool.accessors.map(({ accessor }) => {
					const accessorPopulated = getPopulated(accessor);
					if (accessorPopulated)
						return (
							<Badge key={accessorPopulated.id}>{accessorPopulated.name}</Badge>
						);
				})
			) : (
				<Text>Aucune information</Text>
			)}
		</Flex>
	);
}
