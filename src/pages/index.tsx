import {
	Box,
	Button,
	Link as ChakraLink,
	Flex,
	Grid,
	GridItem,
	Heading,
	Text,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import SearchBar from "~/components/search/search-bar";
import CategoryCard from "~/components/ui/card/category-card";
import ToolCard from "~/components/ui/card/tool-card";
import Carousel from "~/components/ui/carousel/carousel";
import { api } from "~/utils/api";

export default function Home() {
	const { data: toolsWithAScore, isFetching: isLoadingToolsWithAScore } =
		api.tool.getList.useQuery(
			{
				limit: 6,
				filters: [{ key: "privacy_score_saas", value: "A" }],
				sort: ["random"],
			},
			{
				initialData: Array.from({ length: 6 }),
			},
		);

	const { data: categories, isLoading: isLoadingCategories } =
		api.category.getList.useQuery(
			{
				limit: 6,
			},
			{
				initialData: Array.from({ length: 6 }),
			},
		);

	const { data: toolsFrench, isLoading: isLoadingToolsFrench } =
		api.tool.getList.useQuery(
			{
				limit: 6,
				filters: [
					{ key: "locations_enterprise.location.name", value: "🇫🇷 France" },
					{ key: "privacy_score_saas", value: "A" },
				],
				sort: ["random"],
			},
			{
				initialData: Array.from({ length: 6 }),
			},
		);

	const { data: toolsAI, isLoading: isLoadingToolsAI } =
		api.tool.getList.useQuery(
			{
				limit: 6,
				filters: [
					{ key: "categories.category.id", value: "13" },
					{ key: "categories.main", value: "true" },
				],
				sort: ["privacy_score_saas"],
			},
			{
				initialData: Array.from({ length: 6 }),
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
					<SearchBar />
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
				<Flex pt={10} gap={6} flexDir={"column"}>
					<Flex justifyContent={"space-between"} alignItems={"center"}>
						<Text fontSize={20} fontWeight={500}>
							Catégories d'outils
						</Text>
						<ChakraLink
							color={"blue.600"}
							textDecoration={"underline"}
							textUnderlineOffset={2}
							asChild
						>
							<NextLink href={"/categories"}>Voir plus</NextLink>
						</ChakraLink>
					</Flex>

					<Carousel
						items={categories}
						isLoading={isLoadingCategories}
						component={({ item, isLoading }) => (
							<CategoryCard category={item} isLoading={isLoading} />
						)}
					/>
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
				<Flex pt={10} gap={6} flexDir={"column"}>
					<Flex justifyContent={"space-between"} alignItems={"center"}>
						<Text fontSize={20} fontWeight={500}>
							Sélection d’outils d’Intelligence Artificielle
						</Text>
						<ChakraLink
							color={"blue.600"}
							textDecoration={"underline"}
							textUnderlineOffset={2}
							asChild
						>
							<NextLink href={"/categories/13"}>Voir plus</NextLink>
						</ChakraLink>
					</Flex>

					<Carousel
						items={toolsAI}
						isLoading={isLoadingToolsAI}
						component={({ item, isLoading }) => (
							<ToolCard tool={item} isLoading={isLoading} />
						)}
					/>
				</Flex>
			</Box>
		</>
	);
}
