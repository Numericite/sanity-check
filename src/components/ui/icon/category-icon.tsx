import { Icon, Skeleton, type ConditionalValue } from "@chakra-ui/react";
import type { Category } from "~/payload/payload-types";

type CategoryIconProps = {
	category: Category | null;
	size?: ConditionalValue<number>;
};

export default function CategoryIcon({
	category,
	size = 20,
}: CategoryIconProps) {
	if (!category) return <Skeleton rounded="full" h={size} w={size} />;

	return (
		<Icon color={`${category?.color}.600`} w={size} h={size}>
			{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
			<div dangerouslySetInnerHTML={{ __html: category.icon }} />
		</Icon>
	);
}
