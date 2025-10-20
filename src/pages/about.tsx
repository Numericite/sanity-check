import { Button, Flex, Heading, Tabs, Text } from "@chakra-ui/react";

export default function About() {
	return (
		<Flex gap={6} flexDir={"column"}>
			<Text fontSize={30} fontWeight={500}>
				À propos
			</Text>
			<Flex
				flexDir="column"
				alignItems="center"
				justifyContent="center"
				h="full"
				backgroundColor={"white"}
				p={10}
				gap={10}
				rounded={"3xl"}
				borderWidth={1}
				borderColor={"gray.100"}
			>
				<Flex>
					{/* <Tabs.Root defaultValue="presentation" unstyled>
						<Tabs.List>
							<Tabs.Trigger value="presentation">
								Présentation de l'outil
							</Tabs.Trigger>
							<Tabs.Trigger value="privacy_score">Privacy score</Tabs.Trigger>
							<Tabs.Trigger value="glossary">Glossaire</Tabs.Trigger>
						</Tabs.List>
						<Tabs.Content value="presentation">
							<Text>Présrntation</Text>
						</Tabs.Content>
						<Tabs.Content value="privacy_score">
							<Text>Privacy Score</Text>
						</Tabs.Content>
						<Tabs.Content value="glossary">
							<Text>glossaire</Text>
						</Tabs.Content>
					</Tabs.Root> */}
				</Flex>
			</Flex>
		</Flex>
	);
}
