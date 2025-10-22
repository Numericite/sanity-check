import {
	Flex,
	Grid,
	GridItem,
	Link as ChakraLink,
	Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {
	CheckDoubleIcon,
	FileTextSearchIcon,
	TargetIcon,
} from "../ui/icon/icons";

export default function Presentation() {
	return (
		<Flex flexDir={"column"} gap={10}>
			<Text fontSize={16} fontWeight={500}>
				Le Sanity Check est une plateforme numérique qui vous permet d’en savoir
				plus sur la conformité des outils tiers que vous utilisez au quotidien.
			</Text>
			<Grid
				templateColumns={{
					base: "1fr",
					sm: "repeat(2, 1fr)",
					md: "repeat(3, 1fr)",
				}}
				gap={6}
			>
				<GridItem>
					<Flex
						rounded={"2xl"}
						borderWidth={1}
						borderColor={"pink.100"}
						px={5}
						py={4}
						gap={3}
						bgColor={"pink.50"}
						flexDir={"column"}
					>
						<TargetIcon color={"pink.600"} w={11} h={11} />
						<Text fontSize={20} fontWeight={500}>
							Notre objectif
						</Text>
						<Text fontSize={16} fontWeight={300}>
							Proposer une boîte à outils à disposition de tous pour informer,
							sensibiliser et inscrire la conformité dans vos usages.
						</Text>
					</Flex>
				</GridItem>
				<GridItem>
					<Flex
						rounded={"2xl"}
						borderWidth={1}
						borderColor={"blue.100"}
						px={5}
						py={4}
						gap={3}
						bgColor={"blue.50"}
						flexDir={"column"}
					>
						<FileTextSearchIcon color={"blue.600"} w={11} h={11} />
						<Text fontSize={20} fontWeight={500}>
							Notre démarche
						</Text>
						<Text fontSize={16} fontWeight={300}>
							Recenser les outils que vous utilisez pour leur attribuer une note
							allant de A à F que l’on appelle le “Privacy Score”.
						</Text>
					</Flex>
				</GridItem>
				<GridItem>
					<Flex
						rounded={"2xl"}
						borderWidth={1}
						borderColor={"green.100"}
						px={5}
						py={4}
						gap={3}
						bgColor={"green.50"}
						flexDir={"column"}
					>
						<CheckDoubleIcon color={"green.600"} w={11} h={11} />
						<Text fontSize={20} fontWeight={500}>
							Le résultat
						</Text>
						<Text fontSize={16} fontWeight={300}>
							Une bibliothèque évolutive qui référence tous types d’outils
							utilisés par tous types de projets et d’organisations.
						</Text>
					</Flex>
				</GridItem>
			</Grid>
			<Text fontSize={16} fontWeight={300}>
				Nous l’enrichissons notamment grâce à vos retours. Si vous utilisez un
				outil qui n’est pas référencé,{" "}
				<ChakraLink
					asChild
					color={"blue.600"}
					textDecoration={"underline"}
					fontWeight={500}
				>
					<NextLink href={"/contact"}>faites nous en part !</NextLink>
				</ChakraLink>
			</Text>
		</Flex>
	);
}
