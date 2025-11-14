import { Flex, Text } from "@chakra-ui/react";
import { getPopulated } from "~/utils/payload-helpers";
import Badge from "../ui/badge/badge";
import type { ToolRichType } from "~/types/tool-rich-types";

type Props = {
	tool: ToolRichType;
};

export default function LocationsHostClient({ tool }: Props) {
	return (
		<Flex flexDir={"row"} flexWrap={"wrap"} gap={3} overflow={"auto"}>
			{tool.locations_host_client && tool.locations_host_client.length > 0 ? (
				tool.locations_host_client.map(({ location }) => {
					const locationPopulated = getPopulated(location);
					if (locationPopulated)
						return (
							<Badge key={locationPopulated.id} color="blue">
								{locationPopulated.name}
							</Badge>
						);
				})
			) : (
				<Text>Aucune localisation</Text>
			)}
		</Flex>
	);
}
