import { Box, Heading } from "@chakra-ui/react";
import Head from "next/head";
import Navbar from "~/components/Navbar";

export default function Home() {
	return (
		<>
			<Head>
				<title>Sanity Check</title>
				<meta name="description" content="Sanity Check" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<Box as="main" bgColor="bg.subtle" minH="calc(100vh - 78px)" p={4}>
				Sanity Check
			</Box>
		</>
	);
}
