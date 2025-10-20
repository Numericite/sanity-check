import {
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
import { useState } from "react";
import Badge from "~/components/ui/badge/badge";
import PrivacyScoreBadge from "~/components/ui/badge/privacy-score-badge";
import BreadcrumbLayout from "~/components/ui/breadcrumb/breadcrumb-layout";
import CategoryCard from "~/components/ui/card/category-card";
import ToolCard from "~/components/ui/card/tool-card";
import Carousel from "~/components/ui/carousel/carousel";
import CategoryIcon from "~/components/ui/icons/category-icon";
import Search from "~/components/ui/icons/search";
import { useDebounce } from "~/hooks/use-debounce";
import { api } from "~/utils/api";
import { isPopulated } from "~/utils/payload-helpers";
import { IoMdClose } from "react-icons/io";

type Scores = "A" | "B" | "C" | "D" | "E" | "F";
type ScoreItem = { score: Scores; active: boolean };
type LocationItem = { id: number; name: string; active: boolean };
type CertificationItem = { id: number; name: string; active: boolean };

const scoresList: ScoreItem[] = [
	{ score: "A", active: false },
	{ score: "B", active: false },
	{ score: "C", active: false },
	{ score: "D", active: false },
	{ score: "E", active: false },
	{ score: "F", active: false },
];

const locationsList: LocationItem[] = [
	{
		id: 10,
		name: "🇫🇷 France",
		active: false,
	},
	{
		id: 3,
		name: "🇺🇸 États-Unis",
		active: false,
	},
	{
		id: 8,
		name: "🇩🇪 Allemagne",
		active: false,
	},
	{
		id: 5,
		name: "🇮🇪 Irlande",
		active: false,
	},
];

const certificationsList: CertificationItem[] = [
	{
		id: 5,
		name: "SOC II",
		active: false,
	},
	{
		id: 19,
		name: "ISO 27001",
		active: false,
	},
	{
		id: 16,
		name: "SOC III",
		active: false,
	},
	{
		id: 8,
		name: "ISO 27001:2013 Certification",
		active: false,
	},
];

export default function Category() {
	const router = useRouter();
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce(search);
	const [scores, setScores] = useState(scoresList);
	const [dpa, setDpa] = useState(false);
	const [locations, setLocations] = useState(locationsList);
	const [certifications, setCertifications] = useState(certificationsList);
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
							<Button variant={"outline"}>En savoir plus</Button>
						</Flex>
					</Flex>
				</Flex>

				<Flex w={"full"} gap={6}>
					<Flex
						flexDir={"column"}
						w={"1/3"}
						px={5}
						py={6}
						borderWidth={1}
						borderColor={"gray.200"}
						rounded={"2xl"}
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
										value={search}
										onChange={(e) => setSearch(e.target.value)}
										placeholder="Rechercher un outils"
										bgColor={"transparent"}
										outline={"none"}
										unstyled
										fontSize={16}
										fontWeight={400}
									/>
									<Button
										visibility={search !== "" ? "visible" : "hidden"}
										onClick={() => setSearch("")}
										variant={"ghost"}
										size={"xs"}
										p={0.5}
										m={0}
									>
										<IoMdClose />
									</Button>
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
								{scores.map((score, index) => (
									<Button
										key={index}
										unstyled
										cursor={"pointer"}
										onClick={() =>
											setScores((prev) =>
												prev.map((s, i) =>
													i === index ? { ...s, active: !s.active } : s,
												),
											)
										}
									>
										<PrivacyScoreBadge
											score={score.score}
											active={score.active}
										/>
									</Button>
								))}
							</Flex>
						</Flex>
						<Separator />

						{/* DPA */}
						<Flex flexDir={"column"} gap={3}>
							<Text fontSize={16} fontWeight={400}>
								DPA :
							</Text>
							<Flex gap={2}>
								<Switch.Root
									checked={dpa}
									onCheckedChange={(e) => setDpa(e.checked)}
									colorPalette={"blue"}
								>
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

						{/* Localisation de l'entreprise */}
						<Flex flexDir={"column"} gap={3}>
							<Text fontSize={16} fontWeight={400}>
								Localisation de l'entreprise :
							</Text>
							<Flex gap={2} flexWrap={"wrap"}>
								{locations.map((location, index) => (
									<Button
										key={location.id}
										unstyled
										cursor={"pointer"}
										onClick={() =>
											setLocations((prev) =>
												prev.map((l, i) =>
													i === index ? { ...l, active: !l.active } : l,
												),
											)
										}
									>
										<Badge color="blue" active={location.active}>
											{location.name}
										</Badge>
									</Button>
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
								{certifications.map((certification, index) => (
									<Button
										key={index}
										unstyled
										cursor={"pointer"}
										onClick={() =>
											setCertifications((prev) =>
												prev.map((c, i) =>
													i === index ? { ...c, active: !c.active } : c,
												),
											)
										}
									>
										<Badge active={certification.active}>
											{certification.name}
										</Badge>
									</Button>
								))}
							</Flex>
						</Flex>
					</Flex>

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
						{category?.relatedTools?.docs
							?.filter(isPopulated)
							?.filter(
								(tool) =>
									debouncedSearch === "" ||
									tool.name
										.toLowerCase()
										.includes(debouncedSearch.toLowerCase()),
							)
							.filter((tool) => {
								const activeScores = scores.filter((score) => score.active);

								if (activeScores.length === 0) {
									return true;
								}

								return activeScores.some(
									(score) => score.score === tool.privacy_score_saas,
								);
							})
							.filter((tool) => {
								if (!dpa) {
									return true;
								}

								return tool.dpa_compliant;
							})
							.filter((tool) => {
								const activeLocations = locations.filter(
									(location) => location.active,
								);

								if (activeLocations.length === 0) {
									return true;
								}

								return activeLocations.every((location) =>
									tool.locations_enterprise?.find(
										(loc) =>
											isPopulated(loc.location) &&
											loc.location.id === location.id,
									),
								);
							})
							.filter((tool) => {
								const activeCertifications = certifications.filter(
									(certification) => certification.active,
								);

								if (activeCertifications.length === 0) {
									return true;
								}

								return activeCertifications.every((certification) =>
									tool.certifications?.find(
										(cert) =>
											isPopulated(cert.certification) &&
											cert.certification.id === certification.id,
									),
								);
							})
							.map((tool, index) => (
								<GridItem
									h={"fit"}
									key={tool?.id ? tool.id : `tool-${index}`}
									minW={0}
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
