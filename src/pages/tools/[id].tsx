import {
	Badge,
	Box,
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
import BooleanBadge from "~/components/ui/badge/boolean-badge";
import CategoryBadge from "~/components/ui/badge/category-badge";
import PrivacyScoreBadge from "~/components/ui/badge/privacy-score-badge";
import BreadcrumbLayout from "~/components/ui/breadcrumb/breadcrumb-layout";
import ToolCard from "~/components/ui/card/tool-card";
import Caroussel from "~/components/ui/caroussel/caroussel";
import Line from "~/components/ui/line";
import ToolLogo from "~/components/ui/logo/tool-logo";
import type { Category } from "~/payload/payload-types";
import { api } from "~/utils/api";

const ToolPage = () => {
	const router = useRouter();
	const { id } = router.query;

	const { data: tool, isLoading } = api.tool.getById.useQuery(Number(id), {
		enabled: !!id,
	});
	console.log(tool);
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

	const mainCategory = tool?.categories?.find((cat) => cat.main === true)
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
				{/* Header */}
				<Flex w={"full"} flexDir={"column"}>
					{/* Banner */}
					<Flex
						h={60}
						w={"full"}
						backgroundColor={`${mainCategory?.color}.50`}
						borderColor={`${mainCategory?.color}.100`}
						borderWidth={1}
						rounded={"2xl"}
					/>

					{/* Header informations (title, score, buttons) */}
					<Flex
						flexDir={"row"}
						alignItems={"center"}
						justifyContent={"space-between"}
						w={"full"}
						my={4.5}
						mt={"-10"}
						gap={"1.5"}
					>
						{/* Informations (title, score, category) */}
						<Flex
							flexDir={"row"}
							alignItems={"end"}
							justifyContent={"space-between"}
							gap={5}
							pl={10}
						>
							{/* Logo */}
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

							{/* Informations */}
							<Flex
								gap={10}
								alignItems={"center"}
								justifyContent={"center"}
								mb={4.5}
							>
								{tool && (
									<>
										{/* Title */}
										<Text fontSize={40} fontWeight={500}>
											{tool?.name}
										</Text>

										{/* Score */}
										<PrivacyScoreBadge score={tool?.privacy_score_saas} />

										{/* Category badge */}
										<CategoryBadge category={mainCategory} size={"lg"} />
									</>
								)}
							</Flex>
						</Flex>

						{/* Buttons */}
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

				{/* Body (infos) */}
				{!isLoading && tool && (
					<Flex w={"full"} px={4} flexDir={"column"} gap={7}>
						{/* Infos principales */}
						<Grid
							templateColumns="repeat(12, 1fr)"
							w={"full"}
							gap="5"
							autoFlow={"column"}
							alignItems={"stretch"}
						>
							{/* DPA */}
							<GridItem colSpan={2}>
								<Box
									w={"full"}
									h={"100%"}
									px={4}
									py={5}
									bgColor={tool.dpa_compliant ? "green.50" : "red.50"}
									borderColor={tool.dpa_compliant ? "green.100" : "red.100"}
									borderWidth={1}
									rounded={"xl"}
								>
									<Text fontSize={16} fontWeight={500}>
										DPA
									</Text>
									<Box
										bgColor={tool.dpa_compliant ? "green.100" : "red.100"}
										mt={5}
										w={"fit"}
										p={2}
										rounded={"sm"}
										color={tool.dpa_compliant ? "green.600" : "red.600"}
									>
										<Text fontSize={14} fontWeight={400}>
											{tool?.dpa_compliant ? "Conforme" : "Non conforme"}
										</Text>
									</Box>
								</Box>
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
										<Badge
											bgColor="white"
											borderColor="gray.50"
											borderWidth={1}
											w={"fit"}
											p={2}
											rounded={"sm"}
										>
											<Text fontSize={14} fontWeight={400} color={"gray.900"}>
												TODO
											</Text>
										</Badge>
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
											tool.locations_enterprise.map((location) => (
												<Badge
													key={location.id}
													bgColor="white"
													borderColor="gray.50"
													borderWidth={1}
													w={"fit"}
													p={2}
													rounded={"sm"}
												>
													<Text
														fontSize={14}
														fontWeight={400}
														color={"gray.900"}
													>
														{typeof location.location !== "number" &&
															location.location.name}
													</Text>
												</Badge>
											))
										) : (
											<Badge
												bgColor="white"
												borderColor="gray.50"
												borderWidth={1}
												w={"fit"}
												p={2}
												rounded={"sm"}
											>
												<Text fontSize={14} fontWeight={400} color={"gray.900"}>
													Aucune information
												</Text>
											</Badge>
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
													.map((certification, index) => (
														<Badge
															px={2}
															py={1}
															bgColor={"gray.50"}
															borderCollapse={"gray.100"}
															borderWidth={1}
															key={index}
														>
															<Text
																fontSize={14}
																fontWeight={400}
																color={"gray.900"}
															>
																{typeof certification.certification !==
																	"number" && certification.certification.name}
															</Text>
														</Badge>
													))}
												{tool.certifications.length > 2 && (
													<Badge
														px={2}
														py={1}
														bgColor={"gray.50"}
														borderCollapse={"gray.100"}
														borderWidth={1}
													>
														<Text
															fontSize={14}
															fontWeight={400}
															color={"gray.900"}
														>
															+ {tool.certifications.length - 2}
														</Text>
													</Badge>
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
											if (typeof location !== "number") {
												const { id, name } = location;
												return (
													<Badge
														px={2}
														py={1}
														bgColor={"blue.50"}
														borderColor={"blue.100"}
														borderWidth={1}
														key={id}
													>
														<Text
															fontSize={14}
															fontWeight={400}
															color={"blue.900"}
														>
															{name}
														</Text>
													</Badge>
												);
											}
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
												if (typeof certification !== "number") {
													const { id, name } = certification;
													return (
														<Badge
															px={2}
															py={1}
															bgColor={"gray.50"}
															borderColor={"gray.100"}
															borderWidth={1}
															key={id}
														>
															<Text
																fontSize={14}
																fontWeight={400}
																color={"gray.900"}
															>
																{name}
															</Text>
														</Badge>
													);
												}
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
											if (typeof transfer !== "number") {
												const { id, name } = transfer;
												return (
													<Badge
														px={2}
														py={1}
														bgColor={"gray.50"}
														borderColor={"gray.100"}
														borderWidth={1}
														key={id}
													>
														<Text
															fontSize={14}
															fontWeight={400}
															color={"gray.900"}
														>
															{name}
														</Text>
													</Badge>
												);
											}
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
											if (typeof feature !== "number") {
												const { id, name } = feature;
												return (
													<Badge
														px={2}
														py={1}
														bgColor={"gray.50"}
														borderColor={"gray.100"}
														borderWidth={1}
														key={id}
													>
														<Text
															fontSize={14}
															fontWeight={400}
															color={"gray.900"}
														>
															{name}
														</Text>
													</Badge>
												);
											}
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
											<Badge
												px={2}
												py={1}
												bgColor={"gray.50"}
												borderColor={"gray.100"}
												borderWidth={1}
												key={infra.id}
											>
												<Text fontSize={14} fontWeight={400} color={"gray.900"}>
													{infra.name}
												</Text>
											</Badge>
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
											if (typeof location !== "number") {
												const { id, name } = location;
												return (
													<Badge
														px={2}
														py={1}
														bgColor={"blue.50"}
														borderColor={"blue.100"}
														borderWidth={1}
														key={id}
													>
														<Text
															fontSize={14}
															fontWeight={400}
															color={"blue.900"}
														>
															{name}
														</Text>
													</Badge>
												);
											}
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
										tool.categories.map(({ category }, index) => {
											if (typeof category !== "number") {
												return (
													<CategoryBadge key={index} category={category} />
												);
											}
										})
									) : (
										<Text>Aucune information</Text>
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
								{(() => {
									const color = (() => {
										if (tool.transfer_out_eu === "Oui") return "green";
										if (tool.transfer_out_eu === "Non") return "red";
										return "gray";
									})();

									return tool.transfer_out_eu ? (
										<Badge
											bgColor={`${color}.50`}
											borderColor={`${color}.100`}
											borderWidth={1}
											w={"fit"}
											p={2}
											rounded={"sm"}
										>
											<Text
												fontSize={14}
												fontWeight={400}
												color={`${color}.900`}
											>
												{tool.transfer_out_eu}
											</Text>
										</Badge>
									) : (
										<Text>Aucune information</Text>
									);
								})()}
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
									{tool.accessors ? (
										tool.accessors.map(({ accessor }) => {
											if (typeof accessor !== "number") {
												const { id, name } = accessor;
												return (
													<Badge
														px={2}
														py={1}
														bgColor={"gray.50"}
														borderColor={"gray.100"}
														borderWidth={1}
														key={id}
													>
														<Text
															fontSize={14}
															fontWeight={400}
															color={"gray.900"}
														>
															{name}
														</Text>
													</Badge>
												);
											}
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
											if (typeof certification !== "number") {
												const { id, name } = certification;
												return (
													<Badge
														px={2}
														py={1}
														bgColor={"gray.50"}
														borderColor={"gray.100"}
														borderWidth={1}
														key={id}
													>
														<Text
															fontSize={14}
															fontWeight={400}
															color={"gray.900"}
														>
															{name}
														</Text>
													</Badge>
												);
											}
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

			{/* Outils similaires */}
			<Flex pt={10} gap={6} flexDir={"column"}>
				<Text fontSize={20} fontWeight={500}>
					Outils similaires
				</Text>

				<Caroussel
					items={tools}
					isLoading={isLoadingTools}
					CardComponent={({ item, isLoading }) => (
						<ToolCard tool={item} isLoading={isLoading} />
					)}
				/>
			</Flex>
		</Flex>
	);
};

export default ToolPage;
