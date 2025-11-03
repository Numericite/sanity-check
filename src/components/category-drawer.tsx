import { Box, Button, Drawer, Flex, Text } from "@chakra-ui/react";
import type { Category } from "~/payload/payload-types";
import CategoryIcon from "./ui/icon/category-icon";
import Badge from "./ui/badge/badge";

type Props = {
	category: Category | undefined;
};

export default function CategoryDrawer({ category }: Props) {
	if (!category) return <Button variant={"outline"}>En savoir plus</Button>;

	return (
		<Drawer.Root size={"lg"}>
			<Drawer.Backdrop />
			<Drawer.Trigger asChild>
				<Button variant={"outline"}>En savoir plus</Button>
			</Drawer.Trigger>
			<Drawer.Positioner>
				<Drawer.Content
					roundedLeft={"4xl"}
					borderWidth={1}
					borderColor={"gray.100"}
					p={2}
					gap={7}
				>
					<Drawer.CloseTrigger />
					<Drawer.Header>
						<Flex flexDir={"column"} w={"full"}>
							<Flex
								h={32}
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
									<CategoryIcon category={category ?? null} size={100} />
								</Box>
							</Flex>
							<Flex
								w={"full"}
								pl={5}
								justifyContent={"space-between"}
								alignItems={"end"}
								mt={-7}
							>
								<Flex gap={3} alignItems={"end"} justifyContent={"start"}>
									<Flex
										w={28}
										h={28}
										bgColor={"white"}
										borderColor={"gray.100"}
										borderWidth={1}
										rounded={"full"}
										gap={2.5}
										justifyContent={"center"}
										alignItems={"center"}
										p={2}
									>
										<CategoryIcon category={category ?? null} size={60} />
									</Flex>

									<Flex h={24} alignItems={"center"} gap={5}>
										<Text fontSize={30} fontWeight={500}>
											{category?.name}
										</Text>
									</Flex>
								</Flex>
							</Flex>
						</Flex>
					</Drawer.Header>
					<Drawer.Body />
					<Drawer.Footer />
				</Drawer.Content>
			</Drawer.Positioner>
		</Drawer.Root>
	);
}
