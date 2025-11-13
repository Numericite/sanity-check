import { Box, Container } from "@chakra-ui/react";
import Navbar from "./navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Navbar />
			<Box as="main" bgColor="bg.subtle" minH="calc(100vh - 88px)">
				<Container position={"static"} p={0}>
					{children}
				</Container>
			</Box>
		</>
	);
}
