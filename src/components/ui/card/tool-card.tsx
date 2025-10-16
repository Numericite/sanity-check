import {
	Badge,
	Image as ChakraImage,
	Link as ChakraLink,
	Flex,
	Separator,
	Skeleton,
	Text,
} from "@chakra-ui/react";
import { default as NextImage } from "next/image";
import { default as NextLink } from "next/link";
import type { Category, Tool } from "~/payload/payload-types";
import CategoryBadge from "../badge/category-badge";
import PrivacyScoreBadge from "../badge/privacy-score-badge";
import ToolLogo from "../logo/tool-logo";

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
	const isLoaded = tool !== null && !isLoading;

	const mainCategory = tool?.categories?.find(
		(cat) => cat.main === true,
	)?.category;

	return (
		<Skeleton loading={isLoading}>
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
						borderRadius={16}
						padding={4}
						gap={4}
						w={"full"}
						flexDir={"column"}
					>
						{/* Logo + Title + Score + Category */}
						<Flex w={"full"} alignItems={"center"} gap={3}>
							{/* Logo */}
							<Flex
								p={2}
								borderWidth={1}
								borderColor={"gray.100"}
								borderRadius={12}
								h={"full"}
								aspectRatio={"square"}
							>
								<ToolLogo media={tool?.logo} />
							</Flex>
							{/* Title + Score + Category */}
							<Flex w={"full"} flexDir={"column"}>
								{/* Title + Score */}
								<Flex
									w={"full"}
									justifyContent={"space-between"}
									alignItems={"center"}
								>
									<Text fontSize={20} fontWeight={500}>
										{tool?.name}
									</Text>
									{tool?.privacy_score_saas && (
										<PrivacyScoreBadge score={tool.privacy_score_saas} />
									)}
								</Flex>
								{/* Category */}
								{tool && mainCategory && !hideCategory && (
									<Flex w={"full"}>
										<CategoryBadge
											category={mainCategory as Category}
											variant="sm"
										/>
									</Flex>
								)}
							</Flex>
						</Flex>
						<Separator borderColor={"gray.100"} />
						<Flex gap={4} flexDir={"column"}>
							<Flex gap={4}>
								{/* DPA */}
								<Badge
									px={2}
									py={1}
									bgColor={tool?.dpa_compliant ? "green.50" : "red.50"}
									borderColor={tool?.dpa_compliant ? "green.100" : "red.100"}
									borderWidth={1}
								>
									<Text
										fontSize={14}
										fontWeight={400}
										color={tool?.dpa_compliant ? "green.900" : "red.900"}
									>
										DPA : {tool?.dpa_compliant ? "Conforme" : "Non conforme"}
									</Text>
								</Badge>
							</Flex>
							<Flex gap={4}>
								{tool?.certifications && tool.certifications.length > 0 ? (
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
													key={certification.id}
												>
													<Text
														fontSize={14}
														fontWeight={400}
														color={"gray.900"}
													>
														{typeof certification.certification !== "number" &&
															certification.certification.name}
													</Text>
												</Badge>
											))}
										{tool?.certifications &&
											tool?.certifications.length > 2 && (
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
									<Badge
										px={2}
										py={1}
										bgColor={"gray.50"}
										borderCollapse={"gray.100"}
										borderWidth={1}
									>
										<Text fontSize={14} fontWeight={400} color={"gray.900"}>
											Aucune certification
										</Text>
									</Badge>
								)}
							</Flex>
						</Flex>
					</Flex>
				</NextLink>
			</ChakraLink>
		</Skeleton>
	);
}
