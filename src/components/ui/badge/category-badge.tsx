import { Badge } from "@chakra-ui/react";
import CategoryIcon from "~/components/ui/icons/category-icon";
import type { Category } from "~/payload/payload-types";

type Variant = "default" | "sm";

type CategoryBadgeProps = {
  category: Category;
  variant?: Variant;
};

const styles = {
  default: { fontSize: 16, px: 2.5, py: 2 },
  sm: { fontSize: 14, px: 2, py: 1 },
};

const CategoryBadge = ({
  category,
  variant = "default",
}: CategoryBadgeProps) => {
  if (!category) return;
  return (
    <Badge
      bgColor={`${category.color}.50`}
      borderColor={`${category.color}.100`}
      borderWidth={1}
      gap={2}
      alignItems={"center"}
      fontWeight={500}
      w={"fit"}
      {...styles[variant]}
    >
      <CategoryIcon size={20} category={category} />
      {category.name}
    </Badge>
  );
};

export default CategoryBadge;
