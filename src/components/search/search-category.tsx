import { Link as ChakraLink, Flex, Text } from "@chakra-ui/react";
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
					p={4}
					gap={4}
					w={"full"}
				>
					<Flex
						w={20}
						h={20}
						rounded={"2.5xl"}
						bgColor={`${category.color}.50`}
						borderWidth={1}
						borderColor={`${category.color}.100`}
						justifyContent={"center"}
						alignItems={"center"}
					>
						<CategoryIcon size={52} category={category} />
					</Flex>
					<Flex flexDir={"column"} w={"full"} gap={3}>
						<Flex justifyContent={"space-between"}>
							<Text fontSize={20} fontWeight={500}>
								{category.name}
							</Text>
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
