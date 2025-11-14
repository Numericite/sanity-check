import { Flex, Text } from "@chakra-ui/react";
import type { ToolRichType } from "~/types/tool-rich-types";
import { getPopulated } from "~/utils/payload-helpers";
import Badge from "../ui/badge/badge";

type Props = {
	tool: ToolRichType;
};

export default function LocationsData({ tool }: Props) {
	return (
		<Flex flexDir={"row"} flexWrap={"wrap"} gap={3} overflow={"auto"}>
			{tool.locations_data && tool.locations_data.length > 0 ? (
				tool.locations_data.map(({ location }) => {
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
