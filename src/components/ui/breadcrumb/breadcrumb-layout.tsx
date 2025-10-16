import { Breadcrumb, Link as ChakraLink, Flex, Text } from "@chakra-ui/react";
import { default as NextLink } from "next/link";
import HomeDash from "../icons/home-dash";

type Item = {
	label: string;
	link?: string;
};

type BreadcrumbLayoutProps = {
	items: Item[];
	home?: boolean;
};

export default function BreadcrumbLayout({
	items,
	home = true,
}: BreadcrumbLayoutProps) {
	return (
		<Breadcrumb.Root>
			<Breadcrumb.List gap={1}>
				{home && (
					<Breadcrumb.Item>
						<ChakraLink asChild textDecorationColor={"blue.600"}>
							<NextLink href={"/"}>
								<Flex gap={1} justifyContent={"center"} alignItems={"center"}>
									<HomeDash />
									<Text fontSize={14} fontWeight={400} color={"blue.600"}>
										Accueil
									</Text>
								</Flex>
							</NextLink>
						</ChakraLink>
					</Breadcrumb.Item>
				)}
				{items.map((item, index) => (
					<>
						{(home || index > 0) && <Breadcrumb.Separator color={"blue.600"} />}
						<Breadcrumb.Item key={index}>
							{item.link ? (
								<ChakraLink asChild textDecorationColor={"blue.600"}>
									<NextLink href={item.link}>
										<Flex
											gap={1}
											justifyContent={"center"}
											alignItems={"center"}
										>
											<Text fontSize={14} fontWeight={400} color={"blue.600"}>
												{item.label}
											</Text>
										</Flex>
									</NextLink>
								</ChakraLink>
							) : (
								<Flex gap={1} justifyContent={"center"} alignItems={"center"}>
									<Text fontSize={14} fontWeight={400} color={"black"}>
										{item.label}
									</Text>
								</Flex>
							)}
						</Breadcrumb.Item>
					</>
				))}
			</Breadcrumb.List>
		</Breadcrumb.Root>
	);
}
