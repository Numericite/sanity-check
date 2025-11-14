import { Flex, Text } from "@chakra-ui/react";
import { getPopulated } from "~/utils/payload-helpers";
import Badge from "../ui/badge/badge";
import type { ToolRichType } from "~/types/tool-rich-types";

type Props = {
	tool: ToolRichType;
};

export default function Certifications({ tool }: Props) {
	return (
		<Flex flexDir={"row"} flexWrap={"wrap"} gap={3} overflow={"auto"}>
			{tool.certifications && tool.certifications.length > 0 ? (
				tool.certifications.map(({ certification }) => {
					const certificationPopulated = getPopulated(certification);
					if (certificationPopulated)
						return (
							<Badge key={certificationPopulated.id}>
								{certificationPopulated.name}
							</Badge>
						);
				})
			) : (
				<Text>Aucune certification</Text>
			)}
		</Flex>
	);
}
