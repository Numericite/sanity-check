import {
	Button,
	Drawer,
	Flex,
	Heading,
	Icon,
	Link as ChakraLink,
	Box,
	CloseButton,
} from "@chakra-ui/react";
import { HiBars3 } from "react-icons/hi2";
import NextLink from "next/link";
import { useState } from "react";

type Props = {
	href: string;
	isActive: boolean;
	children: React.ReactNode;
	close: () => void;
};

function NavbarItem({ href, isActive = false, children, close }: Props) {
	return (
		<Flex position="relative" mb={5}>
			<ChakraLink
				color="black"
				_hover={{ textDecoration: "none", color: "primary.active" }}
				_focus={{ outline: "none" }}
				aria-current={isActive ? "page" : undefined}
				fontSize={20}
				asChild
				onClick={close}
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
		</Flex>
	);
}

export default function MobileNavbar({
	pathname,
}: { pathname: string | null }) {
	const [open, setOpen] = useState(false);

	return (
		<Flex
			display={{ base: "flex", md: "none" }}
			justifyContent={"center"}
			alignItems={"center"}
		>
			<Drawer.Root
				open={open}
				onOpenChange={(e) => setOpen(e.open)}
				size={"lg"}
			>
				<Drawer.Backdrop />
				<Drawer.Trigger asChild>
					<Button variant={"plain"} aria-label="Ouvrir le menu">
						<Icon h={7} w={7} as={HiBars3} />
					</Button>
				</Drawer.Trigger>
				<Drawer.Positioner>
					<Drawer.Content
						w={"80"}
						roundedLeft={"4xl"}
						borderWidth={1}
						borderColor={"gray.100"}
						p={2}
					>
						<Drawer.Header>
							<Drawer.Title fontSize={"2xl"}>Sanity Check</Drawer.Title>
							<Drawer.CloseTrigger asChild pos="initial">
								<CloseButton />
							</Drawer.CloseTrigger>
						</Drawer.Header>
						<Drawer.Body gap={2}>
							<NavbarItem
								href="/"
								isActive={pathname === "/"}
								close={() => setOpen(false)}
							>
								Accueil
							</NavbarItem>
							<NavbarItem
								close={() => setOpen(false)}
								href="/categories"
								isActive={pathname?.startsWith("/categories") ?? false}
							>
								Catégories d'outils
							</NavbarItem>
							<NavbarItem
								href="/about"
								close={() => setOpen(false)}
								isActive={pathname === "/about"}
							>
								À propos
							</NavbarItem>
							<Button
								asChild
								w={"full"}
								mt={2}
								colorScheme="blue"
								variant="outline"
								onClick={() => setOpen(false)}
							>
								<NextLink href={"/contact"}>Contactez-nous</NextLink>
							</Button>
						</Drawer.Body>
					</Drawer.Content>
				</Drawer.Positioner>
			</Drawer.Root>
		</Flex>
	);
}
