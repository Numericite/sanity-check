import {
	Box,
	Button,
	Flex,
	Grid,
	GridItem,
	Heading,
	Icon,
	IconButton,
	Input,
	Show,
	Text,
} from "@chakra-ui/react";
import { LuSearch, LuX } from "react-icons/lu";
import Head from "next/head";
import ToolCard from "~/components/ToolCard";
import { api } from "~/utils/api";
import { useState } from "react";

export default function Home() {
	const [isSearching, setIsSearching] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const { data: toolsWithAScore, isFetching: isLoadingToolsWithAScore } =
		api.tool.getList.useQuery(
			{
				limit: 6,
				filters: [{ key: "privacy_score_saas", value: "A" }],
			},
			{
				initialData: Array.from({ length: 6 }),
			},
		);

	const { data: toolsFrench, isFetching: isLoadingToolsFrench } =
		api.tool.getList.useQuery(
			{
				limit: 6,
				filters: [{ key: "enterprise_location", value: "France" }],
			},
			{
				placeholderData: Array.from({ length: 6 }),
			},
		);

	return (
		<>
			<Head>
				<title>Sanity Check</title>
				<meta name="description" content="Sanity Check" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Box mt={62} pb={24}>
				<Flex
					flexDir="column"
					alignItems="center"
					justifyContent="center"
					maxW="65%"
					mx="auto"
				>
					<Heading size="6xl" fontWeight={700} mb={4}>
						Sanity Check
					</Heading>
					<Text fontSize="xl" textAlign="center" color="gray.700">
						Analyser simplement et rapidement
						<br />
						la conformité RGPD d'un site web tiers.
					</Text>
					<Flex alignItems="center" mt={8} gap={4}>
						<Button colorPalette="primary" size="lg">
							Catégories d'outils
						</Button>
						<Button variant="outline" colorPalette="primary" size="lg">
							À propos
						</Button>
					</Flex>
					<Flex
						alignItems="center"
						bgColor={isSearching ? "blue.50" : "white"}
						borderRadius="full"
						px={4}
						py={3}
						mt={8}
						w="full"
						borderWidth={1}
						borderColor={isSearching ? "blue.500" : "gray.100"}
						transition="all 0.2s ease-in-out"
					>
						<Input
							placeholder="Rechercher un outil ou une catégorie"
							size="lg"
							w="full"
							variant="outline"
							outline="none"
							border="none"
							onFocus={() => setIsSearching(true)}
							onBlur={() => setIsSearching(false)}
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<Show when={searchTerm !== ""}>
							<IconButton
								aria-label="Annuler la recherche"
								bgColor={isSearching ? "white" : "gray.100"}
								borderRadius="full"
								size="2xs"
								p={0}
								mr={4}
								onClick={() => {
									setSearchTerm("");
									setIsSearching(false);
								}}
							>
								<Icon as={LuX} boxSize={3} color="blue.600" />
							</IconButton>
						</Show>
						<IconButton
							aria-label="Rechercher un outil"
							borderRadius="full"
							p={6}
							flex={1}
							colorPalette={isSearching ? "primary" : "black"}
						>
							<Icon as={LuSearch} boxSize={6} />
						</IconButton>
					</Flex>
				</Flex>
				<Flex flexDir="column" mt={12}>
					<Heading size="xl" fontWeight={500} mb={4}>
						Sélections d'outils en score A
					</Heading>
					<Grid
						templateColumns={{
							base: "1fr",
							sm: "repeat(2, 1fr)",
							md: "repeat(3, 1fr)",
						}}
						gap={6}
					>
						{toolsWithAScore?.map((tool, index) => (
							<GridItem key={tool?.id ? tool.id : `tool-${index}`}>
								<ToolCard
									tool={tool?.id ? tool : null}
									isLoading={isLoadingToolsWithAScore}
								/>
							</GridItem>
						))}
					</Grid>
				</Flex>
				<Flex flexDir="column" mt={12}>
					<Heading size="xl" fontWeight={500} mb={4}>
						Catégories d'outils
					</Heading>
				</Flex>
				<Flex flexDir="column" mt={12}>
					<Heading size="xl" fontWeight={500} mb={4}>
						Sélections d'outils français
					</Heading>
					<Grid
						templateColumns={{
							base: "1fr",
							sm: "repeat(2, 1fr)",
							md: "repeat(3, 1fr)",
						}}
						gap={6}
					>
						{toolsFrench?.map((tool, index) => (
							<GridItem key={tool?.id ? tool.id : `tool-${index}`}>
								<ToolCard
									tool={tool?.id ? tool : null}
									isLoading={isLoadingToolsFrench}
								/>
							</GridItem>
						))}
					</Grid>
				</Flex>
			</Box>
		</>
	);
}
