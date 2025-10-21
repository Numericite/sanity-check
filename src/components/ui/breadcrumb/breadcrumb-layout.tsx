import {
	Breadcrumb,
	Link as ChakraLink,
	Flex,
	Icon,
	Text,
} from "@chakra-ui/react";
import NextLink from "next/link";

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
									<Icon color={"blue.600"} w={"15px"} h={"15px"}>
										<svg viewBox="0 0 24 24" aria-labelledby="home-dash">
											<title id="home-dash">Accueil</title>
											<path
												opacity="0.4"
												fill-rule="evenodd"
												clip-rule="evenodd"
												d="M19.5128 18.9483L20.9679 10.9652C21.0979 10.2512 20.8309 9.52329 20.2709 9.06229L13.5888 3.56925C12.6658 2.81025 11.3348 2.81025 10.4118 3.56925L3.72984 9.06229C3.16884 9.52329 2.90182 10.2512 3.03282 10.9652L4.48789 18.9473C4.70489 20.1353 5.73986 20.9993 6.94786 20.9993H17.0538C18.2608 21.0003 19.2958 20.1363 19.5128 18.9483Z"
												fill="currentColor"
											/>
											<path
												d="M14 17.75H10C9.586 17.75 9.25 17.414 9.25 17C9.25 16.586 9.586 16.25 10 16.25H14C14.414 16.25 14.75 16.586 14.75 17C14.75 17.414 14.414 17.75 14 17.75Z"
												fill="currentColor"
											/>
										</svg>
									</Icon>
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
