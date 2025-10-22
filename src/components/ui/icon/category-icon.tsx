import { Icon, Skeleton } from "@chakra-ui/react";
import type { Category } from "~/payload/payload-types";

type CategoryIconProps = {
	category: Category | null;
	size?: number;
};

export default function CategoryIcon({
	category,
	size = 20,
}: CategoryIconProps) {
	if (!category) return <Skeleton rounded="full" boxSize={`${size}px`} />;

	return (
		<Icon color={`${category?.color}.600`} w={`${size}px`} h={`${size}px`}>
			{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
			<div dangerouslySetInnerHTML={{ __html: category.icon }} />
		</Icon>
	);
}
