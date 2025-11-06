import { Box, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Badge from "~/components/ui/badge/badge";
import BreadcrumbLayout from "~/components/ui/breadcrumb/breadcrumb-layout";
import CategoryCard from "~/components/ui/card/category-card";
import ToolCard from "~/components/ui/card/tool-card";
import CategoryIcon from "~/components/ui/icon/category-icon";
import { api } from "~/utils/api";
import FiltersSidebar from "~/components/categories-filters";
import { useCategoryFilters } from "~/hooks/use-categories-filters";
import CategoryDrawer from "~/components/category-drawer";
import Head from "next/head";
import CarouselLayout from "~/components/ui/carousel/carousel-layout";

export default function Category() {
	const router = useRouter();
	const { id } = router.query;

	const {
		search,
		setSearch,
		scores,
		dpa,
		locations,
		certifications,
		handleScore,
		handleLocation,
		handleCertification,
		setDpa,
		filters,
	} = useCategoryFilters();

	const { data: tools, isLoading: isLoadingTools } = api.tool.getList.useQuery(
		{
			limit: 0,
			sort: ["privacy_score_saas", "dpa_compliant"],
			filters: [
				{ key: "categories.category", value: (id ?? 0).toString() },
				...filters,
			],
		},
		{ enabled: !!id },
	);

	const { data: category, isLoading } = api.category.getById.useQuery(
		Number(id),
		{
			enabled: !!id,
		},
	);

	const { data: categories, isLoading: isLoadingCategories } =
		api.category.getList.useQuery(
			{
				limit: 6,
				filters: [
					{ key: "id", operation: "not_equals", value: (id ?? 0).toString() },
				],
			},
			{
				initialData: Array.from({ length: 6 }),
			},
		);

	return (
		<>
			<Head>
				<title>{category?.name ?? "Catégorie"} - Sanity Check</title>
				<meta
					name="description"
					content={
						category?.description ??
						"Explorez les outils disponibles sur Sanity Check pour cette catégorie et trouvez facilement ceux qui répondent à vos besoins en matière d’éthique et de conformité RGPD."
					}
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Flex
				bgColor={{ base: "white", md: "transparent" }}
				gap={4}
				flexDir={"column"}
				py={{ base: 4, md: 10 }}
			>
				<BreadcrumbLayout
					items={[
						{ label: "Catégorie d’outils", link: "/categories" },
						{ label: category?.name ?? "" },
					]}
				/>

				<Flex
					flexDir="column"
					h="full"
					backgroundColor={"white"}
					gap={{ base: 3, md: 7 }}
					borderWidth={1}
					p={{ base: 2.5, md: 5 }}
					rounded={{ base: "none", md: "2.5xl" }}
					borderColor={{ base: "transparent", md: "gray.100" }}
				>
					<Flex flexDir={"column"} w={"full"}>
						<Flex
							bgColor={`${category?.color}.50`}
							rounded={"2.5xl"}
							justifyContent={"end"}
							alignItems={"center"}
							p={5}
							h={{ base: 16, md: 36 }}
							w={"full"}
							backgroundColor={`${category?.color}.50`}
							borderColor={`${category?.color}.100`}
							borderWidth={1}
						>
							<Box opacity={"20%"} rotate={"-17"}>
								<CategoryIcon
									category={category ?? null}
									size={{ base: 12, md: 32 }}
								/>
							</Box>
						</Flex>
						<Flex
							alignItems={"center"}
							w={"full"}
							my={4.5}
							gap={{ base: 2.5, md: 5 }}
						>
							<Flex pl={{ base: 0, md: 10 }}>
								<Box
									bgColor={"white"}
									borderColor={"gray.100"}
									borderWidth={1}
									rounded={"full"}
									mt={{ base: 0, md: "-10" }}
									p={2}
								>
									<CategoryIcon
										category={category ?? null}
										size={{ base: 16, md: 28 }}
									/>
								</Box>
							</Flex>

							<Flex
								gap={{ base: 1, md: 5 }}
								w={"full"}
								flexDir={{ base: "column", md: "row" }}
							>
								<Heading size={{ base: "2xl", md: "4xl" }}>
									{category?.name}
								</Heading>
								<Flex
									gap={2}
									flex={1}
									alignItems={"center"}
									justifyContent={{ base: "start", md: "space-between" }}
								>
									{category && (
										<Badge size={{ base: "md", md: "lg" }}>
											{category?.relatedTools?.docs?.length} outil
											{category?.relatedTools?.docs?.length &&
											category?.relatedTools.docs.length > 1
												? "s"
												: ""}
										</Badge>
									)}
									<CategoryDrawer category={category} />
								</Flex>
							</Flex>
						</Flex>
					</Flex>
					<Grid
						templateColumns={{
							base: "1fr",
							sm: "25% 75%",
						}}
						w={"full"}
						gap={6}
					>
						<GridItem>
							<FiltersSidebar
								search={search}
								setSearch={setSearch}
								scores={scores}
								dpa={dpa}
								locations={locations}
								certifications={certifications}
								handleScore={handleScore}
								handleLocation={handleLocation}
								handleCertification={handleCertification}
								setDpa={setDpa}
							/>
						</GridItem>
						<GridItem>
							<Grid
								templateColumns={{
									base: "1fr",
									sm: "repeat(2, 1fr)",
								}}
								h={"fit"}
								w={"full"}
								gap={6}
							>
								{isLoadingTools &&
									Array.from({ length: 6 }).map((_, index) => (
										<GridItem key={`skeleton-${index}`}>
											<ToolCard tool={null} isLoading hideCategory />
										</GridItem>
									))}

								{!isLoadingTools && tools?.length === 0 && (
									<GridItem colSpan={2} textAlign={"center"}>
										<Text fontSize={18} color="gray.500">
											Aucun résultat
										</Text>
									</GridItem>
								)}

								{!isLoadingTools &&
									tools &&
									tools?.length > 0 &&
									tools.map((tool) => (
										<GridItem key={tool.id} minW={0}>
											<ToolCard tool={tool} isLoading={false} hideCategory />
										</GridItem>
									))}
							</Grid>
						</GridItem>
					</Grid>

					<Flex pt={10} px={4} gap={6} flexDir={"column"}>
						<Text fontSize={20} fontWeight={500}>
							Autres catégories
						</Text>

						<CarouselLayout
							id="carousel-categories"
							items={categories}
							isLoading={isLoadingCategories}
							component={({ item, isLoading }) => (
								<CategoryCard category={item} isLoading={isLoading} />
							)}
						/>
					</Flex>
				</Flex>
			</Flex>
		</>
	);
}
