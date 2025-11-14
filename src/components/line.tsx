import { Box, Flex, Heading } from "@chakra-ui/react";

type Props = {
	title: string;
	last?: boolean;
	content: React.ReactNode;
};

export default function Line({ title, last = false, content }: Props) {
	return (
		<Flex
			w={"full"}
			py={5}
			gap={{ base: 2, md: 5 }}
			flexDir={{ base: "column", md: "row" }}
			borderBottomColor={"blue.50"}
			borderBottomWidth={!last ? 1 : 0}
		>
			<Flex
				w={{ base: "full", md: "1/3" }}
				justifyContent={"start"}
				alignItems={"center"}
			>
				<Heading size={"md"}>{title}</Heading>
			</Flex>
			<Box h={"100"} bgColor={"blue.50"} w={0.5} rounded={"full"} />
			<Flex
				w={{ base: "full", md: "2/3" }}
				flexDir={"row"}
				justifyContent={"start"}
				alignItems={"center"}
			>
				{content}
			</Flex>
		</Flex>
	);
}
