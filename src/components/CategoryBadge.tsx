import { Badge } from "@chakra-ui/react";
import CategoryIcon from "./CategoryIcon";
import { icons } from "./Icons";

type CategoryBadgeProps = {
  category: keyof typeof icons;
};

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const badgeColor = {
    Hébergement: { bgColor: "orange.50" },
  }[category] || { bgColor: "gray.50" };

  return (
    <Badge
      bgColor={badgeColor.bgColor}
      fontSize={16}
      fontWeight={500}
      lineHeight="0.7"
      p={2.5}
    >
      <CategoryIcon size={20} category={category} />
      {category}
    </Badge>
  );
};

export default CategoryBadge;
