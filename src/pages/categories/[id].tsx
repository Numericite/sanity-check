import { Box, Button, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Badge from "~/components/ui/badge/badge";
import BreadcrumbLayout from "~/components/ui/breadcrumb/breadcrumb-layout";
import CategoryCard from "~/components/ui/card/category-card";
import ToolCard from "~/components/ui/card/tool-card";
import Carousel from "~/components/ui/carousel/carousel";
import CategoryIcon from "~/components/ui/icon/category-icon";
import { useDebounce } from "~/hooks/use-debounce";
import { api } from "~/utils/api";
import FiltersSidebar from "~/components/categories-filters";
import { useCategoryFilters } from "~/hooks/use-categories-filters";
import CategoryDrawer from "~/components/category-drawer";

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
		<Flex gap={6} flexDir={"column"} py={10}>
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
				p={5}
				gap={7}
				rounded={"2.5xl"}
				borderWidth={1}
				borderColor={"gray.100"}
			>
				<Flex flexDir={"column"} w={"full"}>
					<Flex
						h={36}
						w={"full"}
						bgColor={`${category?.color}.50`}
						borderWidth={1}
						borderColor={`${category?.color}.100`}
						rounded={"2.5xl"}
						justifyContent={"end"}
						alignItems={"center"}
						p={5}
					>
						<Box opacity={"20%"} rotate={"-17"}>
							<CategoryIcon category={category ?? null} size={121} />
						</Box>
					</Flex>
					<Flex
						w={"full"}
						pl={10}
						justifyContent={"space-between"}
						alignItems={"end"}
						mt={-8}
					>
						<Flex gap={5} alignItems={"end"} justifyContent={"start"}>
							<Flex
								w={32}
								h={32}
								bgColor={"white"}
								borderColor={"gray.100"}
								borderWidth={1}
								rounded={"full"}
								gap={2.5}
								justifyContent={"center"}
								alignItems={"center"}
								p={2}
							>
								<CategoryIcon category={category ?? null} size={80} />
							</Flex>

							<Flex h={24} alignItems={"center"} gap={5}>
								<Text fontSize={40} fontWeight={500}>
									{category?.name}
								</Text>
								{category && (
									<Badge size={"lg"}>
										{category?.relatedTools?.docs?.length} outil
										{category?.relatedTools?.docs?.length &&
										category?.relatedTools.docs.length > 1
											? "s"
											: ""}
									</Badge>
								)}
							</Flex>
						</Flex>

						<Flex h={24} alignItems={"center"}>
							<CategoryDrawer category={category} />
						</Flex>
					</Flex>
				</Flex>

				<Flex w={"full"} gap={6}>
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

					<Grid
						templateColumns={{
							base: "1fr",
							sm: "repeat(2, 1fr)",
							md: "repeat(2, 1fr)",
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
				</Flex>
				<Flex pt={10} gap={6} flexDir={"column"}>
					<Text fontSize={20} fontWeight={500}>
						Autres catégories
					</Text>

					<Carousel
						items={categories}
						isLoading={isLoadingCategories}
						component={({ item, isLoading }) => (
							<CategoryCard category={item} isLoading={isLoading} />
						)}
					/>
				</Flex>
			</Flex>
		</Flex>
	);
}
