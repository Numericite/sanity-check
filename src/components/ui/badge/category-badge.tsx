import { Badge, type ConditionalValue } from "@chakra-ui/react";
import CategoryIcon from "~/components/ui/icons/category-icon";
import type { Category } from "~/payload/payload-types";

type CategoryBadgeProps = {
	category: Category;
	size?: ConditionalValue<"md" | "sm" | "lg" | "xs" | undefined>;
};

const CategoryBadge = ({ category, size = "md" }: CategoryBadgeProps) => {
	if (!category) return;
	return (
		<Badge
			bgColor={`${category.color}.50`}
			borderColor={`${category.color}.100`}
			borderWidth={1}
			gap={2}
			alignItems={"center"}
			fontWeight={400}
			size={size}
			fontSize={size === "lg" ? 16 : undefined}
		>
			<CategoryIcon size={20} category={category} />
			{category.name}
		</Badge>
	);
};

export default CategoryBadge;
