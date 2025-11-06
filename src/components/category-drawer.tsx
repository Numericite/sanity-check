import { Box, Button, Drawer, Flex, Heading, Text } from "@chakra-ui/react";
import type { Category } from "~/payload/payload-types";
import CategoryIcon from "./ui/icon/category-icon";
import CollapsibleLayout from "./ui/collapsible/collapsible-layout";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Prose } from "./ui/prose";
import {
	DocumentListCheck,
	InfoCircleIcon,
	TriangleExclamationIcon,
} from "./ui/icon/icons";

type Props = {
	category: Category | undefined;
};

export default function CategoryDrawer({ category }: Props) {
	if (!category) return <Button variant={"outline"}>En savoir plus</Button>;

	return (
		<Drawer.Root size={"lg"}>
			<Drawer.Backdrop />
			<Drawer.Trigger asChild>
				<Button size={{ base: "xs", md: "md" }} variant={"outline"}>
					En savoir plus
				</Button>
			</Drawer.Trigger>
			<Drawer.Positioner>
				<Drawer.Content
					w={{ base: "80%", md: "100%" }}
					roundedLeft={"4xl"}
					borderWidth={1}
					borderColor={"gray.100"}
					p={{ base: 0, md: 2 }}
					gap={{ base: 2, md: 7 }}
				>
					<Drawer.CloseTrigger />
					<Drawer.Header>
						<Flex flexDir={"column"} w={"full"}>
							<Flex
								h={{ base: 16, md: 32 }}
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
									<CategoryIcon
										category={category ?? null}
										size={{ base: 12, md: 24 }}
									/>
								</Box>
							</Flex>
							<Flex
								w={"full"}
								pl={{ base: 0, md: 5 }}
								justifyContent={"space-between"}
								alignItems={"center"}
								mt={{ base: 0, md: "-7" }}
							>
								<Flex
									gap={3}
									mt={{ base: 2, md: 0 }}
									alignItems={"center"}
									justifyContent={"start"}
								>
									<Box
										bgColor={"white"}
										borderColor={"gray.100"}
										borderWidth={1}
										rounded={"full"}
										gap={2.5}
										p={2}
									>
										<CategoryIcon
											category={category ?? null}
											size={{ base: 12, md: 24 }}
										/>
									</Box>
									<Heading
										mt={{ base: 0, md: 7 }}
										size={{ base: "2xl", md: "4xl" }}
									>
										{category?.name}
									</Heading>
								</Flex>
							</Flex>
						</Flex>
					</Drawer.Header>
					<Drawer.Body>
						<Flex gap={5} flexDir={"column"} w={"full"}>
							<CollapsibleLayout
								defaultOpen
								item={{
									buttonContent: (
										<Flex gap={2} alignItems={"center"}>
											<InfoCircleIcon color={"blue.600"} w={6} h={6} />
											<Text fontWeight={500} fontSize={16}>
												Fonctionnalités
											</Text>
										</Flex>
									),
									content: (
										<Prose>
											{category.fonctionnalities ? (
												<RichText data={category.fonctionnalities} />
											) : (
												<Flex gap={2}>
													<Text>Aucune information</Text>
												</Flex>
											)}
										</Prose>
									),
								}}
							/>
							<CollapsibleLayout
								item={{
									buttonContent: (
										<Flex gap={2} alignItems={"center"}>
											<TriangleExclamationIcon color={"gray.700"} w={6} h={6} />
											<Text fontWeight={500} fontSize={16}>
												Points de vigilance
											</Text>
										</Flex>
									),
									content: (
										<Prose>
											{category.vigilances ? (
												<RichText data={category.vigilances} />
											) : (
												<Flex gap={2}>
													<Text>Aucune information</Text>
												</Flex>
											)}
										</Prose>
									),
								}}
							/>
							<CollapsibleLayout
								item={{
									buttonContent: (
										<Flex gap={2} alignItems={"center"}>
											<DocumentListCheck color={"gray.800"} w={6} h={6} />
											<Text fontWeight={500} fontSize={16}>
												Recommandations et mentions obligatoires
											</Text>
										</Flex>
									),
									content: (
										<Prose>
											{category.recommendations ? (
												<RichText data={category.recommendations} />
											) : (
												<Flex gap={2}>
													<Text>Aucune information</Text>
												</Flex>
											)}
										</Prose>
									),
								}}
							/>
						</Flex>
					</Drawer.Body>
					<Drawer.Footer />
				</Drawer.Content>
			</Drawer.Positioner>
		</Drawer.Root>
	);
}
