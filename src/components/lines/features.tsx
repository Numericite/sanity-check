import { Flex, Text } from "@chakra-ui/react";
import { getPopulated } from "~/utils/payload-helpers";
import Badge from "../ui/badge/badge";
import type { ToolRichType } from "~/types/tool-rich-types";

type Props = {
	tool: ToolRichType;
};

export default function Features({ tool }: Props) {
	return (
		<Flex flexDir={"row"} flexWrap={"wrap"} gap={3} overflow={"auto"}>
			{tool.features && tool.features.length > 0 ? (
				tool.features.map(({ feature }) => {
					const featurePopulated = getPopulated(feature);
					if (featurePopulated)
						return (
							<Badge key={featurePopulated.id}>{featurePopulated.name}</Badge>
						);
				})
			) : (
				<Text>Aucune fonctionnalité</Text>
			)}
		</Flex>
	);
}
