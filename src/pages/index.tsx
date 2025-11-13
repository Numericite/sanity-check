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
import CarouselLayout from "~/components/ui/carousel/carousel-layout";
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

	const { data: categoryAI, error: errorCategoryAI } =
		api.category.getBySlug.useQuery("artificial-intelligence");

	const { data: toolsAI, isLoading: isLoadingToolsAI } =
		api.tool.getList.useQuery(
			{
				limit: 6,
				filters: [
					{ key: "categories.main", value: "true" },
					...(categoryAI
						? [{ key: "categories.category.id", value: categoryAI.id }]
						: []),
				],
				sort: ["privacy_score_saas"],
			},
			{
				initialData: Array.from({ length: 6 }),
				enabled: !!categoryAI,
			},
		);

	return (
		<>
			<Head>
				<title>Sanity Check</title>
				<meta
					name="description"
					content="Sanity Check vous aide à vérifier facilement la conformité RGPD et l’éthique des solutions numériques que vous utilisez. Analysez en quelques secondes si un site ou service respecte vos valeurs et vos données."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Box pt={{ base: 0, md: 62 }} p={4} pb={24}>
				<Flex
					flexDir="column"
					alignItems="center"
					justifyContent="center"
					mx={"auto"}
					w={{ base: "full", md: "2/3" }}
				>
					<Heading
						textAlign={"center"}
						size={{ base: "5xl", md: "6xl" }}
						fontWeight={700}
						mb={4}
					>
						Sanity Check
					</Heading>
					<Text
						fontSize={{ base: "lg", md: "xl" }}
						textAlign="center"
						color="gray.700"
					>
						Analyser simplement et rapidement
						<br />
						la conformité RGPD d'un site web tiers.
					</Text>
					<Flex alignItems="center" mt={8} gap={4}>
						<ChakraLink asChild>
							<NextLink href={"/categories"}>
								<Button colorPalette={"primary"} size={"lg"}>
									Catégories d'outils
								</Button>
							</NextLink>
						</ChakraLink>
						<ChakraLink asChild>
							<NextLink href={"/about"}>
								<Button color={"primary"} variant={"outline"} size={"lg"}>
									À propos
								</Button>
							</NextLink>
						</ChakraLink>
					</Flex>
					<SearchBar />
				</Flex>
				<Flex flexDir="column" pt={10} gap={6}>
					<Heading size="xl">Sélections d'outils en score A</Heading>
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
					<Flex justifyContent={"space-between"} alignItems={"center"} gap={5}>
						<Heading size={"xl"} w={"2/3"}>
							Catégories d'outils
						</Heading>
						<ChakraLink
							color={"blue.600"}
							textDecoration={"underline"}
							textUnderlineOffset={2}
							asChild
							textWrap={"nowrap"}
						>
							<NextLink href={"/categories"}>Voir plus</NextLink>
						</ChakraLink>
					</Flex>

					<CarouselLayout
						id="carousel-categories"
						items={categories}
						isLoading={isLoadingCategories}
						component={({ item, isLoading }) => (
							<CategoryCard category={item} isLoading={isLoading} />
						)}
					/>
				</Flex>
				<Flex flexDir="column" pt={10} gap={6}>
					<Heading size="xl">Sélections d'outils français</Heading>
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
					<Flex justifyContent={"space-between"} alignItems={"center"} gap={5}>
						<Heading size={"xl"}>
							Sélection d’outils d’Intelligence Artificielle
						</Heading>
						<ChakraLink
							color={"blue.600"}
							textDecoration={"underline"}
							textUnderlineOffset={2}
							asChild
							textWrap={"nowrap"}
						>
							<NextLink href={"/categories/13"}>Voir plus</NextLink>
						</ChakraLink>
					</Flex>

					<CarouselLayout
						id="carousel-toolsAI"
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
