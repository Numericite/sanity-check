import { Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import CategoryCard from "~/components/ui/card/category-card";
import { api } from "~/utils/api";

export default function Categories() {
	const { data: categories, isLoading } = api.category.getAll.useQuery(
		undefined,
		{
			initialData: Array.from({ length: 6 }),
		},
	);
	return (
		<Flex gap={6} flexDir={"column"}>
			<Flex gap={6} flexDir={"column"}>
				<Text fontSize={30} fontWeight={500}>
					Catégories d'outils
				</Text>
				<Text fontSize={16} fontWeight={300}>
					Terramatisk androcentrism att medellogi inklusive filostat paratologi
					psykokemi stereovalens operastik postaktiv. Prebel semigyn teleaktiv
					kvasicentrism prostik komform än kontratism ambisofi destris. Filotopi
					hypertet oaktat rekrati fonotologi apotet: teramodern abskop. Postlog
					primasocial för demogen sedan antropoaktiv medelpod, polisofi konlogi,
					komtiv deslogi monotris. Du kan vara drabbad.
				</Text>
			</Flex>

			<Grid
				templateColumns={{
					base: "1fr",
					sm: "repeat(2, 1fr)",
					md: "repeat(3, 1fr)",
				}}
				w={"full"}
				gap="6"
			>
				{categories?.map((category, index) => (
					<GridItem key={category?.id ?? `category-${index}`}>
						<CategoryCard
							category={category?.id ? category : null}
							isLoading={isLoading}
						/>
					</GridItem>
				))}
			</Grid>
		</Flex>
	);
}
