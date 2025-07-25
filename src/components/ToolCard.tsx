import {
	Center,
	Flex,
	Heading,
	Image,
	Separator,
	Skeleton,
	Tag,
	Text,
	Link as ChakraLink,
} from "@chakra-ui/react";
import type { Tool } from "~/payload/payload-types";
import NextImage from "next/image";
import NextLink from "next/link";
import PrivacyScoreBadge from "./PrivacyScoreBadge";

type ToolCardProps = {
	tool: Tool | null;
	isLoading?: boolean;
};

const ToolCard = ({ tool, isLoading }: ToolCardProps) => {
	const isLoaded = tool !== null && !isLoading;
	const siteLinkSanitized = isLoaded
		? tool.site_link.replace("https://", "").split("/")[0]
		: "";

	return (
		<Skeleton loading={isLoading} borderRadius="xl">
			<ChakraLink
				display="block"
				_hover={{ textDecoration: "none" }}
				_focus={{ outline: "none" }}
				asChild
			>
				<NextLink href={`/tools/${tool?.id}`} passHref>
					<Flex
						flexDir="column"
						bgColor="white"
						borderRadius="xl"
						borderWidth={1}
						borderColor="gray.100"
						_hover={{ borderColor: "gray.500" }}
						p={4}
						gap={4}
					>
						<Flex alignItems="start">
							<Center
								borderRadius="lg"
								borderColor="gray.200"
								borderWidth={1}
								p={2}
								mr={3}
							>
								<Image lineClamp={1} asChild>
									<NextImage
										src={`https://logo.clearbit.com/${siteLinkSanitized}`}
										alt={tool?.name || "Logo de l'outil"}
										width={40}
										height={40}
									/>
								</Image>
							</Center>
							<Flex flexDir="column" flexGrow={1}>
								<Heading size="md" fontWeight={600} lineClamp={1}>
									{tool?.name}
								</Heading>
								<Text fontSize="sm" color="gray.500" lineClamp={1}>
									{tool?.tool_kind}
								</Text>
							</Flex>
							{tool?.privacy_score_saas && (
								<PrivacyScoreBadge score={tool.privacy_score_saas} size="sm" />
							)}
						</Flex>
						<Separator borderColor="gray.100" />
						<Flex alignItems="center" gap={2}>
							<Tag.Root
								colorPalette={tool?.dpa_compliant ? "green" : "red"}
								boxShadow="none"
							>
								<Tag.Label>
									DPA: {tool?.dpa_compliant ? "Conforme" : "Non conforme"}
								</Tag.Label>
							</Tag.Root>
							<Tag.Root colorPalette="gray">
								<Tag.Label>
									Privacy Score: {tool?.privacy_score_saas || 0}
								</Tag.Label>
							</Tag.Root>
						</Flex>
						<Flex
							flexWrap="wrap"
							gap={2}
							h="48px"
							overflow="hidden"
							alignItems="start"
						>
							{tool?.subcontractors_certifications
								?.split(",")
								.map((certification) => (
									<Tag.Root
										key={certification}
										colorPalette="gray"
										boxShadow="none"
										flexWrap="nowrap"
									>
										<Tag.Label>{certification.trim()}</Tag.Label>
									</Tag.Root>
								))}
						</Flex>
					</Flex>
				</NextLink>
			</ChakraLink>
		</Skeleton>
	);
};

export default ToolCard;
