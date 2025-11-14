import { Flex, Text } from "@chakra-ui/react";
import Badge from "../ui/badge/badge";
import type { ToolRichType } from "~/types/tool-rich-types";

type Props = {
	tool: ToolRichType;
};

export default function SubcontractorsInfra({ tool }: Props) {
	return (
		<Flex flexDir={"row"} flexWrap={"wrap"} gap={3} overflow={"auto"}>
			{tool.subcontractors_infra && tool.subcontractors_infra.length > 0 ? (
				tool.subcontractors_infra.map((infra) => (
					<Badge key={infra.id}>{infra.name}</Badge>
				))
			) : (
				<Text>Aucune fonctionnalité</Text>
			)}
		</Flex>
	);
}
