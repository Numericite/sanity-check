import { Flex, Heading, Text } from "@chakra-ui/react";

export default function About() {
	return (
		<Flex gap={6} flexDir={"column"}>
			<Text fontSize={30} fontWeight={500}>
				Catégories d'outils
			</Text>
			<Flex
				flexDir="column"
				alignItems="center"
				justifyContent="center"
				h="full"
				backgroundColor={"white"}
				p={5}
				rounded={"3xl"}
			>
				<Text>Test</Text>
			</Flex>
		</Flex>
	);
}
