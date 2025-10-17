import {
	Box,
	Badge as ChakraBadge,
	Button,
	Flex,
	Grid,
	GridItem,
	Skeleton,
	Text,
} from "@chakra-ui/react";
import { RichText } from "@payloadcms/richtext-lexical/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { LuExternalLink } from "react-icons/lu";
import Badge from "~/components/ui/badge/badge";
import BooleanBadge from "~/components/ui/badge/boolean-badge";
import CategoryBadge from "~/components/ui/badge/category-badge";
import PrivacyScoreBadge from "~/components/ui/badge/privacy-score-badge";
import BreadcrumbLayout from "~/components/ui/breadcrumb/breadcrumb-layout";
import ToolCard from "~/components/ui/card/tool-card";
import Carousel from "~/components/ui/carousel/carousel";
import Line from "~/components/ui/line";
import ToolLogo from "~/components/ui/logo/tool-logo";
import type { Category } from "~/payload/payload-types";
import { api } from "~/utils/api";
import { getPopulated } from "~/utils/payload-helpers";

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

	const colorTransferOutEu =
		tool?.transfer_out_eu === "Oui"
			? "green"
			: tool?.transfer_out_eu === "Non"
				? "red"
				: "gray";

	const mainCategory = tool?.categories?.find((cat) => cat.main)
		?.category as Category;

	return (
		<Flex gap={6} flexDir={"column"} py={10}>
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
				backgroundColor={"white"}
				p={5}
				rounded={"2xl"}
			>
				<Flex w={"full"} flexDir={"column"}>
					<Flex
						h={60}
						w={"full"}
						backgroundColor={`${mainCategory?.color}.50`}
						borderColor={`${mainCategory?.color}.100`}
						borderWidth={1}
						rounded={"2xl"}
					/>

					<Flex
						flexDir={"row"}
						alignItems={"center"}
						justifyContent={"space-between"}
						w={"full"}
						my={4.5}
						mt={"-10"}
						gap={"1.5"}
					>
						<Flex
							flexDir={"row"}
							alignItems={"end"}
							justifyContent={"space-between"}
							gap={5}
							pl={10}
						>
							<Box
								padding={2}
								backgroundColor={"white"}
								rounded={"lg"}
								borderWidth={1}
								borderColor={"gray.100"}
							>
								<Skeleton loading={isLoading} rounded={"lg"}>
									<ToolLogo media={tool?.logo} size={122} />
								</Skeleton>
							</Box>

							<Flex
								gap={10}
								alignItems={"center"}
								justifyContent={"center"}
								mb={4.5}
							>
								{tool && (
									<>
										<Text fontSize={40} fontWeight={500}>
											{tool?.name}
										</Text>
										<PrivacyScoreBadge score={tool?.privacy_score_saas} />
										<CategoryBadge category={mainCategory} size={"lg"} />
									</>
								)}
							</Flex>
						</Flex>

						<Flex
							flexDir={"row"}
							alignItems={"center"}
							justifyContent={"space-between"}
							gap={4}
							mt={9}
						>
							<Button bgColor={"primary.solid"} asChild>
								<NextLink href={""} target="_blank">
									<Flex gap={2} alignItems={"center"} justifyContent={"center"}>
										<Text>Fiche détaillé</Text>
										<LuExternalLink />
									</Flex>
								</NextLink>
							</Button>
							<Button colorPalette="primary" variant="outline" asChild>
								<NextLink href={tool?.site_link ?? ""} target="_blank">
									<Flex gap={2} alignItems={"center"} justifyContent={"center"}>
										<Text>Site internet</Text>
										<LuExternalLink />
									</Flex>
								</NextLink>
							</Button>
						</Flex>
					</Flex>
				</Flex>

				{!isLoading && tool && (
					<Flex w={"full"} px={4} flexDir={"column"} gap={7}>
						<Grid
							templateColumns="repeat(12, 1fr)"
							w={"full"}
							gap="5"
							autoFlow={"column"}
							alignItems={"stretch"}
						>
							<GridItem colSpan={2}>
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
							<GridItem colSpan={3}>
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
										<Badge>TODO</Badge>
									</Flex>
								</Flex>
							</GridItem>
							<GridItem colSpan={3}>
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
														<Badge key={locationPopulated.id}>
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
						<Box px={6} rounded={"xl"} borderColor={"blue.50"} borderWidth={1}>
							<Line title="Informations sur les transferts">
								{tool.transfer_informations ? (
									<NextLink
										target="_blank"
										href={tool.transfer_informations ?? ""}
									>
										<Text
											color={"primary.solid"}
											textDecoration={"underline"}
											textUnderlineOffset={2}
											wordBreak="break-all"
										>
											{tool.transfer_informations}
										</Text>
									</NextLink>
								) : (
									<Text>Aucune information</Text>
								)}
							</Line>

							<Line title="Remarque Localisation Hébergement">
								{tool.location_note ? (
									<RichText data={tool.location_note} />
								) : (
									<Text>Aucune information</Text>
								)}
							</Line>

							<Line title="Actions à mener si utilisation de l'outil">
								{tool.actions ? (
									<RichText data={tool.actions} />
								) : (
									<Text>Aucune information</Text>
								)}
							</Line>

							<Line title="Localisation hébergement : utilisateurs finaux">
								<Flex
									flexDir={"row"}
									flexWrap={"wrap"}
									gap={3}
									overflow={"auto"}
								>
									{tool.locations_final_users &&
									tool.locations_final_users.length > 0 ? (
										tool.locations_final_users.map(({ location }) => {
											const locationPopulated = getPopulated(location);
											if (locationPopulated)
												return (
													<Badge color="blue" key={locationPopulated.id}>
														{locationPopulated.name}
													</Badge>
												);
										})
									) : (
										<Text>Aucune information</Text>
									)}
								</Flex>
							</Line>

							<Line title="Entreprise EU">
								TODO
								{/* <Box
									bgColor={tool.enterprise_european ? "green.50" : "red.50"}
									w={"fit"}
									p={2}
									rounded={"sm"}
								>
									<Text
										truncate
										fontSize={14}
										fontWeight={400}
										color={tool.enterprise_european ? "green.600" : "red.600"}
									>
										{tool.enterprise_european ? "Oui" : "Non"}
									</Text>
								</Box> */}
							</Line>

							<Line title="Site internet">
								{tool.site_link ? (
									<NextLink target="_blank" href={tool.site_link ?? ""}>
										<Text
											color={"primary.solid"}
											textDecoration={"underline"}
											textUnderlineOffset={2}
											wordBreak="break-all"
										>
											{tool.site_link}
										</Text>
									</NextLink>
								) : (
									<Text>Aucune information</Text>
								)}
							</Line>

							<Line title="Certifications des sous-traitants ou hébergeurs">
								<Flex
									flexDir={"row"}
									flexWrap={"wrap"}
									gap={3}
									overflow={"auto"}
								>
									{tool.certifications_subcontractors &&
									tool.certifications_subcontractors.length > 0 ? (
										tool.certifications_subcontractors.map(
											({ certification }) => {
												const certificationPopulated =
													getPopulated(certification);
												if (certificationPopulated)
													return (
														<Badge key={certificationPopulated.id}>
															{certificationPopulated.name}
														</Badge>
													);
											},
										)
									) : (
										<Text>Aucune certification</Text>
									)}
								</Flex>
							</Line>

							<Line title="Lien DPA si applicable">
								{tool.dpa_link ? (
									<NextLink target="_blank" href={tool.dpa_link ?? ""}>
										<Text
											color={"primary.solid"}
											textDecoration={"underline"}
											textUnderlineOffset={2}
											wordBreak="break-all"
										>
											{tool.dpa_link}
										</Text>
									</NextLink>
								) : (
									<Text>Aucune information</Text>
								)}
							</Line>

							<Line title="Encadrement des transferts">
								<Flex
									flexDir={"row"}
									flexWrap={"wrap"}
									gap={3}
									overflow={"auto"}
								>
									{tool.transfers && tool.transfers.length > 0 ? (
										tool.transfers.map(({ transfer }) => {
											const transferPopulated = getPopulated(transfer);
											if (transferPopulated)
												return (
													<Badge key={transferPopulated.id}>
														{transferPopulated.name}
													</Badge>
												);
										})
									) : (
										<Text>Aucune information</Text>
									)}
								</Flex>
							</Line>

							<Line title="Fonctionnalités RGPD/Sécurité">
								<Flex
									flexDir={"row"}
									flexWrap={"wrap"}
									gap={3}
									overflow={"auto"}
								>
									{tool.features && tool.features.length > 0 ? (
										tool.features.map(({ feature }) => {
											const featurePopulated = getPopulated(feature);
											if (featurePopulated)
												return (
													<Badge key={featurePopulated.id}>
														{featurePopulated.name}
													</Badge>
												);
										})
									) : (
										<Text>Aucune fonctionnalité</Text>
									)}
								</Flex>
							</Line>

							<Line title="Documentation en FR">
								<BooleanBadge val={tool.fr_documentation ?? null} />
							</Line>

							<Line title="Possibilité de selfhost">
								<BooleanBadge val={tool.self_host_possibility ?? null} />
							</Line>

							<Line title="Open source">
								<BooleanBadge val={tool.opensource ?? null} />
							</Line>

							<Line title='Certifié "DPF"'>
								<BooleanBadge val={tool.certification_dpf ?? null} />
							</Line>

							<Line title="Sous-traitants ultérieurs (Hébergement/Infrastructure)">
								<Flex
									flexDir={"row"}
									flexWrap={"wrap"}
									gap={3}
									overflow={"auto"}
								>
									{tool.subcontractors_infra &&
									tool.subcontractors_infra.length > 0 ? (
										tool.subcontractors_infra.map((infra) => (
											<Badge key={infra.id}>{infra.name}</Badge>
										))
									) : (
										<Text>Aucune fonctionnalité</Text>
									)}
								</Flex>
							</Line>

							<Line title="DPA accessible en ligne">
								<BooleanBadge val={tool.online_accessible_dpa ?? null} />
							</Line>

							<Line title="Localisation hébergement : relation client">
								<Flex
									flexDir={"row"}
									flexWrap={"wrap"}
									gap={3}
									overflow={"auto"}
								>
									{tool.locations_host_client &&
									tool.locations_host_client.length > 0 ? (
										tool.locations_host_client.map(({ location }) => {
											const locationPopulated = getPopulated(location);
											if (locationPopulated)
												return (
													<Badge key={locationPopulated.id} color="blue">
														{locationPopulated.name}
													</Badge>
												);
										})
									) : (
										<Text>Aucune localisation</Text>
									)}
								</Flex>
							</Line>

							<Line title="Type d'outil">
								<Flex
									flexDir={"row"}
									flexWrap={"wrap"}
									gap={3}
									overflow={"auto"}
								>
									{tool.categories && tool.categories.length > 0 ? (
										tool.categories.map(({ category }) => {
											const categoryPopulated = getPopulated(category);
											if (categoryPopulated)
												return (
													<CategoryBadge
														key={categoryPopulated.id}
														category={categoryPopulated}
													/>
												);
										})
									) : (
										<Text>Aucune catégorie</Text>
									)}
								</Flex>
							</Line>

							<Line title="Privacy score SELFHOSTED">
								{tool.privacy_score_self_hosted ? (
									<PrivacyScoreBadge score={tool.privacy_score_self_hosted} />
								) : (
									<Text>Aucun score SELFHOSTED</Text>
								)}
							</Line>

							<Line title="Privacy score SAAS">
								<PrivacyScoreBadge score={tool.privacy_score_saas} />
							</Line>

							<Line title="Transfert hors EU">
								{tool.transfer_out_eu ? (
									<Badge color={colorTransferOutEu}>
										{tool.transfer_out_eu}
									</Badge>
								) : (
									<Text>Aucune information</Text>
								)}
							</Line>

							<Line title="Liste des sous-traitants ultérieurs">
								{tool.subcontractors ? (
									<NextLink target="_blank" href={tool.subcontractors ?? ""}>
										<Text
											color={"primary.solid"}
											textDecoration={"underline"}
											textUnderlineOffset={2}
											wordBreak="break-all"
										>
											{tool.subcontractors}
										</Text>
									</NextLink>
								) : (
									<Text>Aucune liste</Text>
								)}
							</Line>

							<Line title="Accès aux données">
								<Flex
									flexDir={"row"}
									flexWrap={"wrap"}
									gap={3}
									overflow={"auto"}
								>
									{tool.accessors && tool.accessors.length > 0 ? (
										tool.accessors.map(({ accessor }) => {
											const accessorPopulated = getPopulated(accessor);
											if (accessorPopulated)
												return (
													<Badge key={accessorPopulated.id}>
														{accessorPopulated.name}
													</Badge>
												);
										})
									) : (
										<Text>Aucune information</Text>
									)}
								</Flex>
							</Line>

							<Line title="Certifications de l'entreprise" last>
								<Flex
									flexDir={"row"}
									flexWrap={"wrap"}
									gap={3}
									overflow={"auto"}
								>
									{tool.certifications && tool.certifications.length > 0 ? (
										tool.certifications.map(({ certification }) => {
											const certificationPopulated =
												getPopulated(certification);
											if (certificationPopulated)
												return (
													<Badge key={certificationPopulated.id}>
														{certificationPopulated.name}
													</Badge>
												);
										})
									) : (
										<Text>Aucune certification</Text>
									)}
								</Flex>
							</Line>
						</Box>
					</Flex>
				)}
			</Flex>

			<Flex pt={10} gap={6} flexDir={"column"}>
				<Text fontSize={20} fontWeight={500}>
					Outils similaires
				</Text>

				<Carousel
					items={tools}
					isLoading={isLoadingTools}
					component={({ item, isLoading }) => (
						<ToolCard tool={item} isLoading={isLoading} />
					)}
				/>
			</Flex>
		</Flex>
	);
};

export default ToolPage;
