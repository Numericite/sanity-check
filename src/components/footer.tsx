import { Container, Flex, Heading, Link as ChakraLink, Text } from "@chakra-ui/react";
import NextLink from "next/link";

export default function Footer(){
    const year = new Date().getFullYear();

    return (
        <Container
        background={"bg.white"}
            borderTopWidth={1} 
            borderColor={"gray.100"}
        >
            <Flex
                w={'full'}
                flexDir={{ base: "column", lg: "row" }}
                justifyContent={{ base: "center", lg: "space-between" }}
                alignItems={"stretch"}
                gap={5}
                py={10}
                px={{ base: 5, lg: 10 }}
            >
                <Flex justifyContent={{ base: "center", lg: "start" }} alignItems="center" gap={3}>
                    <Flex
                        bgColor="primary.active"
                        rounded="full"
                        h={12}
                        w={12}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Heading size={{ base: "xl", lg: "2xl" }} color={"white"}>
                            S
                        </Heading>
                    </Flex>
                    <Heading as={"h2"} size={{ base: "xl", lg: "3xl" }}>
                        Sanity Check
                    </Heading>
                </Flex>

                <Flex  
                    alignItems={{ base: "center", lg: "start" }}
                    flexDir={"column"}
                >
                    <Heading color={"primary.active"} as={"h3"} size={{ base: "lg", lg: "xl" }}>
                        Navigation
                    </Heading>
                    <Flex flexDir={'column'} alignItems={{ base: "center", lg: "start" }} gap={{ base: 2, lg: 1 }} mt={2}>
                        <ChakraLink
                            color="black"
                            fontSize={{ base: 14, lg: 16 }}
                            asChild
                        >
                            <NextLink href={"/"} passHref>
                                Accueil
                            </NextLink>
                        </ChakraLink>
                        <ChakraLink
                            color="black"
                            fontSize={{ base: 14, lg: 16 }}
                            asChild
                        >
                            <NextLink href={"/categories"} passHref>
                                Catégories d'outils
                            </NextLink>
                        </ChakraLink>
                        <ChakraLink
                            color="black"
                            fontSize={{ base: 14, lg: 16 }}
                            asChild
                        >
                            <NextLink href={"/about"} passHref>
                                À propos
                            </NextLink>
                        </ChakraLink>
                    </Flex>
                </Flex>

                <Flex 
                    alignItems={{ base: "center", lg: "start" }}
                    flexDir={"column"}
                >
                    <Heading color={"primary.active"} as={"h3"} size={{ base: "lg", lg: "xl" }}>
                        Contact
                    </Heading>
                    <Flex flexDir={"column"} alignItems={{ base: "center", lg: "start" }} gap={{ base: 2, lg: 1 }} mt={2}>
                        <ChakraLink
                            color="black"
                            fontSize={{ base: 14, lg: 16 }}
                            asChild
                        >
                            <NextLink href={"https://numericite.eu"} target="_blank" passHref>
                                Site internet
                            </NextLink>
                        </ChakraLink>
                        <ChakraLink
                            color="black"
                            fontSize={{ base: 14, lg: 16 }}
                            asChild
                        >
                            <NextLink href={"mailto:contact@numericite.eu"} target="_blank" passHref>
                                contact@numericite.eu
                            </NextLink>
                        </ChakraLink>
                    </Flex>
                </Flex>

                <Flex 
                    alignItems={{ base: "center", lg: "start" }}
                    flexDir={"column"}
                >
                    <Heading color={"primary.active"} as={"h3"} size={{ base: "lg", lg: "xl" }}>
                        Juridique
                    </Heading>
                    <Flex flexDir={"column"} alignItems={{ base: "center", lg: "start" }} gap={{ base: 2, lg: 1 }} mt={2}>
                        <ChakraLink
                            color="black"
                            fontSize={{ base: 14, lg: 16 }}
                            asChild
                        >
                            <NextLink href={"/legal-notices"} passHref>
                                Mentions légales
                            </NextLink>
                        </ChakraLink>
                        <Text fontSize={{ base: 14, lg: 16 }}>
                            © {year} Sanity Check
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </Container>
    )
}