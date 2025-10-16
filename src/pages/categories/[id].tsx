import {
	Badge,
	Box,
	Button,
	Flex,
	Grid,
	GridItem,
	Input,
	InputGroup,
	Separator,
	Switch,
	Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import PrivacyScoreBadge from "~/components/ui/badge/privacy-score-badge";
import BreadcrumbLayout from "~/components/ui/breadcrumb/breadcrumb-layout";
import CategoryCard from "~/components/ui/card/category-card";
import ToolCard from "~/components/ui/card/tool-card";
import Caroussel from "~/components/ui/caroussel/caroussel";
import CategoryIcon from "~/components/ui/icons/category-icon";
import Search from "~/components/ui/icons/search";
import { api } from "~/utils/api";

type scores = "A" | "B" | "C" | "D" | "E" | "F";

export default function Category() {
	const router = useRouter();
	const { id } = router.query;

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
				borderRadius={20}
				borderWidth={1}
				borderColor={"gray.100"}
			>
				{/* Header */}
				<Flex flexDir={"column"} w={"full"}>
					{/* Banner */}
					<Flex
						h={36}
						w={"full"}
						bgColor={`${category?.color}.50`}
						borderWidth={1}
						borderColor={`${category?.color}.100`}
						borderRadius={20}
						justifyContent={"end"}
						alignItems={"center"}
						p={5}
					>
						<Box opacity={"20%"} rotate={"-17"}>
							<CategoryIcon category={category ?? null} size={121} />
						</Box>
					</Flex>
					{/* Logo + Title + Button */}
					<Flex
						w={"full"}
						pl={10}
						justifyContent={"space-between"}
						alignItems={"end"}
						mt={-8}
					>
						{/* Logo + Title + Count */}
						<Flex gap={5} alignItems={"end"} justifyContent={"start"}>
							{/* Icon */}
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

							{/* Title & Count */}
							<Flex h={24} alignItems={"center"} gap={5}>
								<Text fontSize={40} fontWeight={500}>
									{category?.name}
								</Text>
								{category && (
									<Badge bgColor={"gray.50"} px={3} py={2}>
										<Text fontSize={20} fontWeight={400} color={"gray.600"}>
											{category?.tools?.length} outil
											{category?.tools?.length && category?.tools?.length > 1
												? "s"
												: ""}
										</Text>
									</Badge>
								)}
							</Flex>
						</Flex>

						<Flex h={24} alignItems={"center"}>
							<Button variant={"outline"}>En savoir plus</Button>
						</Flex>
					</Flex>
				</Flex>

				{/* Content */}
				<Flex w={"full"} gap={6}>
					{/* Filters */}
					<Flex
						flexDir={"column"}
						w={"1/3"}
						px={5}
						py={6}
						borderWidth={1}
						borderColor={"gray.200"}
						borderRadius={16}
						gap={7}
						h={"fit"}
					>
						<Text fontSize={24} fontWeight={500}>
							Filtres
						</Text>

						{/* Recherche */}
						<Flex flexDir={"column"} gap={3}>
							<Text fontSize={16} fontWeight={400}>
								Rechercher
							</Text>
							<InputGroup>
								<Flex
									bgColor={"gray.50"}
									borderRadius={12}
									py={4}
									px={5}
									gap={3}
									borderWidth={1}
									borderColor={"gray.200"}
									alignItems={"center"}
									transition="all 0.2s"
									_focusWithin={{
										borderColor: "blue.500",
										bgColor: "blue.50",
									}}
								>
									<Search />
									<Input
										name="search"
										id="search"
										placeholder="Rechercher un outils"
										bgColor={"transparent"}
										outline={"none"}
										unstyled
										fontSize={16}
										fontWeight={400}
									/>
									{/* <Button
                    variant={"ghost"}
                    size={"xs"}
                    p={0.5}
                    m={0}
                  >
                    <IoMdClose />
                  </Button> */}
								</Flex>
							</InputGroup>
						</Flex>
						<Separator />

						{/* Badges Privacy Score */}
						<Flex flexDir={"column"} gap={3}>
							<Text fontSize={16} fontWeight={400}>
								Score :
							</Text>
							<Flex gap={2}>
								{(["A", "B", "C", "D", "E", "F"] as const).map(
									(score, index) => (
										<Button key={index} unstyled cursor={"pointer"}>
											<PrivacyScoreBadge score={score} active={false} />
										</Button>
									),
								)}
							</Flex>
						</Flex>
						<Separator />

						{/* DPA */}
						<Flex flexDir={"column"} gap={3}>
							<Text fontSize={16} fontWeight={400}>
								DPA :
							</Text>
							<Flex gap={2}>
								<Switch.Root colorPalette={"blue"}>
									<Switch.HiddenInput />
									<Switch.Control>
										<Switch.Thumb />
									</Switch.Control>
									<Switch.Label fontSize={14} fontWeight={500}>
										DPA conforme
									</Switch.Label>
								</Switch.Root>
							</Flex>
						</Flex>
						<Separator />

						{/* Lieu d'hébergement des données */}
						<Flex flexDir={"column"} gap={3}>
							<Text fontSize={16} fontWeight={400}>
								Lieu d'hébergement des données :
							</Text>
							<Flex gap={2} flexWrap={"wrap"}>
								{["🇪🇺 UE", "🇺🇸 Amérique du Nord"].map((location, index) => (
									<Badge
										key={index}
										bgColor={"blue.50"}
										borderRadius={"full"}
										borderColor={"blue.100"}
										borderWidth={1}
										px={3}
										py={2}
									>
										<Text fontSize={14} fontWeight={400} color={"blue.950"}>
											{location}
										</Text>
									</Badge>
								))}
							</Flex>
						</Flex>
						<Separator />

						{/* Localisation de l'entreprise */}
						<Flex flexDir={"column"} gap={3}>
							<Text fontSize={16} fontWeight={400}>
								Localisation de l'entreprise :
							</Text>
							<Flex gap={2} flexWrap={"wrap"}>
								{[
									"🇫🇷 France",
									"🇺🇸 États-Unis",
									"🇩🇪 Allemagne",
									"🇮🇪 Irlande",
									"🏳️ Autres",
								].map((location, index) => (
									<Badge
										key={index}
										bgColor={"blue.50"}
										borderRadius={"full"}
										borderColor={"blue.100"}
										borderWidth={1}
										px={3}
										py={2}
									>
										<Text fontSize={14} fontWeight={400} color={"blue.950"}>
											{location}
										</Text>
									</Badge>
								))}
							</Flex>
						</Flex>
						<Separator />

						{/* Certifications */}
						<Flex flexDir={"column"} gap={3}>
							<Text fontSize={16} fontWeight={400}>
								Certifications de l'entreprise :
							</Text>
							<Flex gap={2} flexWrap={"wrap"}>
								{["HDS", "SecNumCloud", "ISO", "SOC"].map(
									(certification, index) => (
										<Badge
											key={index}
											bgColor={"gray.50"}
											borderRadius={"full"}
											borderColor={"gray.100"}
											borderWidth={1}
											px={3}
											py={2}
										>
											<Text fontSize={14} fontWeight={400}>
												{certification}
											</Text>
										</Badge>
									),
								)}
							</Flex>
						</Flex>
					</Flex>

					{/* Tools */}
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
						{category?.tools.map((tool, index) => (
							<GridItem
								alignItems="stretch"
								h={"fit"}
								key={tool?.id ? tool.id : `tool-${index}`}
							>
								<ToolCard
									tool={tool?.id ? tool : null}
									isLoading={isLoading}
									hideCategory
								/>
							</GridItem>
						))}
					</Grid>
				</Flex>
				<Flex pt={10} gap={6} flexDir={"column"}>
					<Text fontSize={20} fontWeight={500}>
						Autres catégories
					</Text>

					<Caroussel
						items={categories}
						isLoading={isLoadingCategories}
						CardComponent={({ item, isLoading }) => (
							<CategoryCard category={item} isLoading={isLoading} />
						)}
					/>
				</Flex>
			</Flex>
		</Flex>
	);
}
