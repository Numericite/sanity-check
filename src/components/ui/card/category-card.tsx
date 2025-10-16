import { Button, Flex, Skeleton, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import type { Category } from "~/payload/payload-types";
import CategoryIcon from "../icons/category-icon";
import Badge from "../badge/badge";

type CategoryCardProps = {
	category: Category | null;
	isLoading?: boolean;
};

export default function CategoryCard({
	category,
	isLoading,
}: CategoryCardProps) {
	return (
		<Skeleton loading={isLoading}>
			<Flex
				p={5}
				rounded={"3xl"}
				bg={"white"}
				borderWidth={1}
				borderColor={"gray.100"}
				gap={5}
				flexDir={"column"}
			>
				{/* Icon */}
				<Flex
					w={"full"}
					h={36}
					bg={`${category?.color}.50`}
					rounded={"2.5xl"}
					p={3}
					gap={1}
					justifyContent={"center"}
					alignItems={"center"}
				>
					<CategoryIcon size={60} category={category} />
				</Flex>

				{/* Title & count tools */}
				<Flex justifyContent={"space-between"} alignItems={"center"}>
					<Text fontSize={20} fontWeight={500}>
						{category?.name}
					</Text>
					<Badge>
						{category?.tools?.length} outil
						{category?.tools?.length && category?.tools?.length > 1 ? "s" : ""}
					</Badge>
				</Flex>

				<Text fontSize={14} fontWeight={300}>
					{category?.description}
				</Text>

				<NextLink href={`/categories/${category?.id}`}>
					<Button w={"full"} variant={"outline"}>
						Voir les outils
					</Button>
				</NextLink>
			</Flex>
		</Skeleton>
	);
}
