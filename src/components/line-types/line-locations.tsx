import { Flex, Text } from "@chakra-ui/react";
import { getPopulated } from "~/utils/payload-helpers";
import Badge from "../ui/badge/badge";
import type { Location } from "~/payload/payload-types";

type Props = {
	val:
		| {
				location: number | Location;
				id?: string | null;
		  }[]
		| null;
};

export default function LineLocations({ val }: Props) {
	return (
		<Flex flexDir={"row"} flexWrap={"wrap"} gap={3} overflow={"auto"}>
			{val && val.length > 0 ? (
				val.map(({ location }) => {
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
