import { Flex, Text } from "@chakra-ui/react";
import { getPopulated } from "~/utils/payload-helpers";
import Badge from "../ui/badge/badge";
import type { ToolRichType } from "~/types/tool-rich-types";

type Props = {
	tool: ToolRichType;
};

export default function LocationsFinalUsers({ tool }: Props) {
	return (
		<Flex flexDir={"row"} flexWrap={"wrap"} gap={3} overflow={"auto"}>
			{tool.locations_final_users && tool.locations_final_users.length > 0 ? (
				tool.locations_final_users.map(({ location }) => {
					const locationPopulated = getPopulated(location);
					if (locationPopulated)
						return (
							<Badge color="blue" key={locationPopulated.id}>
								{locationPopulated.name}
							</Badge>
						);
				})
			) : (
				<Text>Aucune information</Text>
			)}
		</Flex>
	);
}
