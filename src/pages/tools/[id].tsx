import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const ToolPage = () => {
	const router = useRouter();
	const { id } = router.query;

	const { data: tool, isLoading } = api.tool.getById.useQuery(Number(id), {
		enabled: !!id,
	});

	return (
		<Box>
			<Flex
				flexDir="column"
				alignItems="center"
				justifyContent="center"
				h="full"
				mt={62}
			>
				<Heading as="h1" size="2xl" mb={4}>
					{tool ? tool.name : "Chargement..."}
				</Heading>
			</Flex>
		</Box>
	);
};

export default ToolPage;
