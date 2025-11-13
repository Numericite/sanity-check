import {
	Link as ChakraLink,
	Flex,
	Heading,
	Separator,
	Skeleton,
} from "@chakra-ui/react";
import NextLink from "next/link";
import type { Category, Tool } from "~/payload/payload-types";
import CategoryBadge from "../badge/category-badge";
import PrivacyScoreBadge from "../badge/privacy-score-badge";
import ToolLogo from "../logo/tool-logo";
import BooleanBadge from "../badge/boolean-badge";
import Badge from "../badge/badge";
import { getPopulated } from "~/utils/payload-helpers";

type ToolCardProps = {
	tool: Tool | null;
	isLoading?: boolean;
	hideCategory?: boolean;
};

export default function ToolCard({
	tool,
	isLoading,
	hideCategory = false,
}: ToolCardProps) {
	const mainCategory = tool?.categories?.find((cat) => cat.main)?.category;

	return (
		<Skeleton loading={isLoading || !tool?.name} w="full" rounded={"2xl"}>
			<ChakraLink
				_hover={{ textDecoration: "none" }}
				_focus={{ outline: "none" }}
				asChild
				w={"full"}
			>
				<NextLink href={`/tools/${tool?.id}`} passHref>
					<Flex
						bgColor={"white"}
						borderWidth={1}
						borderColor={"gray.100"}
						rounded={"2xl"}
						padding={4}
						gap={4}
						w={"full"}
						flexDir={"column"}
						transition={"all"}
						_hover={{
							borderColor: "gray.200",
						}}
					>
						<Flex w={"full"} alignItems={"center"} gap={3}>
							<Flex
								p={2}
								borderWidth={1}
								borderColor={"gray.100"}
								rounded={"xl"}
								h={"full"}
								aspectRatio={"square"}
							>
								<ToolLogo media={tool?.logo} />
							</Flex>

							<Flex w={"full"} gap={1} flexDir={"column"}>
								<Flex
									w={"full"}
									justifyContent={"space-between"}
									alignItems={"center"}
								>
									<Heading size={"lg"}>{tool?.name}</Heading>
									{tool?.privacy_score_saas && (
										<PrivacyScoreBadge score={tool.privacy_score_saas} />
									)}
								</Flex>
								{tool && mainCategory && !hideCategory && (
									<Flex w={"full"}>
										<CategoryBadge category={mainCategory as Category} />
									</Flex>
								)}
							</Flex>
						</Flex>
						<Separator borderColor={"gray.100"} />
						<Flex gap={4} flexDir={"column"}>
							<Flex gap={4}>
								<BooleanBadge
									val={tool?.dpa_compliant ?? null}
									text={`DPA : ${
										tool?.dpa_compliant
											? "Conforme"
											: tool?.dpa_compliant === false
												? "Non conforme"
												: "Non renseignée"
									}`}
								/>
								{tool?.enterprise_european && <Badge color="blue">🇪🇺 EU</Badge>}
							</Flex>
							<Flex gap={4} flexWrap={"wrap"}>
								{tool?.certifications && tool.certifications.length > 0 ? (
									<>
										{tool.certifications
											.map(({ certification }) => getPopulated(certification))
											.filter((cert) => cert !== null)
											.sort((a, b) => a.name.length - b.name.length)
											.slice(0, 2)
											.map((cert) => (
												<Badge key={cert.id}>{cert.name}</Badge>
											))}
										{tool.certifications.length > 2 && (
											<Badge>+ {tool.certifications.length - 2}</Badge>
										)}
									</>
								) : (
									<Badge>Aucune certification</Badge>
								)}
							</Flex>
						</Flex>
					</Flex>
				</NextLink>
			</ChakraLink>
		</Skeleton>
	);
}
