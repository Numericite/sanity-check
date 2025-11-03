import { Button, Flex, Text } from "@chakra-ui/react";
import { CheckDoubleIcon } from "./ui/icon/icons";
import NextLink from "next/link";

export default function ContactSuccess() {
	return (
		<Flex
			as={"form"}
			flexDir="column"
			h="full"
			backgroundColor={"white"}
			p={10}
			gap={5}
			rounded={"3xl"}
			borderWidth={1}
			borderColor={"gray.100"}
		>
			<Flex flexDir={"column"} gap={5}>
				<CheckDoubleIcon color={"green.600"} h={20} w={20} />
				<Text fontSize={20} fontWeight={500}>
					Merci pour votre contribution !
				</Text>
				<Text fontSize={16} fontWeight={400} color={"gray.800"}>
					Votre demande sera traitée prochainement
				</Text>
				<Flex>
					<Button colorPalette={"primary"}>
						<NextLink href={"/"}>Retour au site</NextLink>
					</Button>
				</Flex>
			</Flex>
		</Flex>
	);
}
