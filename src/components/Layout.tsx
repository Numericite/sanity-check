import { Box, Container } from "@chakra-ui/react";
import Navbar from "./navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Navbar />
			<Box as="main" bgColor="bg.subtle" minH="calc(100vh - 88px)" p={4}>
				<Container maxW="container.xl">{children}</Container>
			</Box>
		</>
	);
}
