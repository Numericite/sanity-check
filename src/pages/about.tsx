import { Flex, Heading } from "@chakra-ui/react";
import Presentation from "~/components/about-tabs/presentation";
import PrivacyScore from "~/components/about-tabs/privacy-score";
import Glossary from "~/components/about-tabs/glossary";
import TabLayout from "~/components/ui/tab/tab-layout";
import Head from "next/head";

export default function About() {
	return (
		<>
			<Head>
				<title>À propos - Sanity Check</title>
				<meta
					name="description"
					content="Découvrez comment fonctionne Sanity Check, notre système de notation éthique et RGPD. Comprenez le Privacy Score et explorez notre glossaire pour mieux maîtriser l’éthique numérique."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Flex
				bgColor={{ base: "white", md: "transparent" }}
				gap={4}
				flexDir={"column"}
				py={{ base: 4, md: 10 }}
			>
				<Heading px={{ base: 4, md: 10 }} size={"2xl"}>
					À propos
				</Heading>
				<Flex
					flexDir="column"
					alignItems="center"
					justifyContent="center"
					h="full"
					backgroundColor={"white"}
					p={{ base: 2, md: 10 }}
					gap={10}
					rounded={{ base: "none", md: "3xl" }}
					borderWidth={1}
					borderColor={{ base: "transparent", md: "gray.100" }}
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
		</>
	);
}
