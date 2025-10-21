import { Button, Collapsible, Flex, Icon } from "@chakra-ui/react";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa";

type Item = {
	buttonContent: React.ReactNode;
	content: React.ReactNode;
};

type Props = {
	item: Item;
	defaultOpen?: boolean;
};

export default function CollapsibleLayout({ item, defaultOpen }: Props) {
	const [open, setOpen] = useState(defaultOpen);

	return (
		<Collapsible.Root
			defaultOpen={defaultOpen}
			open={open}
			onOpenChange={(e) => setOpen(e.open)}
		>
			<Flex
				flexDir={"column"}
				borderWidth={1}
				borderColor={"gray.100"}
				rounded={"2xl"}
				bgColor={open ? "gray.50" : "white"}
			>
				<Collapsible.Trigger asChild>
					<Button h={"fit"} w={"full"} unstyled p={5} asChild>
						<Flex justifyContent={"space-between"} alignItems={"center"}>
							<Flex gap={2} alignItems={"center"}>
								{item.buttonContent}
							</Flex>
							<Icon
								transition={"all"}
								transform={open ? "rotate(90deg)" : ""}
								color={"blue.600"}
								w={6}
								h={6}
							>
								<FaChevronRight />
							</Icon>
						</Flex>
					</Button>
				</Collapsible.Trigger>
				<Collapsible.Content>
					<Flex flexDir={"column"} px={5} pb={5} gap={4}>
						{item.content}
					</Flex>
				</Collapsible.Content>
			</Flex>
		</Collapsible.Root>
	);
}
