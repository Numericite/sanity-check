import { Box, Flex, Text } from "@chakra-ui/react";

export default function Line({
	title,
	last = false,
	children,
}: {
	title: string;
	last?: boolean;
	children: React.ReactNode;
}) {
	return (
		<Flex
			w={"full"}
			py={5}
			gap={5}
			borderBottomColor={"blue.50"}
			borderBottomWidth={!last ? 1 : 0}
		>
			<Flex w={"1/3"} justifyContent={"start"} alignItems={"center"}>
				<Text>{title}</Text>
			</Flex>
			<Box h={"100"} bgColor={"blue.50"} w={0.5} rounded={"full"} />
			<Flex
				w={"2/3"}
				flexDir={"row"}
				justifyContent={"start"}
				alignItems={"center"}
			>
				{children}
			</Flex>
		</Flex>
	);
}
