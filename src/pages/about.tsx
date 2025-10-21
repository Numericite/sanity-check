import { Flex, Text } from "@chakra-ui/react";
import Presentation from "~/components/about-tabs/presentation";
import PrivacyScore from "~/components/about-tabs/privacy-score";
import Glossary from "~/components/about-tabs/glossary";
import TabLayout from "~/components/ui/tab/tab-layout";

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
				<TabLayout
					defaultValue={"presentation"}
					items={[
						{
							key: "presentation",
							label: "Présentation de l'outil",
							content: <Presentation />,
						},
						{
							key: "privacy_score",
							label: "Privacy Score",
							content: <PrivacyScore />,
						},
						{
							key: "glossary",
							label: "Glossaire",
							content: <Glossary />,
						},
					]}
				/>
			</Flex>
		</Flex>
	);
}
