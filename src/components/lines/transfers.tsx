import { Flex, Text } from "@chakra-ui/react";
import { getPopulated } from "~/utils/payload-helpers";
import Badge from "../ui/badge/badge";
import type { ToolRichType } from "~/types/tool-rich-types";

type Props = {
	tool: ToolRichType;
};

export default function Transfers({ tool }: Props) {
	return (
		<Flex flexDir={"row"} flexWrap={"wrap"} gap={3} overflow={"auto"}>
			{tool.transfers && tool.transfers.length > 0 ? (
				tool.transfers.map(({ transfer }) => {
					const transferPopulated = getPopulated(transfer);
					if (transferPopulated)
						return (
							<Badge key={transferPopulated.id}>{transferPopulated.name}</Badge>
						);
				})
			) : (
				<Text>Aucune information</Text>
			)}
		</Flex>
	);
}
