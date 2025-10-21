import { Button, Flex, Tabs } from "@chakra-ui/react";
import NextLink from "next/link";
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
				gap={10}
			>
				<Tabs.List>
					<Flex rounded={"xl"} p={1} gap={3} bgColor={"gray.50"}>
						{items.map((item) => (
							<Tabs.Trigger asChild key={item.key} value={item.key}>
								<Button variant={value === item.key ? "solid" : "ghost"}>
									{item.label}
								</Button>
							</Tabs.Trigger>
						))}
					</Flex>
				</Tabs.List>
				{items.map((item) => (
					<Tabs.Content w={"full"} key={item.key} value={item.key}>
						{item.content}
					</Tabs.Content>
				))}
			</Flex>
		</Tabs.Root>
	);
}
