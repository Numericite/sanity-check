import { Box, Link as ChakraLink, Flex, Heading, Text } from "@chakra-ui/react";
import type { Category } from "~/payload/payload-types";
import NextLink from "next/link";
import CategoryIcon from "../ui/icon/category-icon";
import Badge from "../ui/badge/badge";

type Props = {
	category: Category;
};

export default function SearchCategory({ category }: Props) {
	return (
		<ChakraLink
			_hover={{ textDecoration: "none" }}
			_focus={{ outline: "none" }}
			asChild
			w={"full"}
		>
			<NextLink href={`/categories/${category.id}`} passHref>
				<Flex
					borderWidth={1}
					borderColor={"gray.100"}
					rounded={"2xl"}
					p={{ base: 3, md: 4 }}
					gap={4}
					w={"full"}
				>
					<Box
						p={2}
						h={"fit"}
						rounded={"2.5xl"}
						bgColor={`${category.color}.50`}
						borderWidth={1}
						borderColor={`${category.color}.100`}
					>
						<CategoryIcon size={14} category={category} />
					</Box>
					<Flex flexDir={"column"} w={"full"} gap={3}>
						<Flex
							alignItems={"start"}
							justifyContent={{ base: "start", md: "space-between" }}
							flexDir={{ base: "column", md: "row" }}
						>
							<Heading size={"md"}>{category.name}</Heading>
							<Badge>
								{category.relatedTools?.docs?.length} outil
								{(category.relatedTools?.docs?.length ?? 0) > 1 ? "s" : ""}
							</Badge>
						</Flex>
						<Text fontSize={14} fontWeight={300} color={"gray.600"}>
							{category.description}
						</Text>
					</Flex>
				</Flex>
			</NextLink>
		</ChakraLink>
	);
}
