import {
	Box,
	Badge as ChakraBadge,
	Button,
	Flex,
	Grid,
	GridItem,
	Text,
	Heading,
} from "@chakra-ui/react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { LuExternalLink } from "react-icons/lu";
import Badge from "~/components/ui/badge/badge";
import CategoryBadge from "~/components/ui/badge/category-badge";
import PrivacyScoreBadge from "~/components/ui/badge/privacy-score-badge";
import BreadcrumbLayout from "~/components/ui/breadcrumb/breadcrumb-layout";
import ToolCard from "~/components/ui/card/tool-card";
import CarouselLayout from "~/components/ui/carousel/carousel-layout";
import ToolLogo from "~/components/ui/logo/tool-logo";
import type { Category } from "~/payload/payload-types";
import { api } from "~/utils/api";
import { getPopulated } from "~/utils/payload-helpers";
import Lines from "~/components/lines";

const ToolPage = () => {
	const router = useRouter();
	const { id } = router.query;

	const { data: tool, isLoading } = api.tool.getById.useQuery(Number(id), {
		enabled: !!id,
	});

	const { data: tools, isFetching: isLoadingTools } = api.tool.getList.useQuery(
		{
			limit: 6,
			filters: [
				{ key: "privacy_score_saas", value: "A" },
				{
					key: "id",
					operation: "not_equals",
					value: (tool?.id ?? 0).toString(),
				},
			],
		},
		{
			initialData: Array.from({ length: 6 }),
		},
	);

	const colorDpa = tool?.dpa_compliant
		? "green"
		: tool?.dpa_compliant === false
			? "red"
			: "gray";
	const textDpa = tool?.dpa_compliant
		? "Conforme"
		: tool?.dpa_compliant === false
			? "Non conforme"
			: "Non renseignée";

	const mainCategory = tool?.categories?.find((cat) => cat.main)
		?.category as Category;

	return (
		<>
			<Head>
				<title>{tool?.name ?? "Outil"} - Sanity Check</title>
				<meta
					name="description"
					content={
						tool?.description ??
						"Analysez la conformité RGPD et l’éthique de cet outil grâce à Sanity Check. Chargement des informations en cours…"
					}
				/>
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
						{
							label: mainCategory?.name ?? "",
							link: `/categories/${mainCategory?.id}`,
						},
						{ label: tool?.name ?? "" },
					]}
				/>

				<Flex
					flexDir="column"
					alignItems="center"
					justifyContent="center"
					h="full"
					bgColor={"white"}
					p={{ base: 2.5, md: 5 }}
					rounded={{ base: "none", md: "2xl" }}
					borderColor={{ base: "transparent", md: "gray.100" }}
					borderWidth={1}
				>
					<Flex w={"full"} flexDir={"column"}>
						<Flex
							h={{ base: 16, md: 60 }}
							w={"full"}
							backgroundColor={`${mainCategory?.color}.50`}
							borderColor={`${mainCategory?.color}.100`}
							borderWidth={1}
							rounded={"xl"}
						/>

						<Flex
							alignItems={"start"}
							w={"full"}
							my={4.5}
							gap={{ base: 2.5, md: 5 }}
						>
							<Flex pl={{ base: 0, md: 10 }}>
								<Box
									p={2}
									bgColor={"white"}
									rounded={"lg"}
									mt={{ base: 0, md: "-10" }}
									borderWidth={1}
									borderColor={"gray.100"}
								>
									<ToolLogo media={tool?.logo} size={{ base: 16, md: 28 }} />
								</Box>
							</Flex>
							<Flex
								alignSelf={"center"}
								mt={{ base: 0, md: "-5" }}
								w={"full"}
								gap={{ base: 3, md: 10 }}
								justifyContent={"space-between"}
								flexDir={{ base: "column", md: "row" }}
							>
								<Flex
									gap={{ base: 2.5, md: 10 }}
									flexDir={{ base: "column", md: "row" }}
								>
									<Heading
										truncate
										fontSize={{ base: "2xl", md: "4xl" }}
										fontWeight={500}
									>
										{tool?.name}
									</Heading>
									<Flex gap={{ base: 2, md: 10 }} alignItems={"center"}>
										{!isLoading && tool && (
											<>
												<PrivacyScoreBadge score={tool?.privacy_score_saas} />
												<CategoryBadge
													category={mainCategory}
													size={{ base: "md", md: "lg" }}
												/>
											</>
										)}
									</Flex>
								</Flex>
								<Flex gap={{ base: 2, md: 4 }} flexDir={"row"}>
									<Button
										size={{ base: "xs", md: "md" }}
										bgColor={"primary.solid"}
										asChild
										flex={1}
									>
										<NextLink href={""} target="_blank">
											<Flex
												gap={2}
												alignItems={"center"}
												justifyContent={"center"}
											>
												<Text>Fiche détaillé</Text>
												<LuExternalLink />
											</Flex>
										</NextLink>
									</Button>
									<Button
										colorPalette="primary"
										variant="outline"
										asChild
										size={{ base: "xs", md: "md" }}
										flex={1}
									>
										<NextLink href={tool?.site_link ?? ""} target="_blank">
											<Flex
												gap={2}
												alignItems={"center"}
												justifyContent={"center"}
											>
												<Text>Site internet</Text>
												<LuExternalLink />
											</Flex>
										</NextLink>
									</Button>
								</Flex>
							</Flex>
						</Flex>
					</Flex>

					{!isLoading && tool && (
						<Flex w={"full"} px={{ base: 2, md: 4 }} flexDir={"column"} gap={7}>
							<Grid
								templateColumns={{
									base: "repeat(1fr)",
									md: "repeat(12, 1fr)",
								}}
								w={"full"}
								gap={{ base: 2.5, md: 5 }}
								alignItems={"stretch"}
							>
								<GridItem colSpan={{ base: 4, md: 2 }}>
									<Flex
										w={"full"}
										h={"100%"}
										px={4}
										py={5}
										bgColor={`${colorDpa}.50`}
										borderColor={`${colorDpa}.100`}
										borderWidth={1}
										rounded={"xl"}
										gap={5}
										flexDir={"column"}
									>
										<Text fontSize={16} fontWeight={500}>
											DPA
										</Text>
										<Flex flexDir={"row"} gap={3} flexWrap={"wrap"}>
											<ChakraBadge
												bgColor={`${colorDpa}.100`}
												borderColor={`${colorDpa}.100`}
												borderWidth={1}
												fontSize={16}
												size={"lg"}
												fontWeight={400}
												color={`${colorDpa}.900`}
											>
												{textDpa}
											</ChakraBadge>
										</Flex>
									</Flex>
								</GridItem>
								<GridItem colSpan={{ base: 4, md: 3 }}>
									<Flex
										w={"full"}
										h={"100%"}
										px={4}
										py={5}
										backgroundColor={"primary.subtle"}
										borderColor={"blue.100"}
										borderWidth={1}
										rounded={"xl"}
										gap={5}
										flexDir={"column"}
									>
										<Text fontSize={16} fontWeight={500}>
											Hébergement des données
										</Text>
										<Flex flexDir={"row"} gap={3} flexWrap={"wrap"}>
											<Badge color="blue">TODO</Badge>
										</Flex>
									</Flex>
								</GridItem>
								<GridItem colSpan={{ base: 4, md: 3 }}>
									<Flex
										w={"full"}
										h={"100%"}
										px={4}
										py={5}
										backgroundColor={"primary.subtle"}
										borderColor={"blue.100"}
										borderWidth={1}
										rounded={"xl"}
										gap={5}
										flexDir={"column"}
									>
										<Text fontSize={16} fontWeight={500}>
											Localisation de l'entreprise
										</Text>
										<Flex flexDir={"row"} gap={3} flexWrap={"wrap"}>
											{tool.locations_enterprise &&
											tool.locations_enterprise.length > 0 ? (
												<>
													{tool.locations_enterprise.map(({ location }) => {
														const locationPopulated = getPopulated(location);
														if (!locationPopulated) return null;
														return (
															<Badge color="blue" key={locationPopulated.id}>
																{locationPopulated.name}
															</Badge>
														);
													})}
												</>
											) : (
												<Badge>Aucune information</Badge>
											)}
										</Flex>
									</Flex>
								</GridItem>
								<GridItem colSpan={4}>
									<Flex
										w={"full"}
										h={"100%"}
										px={4}
										py={5}
										backgroundColor={"gray.50"}
										borderColor={"gray.100"}
										borderWidth={1}
										rounded={"xl"}
										gap={5}
										flexDir={"column"}
									>
										<Text fontSize={16} fontWeight={500}>
											Certifications
										</Text>
										<Flex flexDir={"row"} gap={3} flexWrap={"wrap"}>
											{tool.certifications && tool.certifications.length > 0 ? (
												<>
													{tool.certifications
														.slice(0, 2)
														.map(({ certification }) => {
															const certificationPopulated =
																getPopulated(certification);
															if (certificationPopulated)
																return (
																	<Badge key={certificationPopulated.id}>
																		{certificationPopulated.name}
																	</Badge>
																);
														})}
													{tool.certifications.length > 2 && (
														<Badge>+ {tool.certifications.length - 2}</Badge>
													)}
												</>
											) : (
												<Text>Aucune certification</Text>
											)}
										</Flex>
									</Flex>
								</GridItem>
							</Grid>
							<Lines tool={tool} />
						</Flex>
					)}
				</Flex>

				{!isLoadingTools && tools && (
					<Flex px={4} pt={10} gap={6} flexDir={"column"}>
						<Text fontSize={20} fontWeight={500}>
							Outils similaires
						</Text>

						<CarouselLayout
							id="carousel-tools"
							items={tools}
							isLoading={isLoadingTools}
							component={({ item, isLoading }) => (
								<ToolCard tool={item} isLoading={isLoading} />
							)}
						/>
					</Flex>
				)}
			</Flex>
		</>
	);
};

export default ToolPage;
