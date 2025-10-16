import { Flex, type ConditionalValue } from "@chakra-ui/react";
import CategoryIcon from "~/components/ui/icons/category-icon";
import type { Category } from "~/payload/payload-types";
import Badge from "./badge";

type CategoryBadgeProps = {
	category: Category;
	size?: ConditionalValue<"md" | "sm" | "lg" | "xs" | undefined>;
};

const CategoryBadge = ({ category, size = "md" }: CategoryBadgeProps) => {
	if (!category) return;
	return (
		<Badge color={category.color} size={size}>
			<Flex gap={2} alignItems={"center"}>
				<CategoryIcon size={20} category={category} />
				{category.name}
			</Flex>
		</Badge>
	);
};

export default CategoryBadge;
