import { Flex, Heading, Loader, Skeleton } from "@chakra-ui/react";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Head from "next/head";
import { Prose } from "~/components/ui/prose";
import { api } from "~/utils/api";

export default function PersonalData() {
	const { data, isLoading } = api.personalData.get.useQuery();

	return (
		<>
			<Head>
				<title>Données à caractère personnel - Sanity Check</title>
			</Head>
			<Flex
				bgColor={{ base: "white", md: "transparent" }}
				gap={4}
				flexDir={"column"}
				py={{ base: 4, md: 10 }}
			>
				<Flex
					flexDir="column"
					alignItems="center"
					justifyContent="center"
					h="full"
					backgroundColor={"white"}
					p={{ base: 2, md: 10 }}
					gap={10}
					rounded={{ base: "none", md: "3xl" }}
					borderWidth={1}
					borderColor={{ base: "transparent", md: "gray.100" }}
				>
					<Skeleton loading={isLoading} w={"full"}>
						<Prose w={"full"}>
							{data?.content && <RichText data={data?.content} />}
						</Prose>
					</Skeleton>
				</Flex>
			</Flex>
		</>
	);
}
