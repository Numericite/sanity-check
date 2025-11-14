import { Flex, Text } from "@chakra-ui/react";
import { getPopulated } from "~/utils/payload-helpers";
import CategoryBadge from "../ui/badge/category-badge";
import type { ToolRichType } from "~/types/tool-rich-types";

type Props = {
	tool: ToolRichType;
};

export default function Categories({ tool }: Props) {
	return (
		<Flex flexDir={"row"} flexWrap={"wrap"} gap={3} overflow={"auto"}>
			{tool.categories && tool.categories.length > 0 ? (
				tool.categories.map(({ category }) => {
					const categoryPopulated = getPopulated(category);
					if (categoryPopulated)
						return (
							<CategoryBadge
								key={categoryPopulated.id}
								category={categoryPopulated}
							/>
						);
				})
			) : (
				<Text>Aucune catégorie</Text>
			)}
		</Flex>
	);
}
