import { Button, Flex, Tabs } from "@chakra-ui/react";
import { useState } from "react";

type Item = {
	key: string;
	label: string;
	content: React.ReactNode;
};

type Props = {
	items: Item[];
	defaultValue?: string;
};

export default function TabLayout({ items, defaultValue }: Props) {
	const [value, setValue] = useState(defaultValue);

	return (
		<Tabs.Root
			value={value}
			onValueChange={(details) => setValue(details.value)}
			defaultValue={defaultValue}
			unstyled
			w={"full"}
		>
			<Flex
				w={"full"}
				flexDir={"column"}
				justifyContent={"center"}
				alignItems={"center"}
				gap={{ base: 3, md: 10 }}
			>
				<Tabs.List>
					<Flex
						rounded={"xl"}
						p={1}
						gap={{ base: 1, md: 3 }}
						bgColor={"gray.50"}
					>
						{items.map((item) => (
							<Tabs.Trigger asChild key={item.key} value={item.key}>
								<Button
									size={{ base: "sm", md: "md" }}
									variant={value === item.key ? "solid" : "ghost"}
								>
									{item.label}
								</Button>
							</Tabs.Trigger>
						))}
					</Flex>
				</Tabs.List>
				{items.map((item) => (
					<Tabs.Content w={"full"} px={2} key={item.key} value={item.key}>
						{item.content}
					</Tabs.Content>
				))}
			</Flex>
		</Tabs.Root>
	);
}
