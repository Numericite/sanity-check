import { Button, Flex, Heading, Skeleton, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import type { Category } from "~/payload/payload-types";
import CategoryIcon from "../icon/category-icon";
import Badge from "../badge/badge";

type CategoryCardProps = {
	category: Category | null;
	isLoading?: boolean;
};

export default function CategoryCard({
	category,
	isLoading,
}: CategoryCardProps) {
	const categoriesLength = category?.relatedTools?.docs?.length ?? 0;

	return (
		<Skeleton loading={isLoading} w={"full"}>
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
					bg={`${category?.color ?? "gray"}.50`}
					rounded={"2.5xl"}
					p={3}
					gap={1}
					justifyContent={"center"}
					alignItems={"center"}
					borderWidth={1}
					borderColor={`${category?.color ?? "gray"}.100`}
				>
					<CategoryIcon size={16} category={category} />
				</Flex>

				{/* Title & count tools */}
				<Flex
					justifyContent={"space-between"}
					alignItems={{ base: "start", md: "center" }}
					flexDir={{ base: "column", md: "row" }}
					gap={1}
				>
					<Heading size={"lg"}>{category?.name ?? "Chargement..."}</Heading>
					<Badge>
						{categoriesLength} outil
						{categoriesLength && categoriesLength > 1 ? "s" : ""}
					</Badge>
				</Flex>

				<Text
					fontSize={"sm"}
					lineClamp={3}
					lineHeight={1.5}
					h={"calc(1.5em * 3)"}
				>
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
