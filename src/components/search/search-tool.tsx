import { Link as ChakraLink, Flex, Separator, Text } from "@chakra-ui/react";
import type { Category, Tool } from "~/payload/payload-types";
import NextLink from "next/link";
import ToolLogo from "../ui/logo/tool-logo";
import CategoryBadge from "../ui/badge/category-badge";
import PrivacyScoreBadge from "../ui/badge/privacy-score-badge";
import BooleanBadge from "../ui/badge/boolean-badge";
import Badge from "../ui/badge/badge";
import { getPopulated } from "~/utils/payload-helpers";

type Props = {
	tool: Tool;
};

export default function SearchTool({ tool }: Props) {
	const mainCategory = tool.categories?.find((cat) => cat.main)?.category;

	return (
		<ChakraLink
			_hover={{ textDecoration: "none" }}
			_focus={{ outline: "none" }}
			asChild
			w={"full"}
		>
			<NextLink href={`/tools/${tool.id}`} passHref>
				<Flex
					borderWidth={1}
					borderColor={"gray.100"}
					rounded={"2xl"}
					p={4}
					gap={4}
					w={"full"}
					flexDir={"column"}
				>
					<Flex gap={3}>
						<Flex
							w={16}
							h={16}
							justifyContent={"center"}
							alignItems={"center"}
							rounded={"xl"}
							borderWidth={1}
							borderColor={"gray.100"}
						>
							<ToolLogo media={tool.logo} size={52} />
						</Flex>
						<Flex flexDir={"column"} gap={2} w={"full"}>
							<Flex
								w={"full"}
								justifyContent={"space-between"}
								alignItems={"center"}
							>
								<Text fontSize={20} fontWeight={500}>
									{tool.name}
								</Text>
								<Flex gap={5} alignItems={"center"}>
									<CategoryBadge
										category={mainCategory as Category}
										size={"sm"}
									/>
									<PrivacyScoreBadge
										score={tool.privacy_score_saas}
										size="sm"
									/>
								</Flex>
							</Flex>
							<Flex gap={2} alignItems={"center"}>
								<BooleanBadge
									val={tool.dpa_compliant ?? null}
									text={`DPA : ${
										tool?.dpa_compliant
											? "Conforme"
											: tool.dpa_compliant === false
												? "Non conforme"
												: "Non renseignée"
									}`}
								/>
								{tool?.enterprise_european && <Badge color="blue">🇪🇺 EU</Badge>}
							</Flex>
						</Flex>
					</Flex>
					<Separator color={"gray.100"} />
					<Flex gap={2} alignItems={"center"} flexWrap={"wrap"}>
						{tool?.certifications && tool.certifications.length > 0 ? (
							<>
								{tool.certifications.slice(0, 5).map(({ certification }) => {
									const certificationPopulated = getPopulated(certification);
									if (certificationPopulated)
										return (
											<Badge key={certificationPopulated.id}>
												{certificationPopulated.name}
											</Badge>
										);
								})}
								{tool.certifications.length > 5 && (
									<Badge>+ {tool.certifications.length - 5}</Badge>
								)}
							</>
						) : (
							<Badge>Aucune certification</Badge>
						)}
					</Flex>
				</Flex>
			</NextLink>
		</ChakraLink>
	);
}
