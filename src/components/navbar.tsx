import { Box, Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

const NavbarItem = ({
	href,
	isActive,
	children,
}: {
	href: string;
	children: React.ReactNode;
	isActive: boolean;
}) => (
	<Box position="relative">
		<ChakraLink
			color="black"
			_hover={{ textDecoration: "none", color: "primary.active" }}
			_focus={{ outline: "none" }}
			aria-current={isActive ? "page" : undefined}
			asChild
		>
			<NextLink href={href} passHref>
				{children}
			</NextLink>
		</ChakraLink>
		<Box
			h="2px"
			bgColor={isActive ? "primary.active" : "transparent"}
			position="absolute"
			bottom={-1}
			left={0}
			right={0}
			rounded="full"
		/>
	</Box>
);

const Navbar = () => {
	const pathname = usePathname();

	return (
		<Container zIndex={"max"} bgColor={"white"}>
			<Flex alignItems="center" justifyContent="space-between" py={6}>
				<ChakraLink
					color="black"
					_hover={{ textDecoration: "none" }}
					_focus={{ outline: "none" }}
					asChild
				>
					<NextLink href="/" passHref>
						<Flex alignItems="center" gap={2}>
							<Box bgColor="primary.active" rounded="full" px={3} py={1}>
								<Text color="white" fontWeight={500} fontSize={20}>
									S
								</Text>
							</Box>
							<Heading color="black">Sanity Check</Heading>
						</Flex>
					</NextLink>
				</ChakraLink>
				<Flex alignItems="center" gap={7}>
					<NavbarItem href="/" isActive={pathname === "/"}>
						Accueil
					</NavbarItem>
					<NavbarItem
						href="/categories"
						isActive={pathname?.startsWith("/categories") ?? false}
					>
						Catégories d'outils
					</NavbarItem>
					<NavbarItem href="/about" isActive={pathname === "/about"}>
						À propos
					</NavbarItem>
				</Flex>
				<Flex alignItems="center" gap={4}>
					<Text color="black">Un outil manque ?</Text>
					<Button colorPalette="primary" variant="outline">
						Contactez-nous
					</Button>
				</Flex>
			</Flex>
		</Container>
	);
};

export default Navbar;
