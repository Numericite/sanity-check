import {
  Box,
  Button,
  Flex,
  For,
  Grid,
  GridItem,
  Image,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import NextImage from "next/image";
import PrivacyScoreBadge from "~/components/PrivacyScoreBadge";
import CategoryBadge from "~/components/CategoryBadge";
import type { icons } from "~/components/Icons";
import NextLink from "next/link";
import { LuExternalLink } from "react-icons/lu";
import ToolsCaroussel from "~/components/ToolsCaroussel";

const ToolPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: tool, isLoading } = api.tool.getById.useQuery(Number(id), {
    enabled: !!id,
  });

  const { data: tools, isFetching: isLoadingTools } = api.tool.getList.useQuery(
    {
      limit: 6,
      filters: [
        { key: "privacy_score_saas", value: "A" },
        {
          key: "id",
          operation: "not_equals",
          value: (tool?.id ?? 0).toString(),
        },
      ],
    },
    {
      initialData: Array.from({ length: 6 }),
    }
  );
  console.log(tools);

  return (
    <Flex gap={6} flexDir={"column"}>
      {/* Content */}
      <Flex
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        h="full"
        backgroundColor={"white"}
        p={5}
        rounded={"2xl"}
        mt={62}
      >
        {/* Header */}
        <Flex w={"full"} flexDir={"column"}>
          {/* Banner */}
          <Flex
            h={60}
            w={"full"}
            backgroundColor={"orange.50"}
            borderColor={"orange.100"}
            borderWidth={1}
            rounded={"2xl"}
          />

          {/* Header informations (title, score, buttons) */}
          <Flex
            flexDir={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            w={"full"}
            my={4.5}
            mt={"-10"}
            gap={"1.5"}
          >
            {/* Informations (title, score, category) */}
            <Flex
              flexDir={"row"}
              alignItems={"end"}
              justifyContent={"space-between"}
              gap={5}
              pl={10}
            >
              {/* Logo */}
              <Box
                padding={2}
                backgroundColor={"white"}
                rounded={"lg"}
                borderWidth={1}
                borderColor={"gray.100"}
              >
                <Skeleton loading={isLoading} rounded={"lg"}>
                  <Image lineClamp={1} asChild rounded={"lg"}>
                    <NextImage
                      src={`https://logo.clearbit.com/${tool?.site_link?.replace("https://", "").split("/")[0]}`}
                      alt={tool?.name || "Logo de l'outil"}
                      width={112}
                      height={112}
                    />
                  </Image>
                </Skeleton>
              </Box>

              {/* Informations */}
              <Flex
                gap={10}
                alignItems={"center"}
                justifyContent={"center"}
                mb={4.5}
              >
                {tool && (
                  <>
                    {/* Title */}
                    <Text fontSize={40} fontWeight={500}>
                      {tool?.name}
                    </Text>

                    {/* Score */}
                    <PrivacyScoreBadge score={tool?.privacy_score_saas ?? ""} />

                    {/* Category badge */}
                    <CategoryBadge
                      category={tool?.subkind as keyof typeof icons}
                    />
                  </>
                )}
              </Flex>
            </Flex>

            {/* Buttons */}
            <Flex
              flexDir={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              gap={4}
              mt={4.5}
            >
              <Button bgColor={"primary.solid"} asChild>
                <NextLink href={""} target="_blank">
                  <Flex gap={2} alignItems={"center"} justifyContent={"center"}>
                    <Text>Fiche détaillé</Text>
                    <LuExternalLink />
                  </Flex>
                </NextLink>
              </Button>
              <Button colorPalette="primary" variant="outline" asChild>
                <NextLink href={tool?.site_link ?? ""} target="_blank">
                  <Flex gap={2} alignItems={"center"} justifyContent={"center"}>
                    <Text>Site internet</Text>
                    <LuExternalLink />
                  </Flex>
                </NextLink>
              </Button>
            </Flex>
          </Flex>
        </Flex>

        {/* Body (infos) */}
        {!isLoading && tool && (
          <Flex w={"full"} px={4} flexDir={"column"} gap={7}>
            {/* Infos principales */}
            <Grid templateColumns="repeat(12, 1fr)" w={"full"} gap="5">
              {/* DPA */}
              <GridItem colSpan={2}>
                <Box
                  w={"full"}
                  px={4}
                  py={5}
                  backgroundColor={tool.dpa_compliant ? "green.50" : "red.50"}
                  borderColor={tool.dpa_compliant ? "green.100" : "red.100"}
                  borderWidth={1}
                  rounded={"xl"}
                >
                  <Text fontSize={16} fontWeight={500}>
                    DPA
                  </Text>
                  <Box
                    bgColor={tool.dpa_compliant ? "green.100" : "red.100"}
                    mt={5}
                    w={"fit"}
                    p={2}
                    rounded={"sm"}
                    color={tool.dpa_compliant ? "green.600" : "red.600"}
                  >
                    <Text fontSize={14} fontWeight={400}>
                      {tool?.dpa_compliant ? "Conforme" : "Non conforme"}
                    </Text>
                  </Box>
                </Box>
              </GridItem>
              <GridItem colSpan={3}>
                <Box
                  w={"full"}
                  px={4}
                  py={5}
                  backgroundColor={"primary.subtle"}
                  borderColor={"blue.100"}
                  borderWidth={1}
                  rounded={"xl"}
                >
                  <Text fontSize={16} fontWeight={500}>
                    Hébergement des données
                  </Text>
                  <Box bgColor={"white"} mt={5} w={"fit"} p={2} rounded={"sm"}>
                    <Text fontSize={14} fontWeight={400}>
                      🇪🇺 EU
                    </Text>
                  </Box>
                </Box>
              </GridItem>
              <GridItem colSpan={3}>
                <Box
                  w={"full"}
                  px={4}
                  py={5}
                  backgroundColor={"primary.subtle"}
                  borderColor={"blue.100"}
                  borderWidth={1}
                  rounded={"xl"}
                >
                  <Text fontSize={16} fontWeight={500}>
                    Localisation de l'entreprise
                  </Text>
                  <Box bgColor={"white"} mt={5} w={"fit"} p={2} rounded={"sm"}>
                    <Text fontSize={14} fontWeight={400}>
                      {tool.enterprise_location}
                    </Text>
                  </Box>
                </Box>
              </GridItem>
              <GridItem colSpan={4}>
                <Box
                  w={"full"}
                  px={4}
                  py={5}
                  backgroundColor={"gray.50"}
                  borderColor={"gray.100"}
                  borderWidth={1}
                  rounded={"xl"}
                >
                  <Text fontSize={16} fontWeight={500}>
                    Certifications
                  </Text>
                  <Flex flexDir={"row"} gap={3} overflow={"auto"}>
                    <For each={tool.enterprise_certifications?.split(", ")}>
                      {(item, index) => (
                        <Box
                          key={index}
                          bgColor={"white"}
                          mt={5}
                          w={"fit"}
                          p={2}
                          rounded={"sm"}
                        >
                          <Text truncate fontSize={14} fontWeight={400}>
                            {item}
                          </Text>
                        </Box>
                      )}
                    </For>
                  </Flex>
                </Box>
              </GridItem>
            </Grid>
            <Box px={6} rounded={"xl"} borderColor={"blue.50"} borderWidth={1}>
              <Line title="Informations sur les transferts">
                <NextLink
                  target="_blank"
                  href={tool.transfer_informations ?? ""}
                >
                  <Text
                    color={"primary.solid"}
                    textDecoration={"underline"}
                    textUnderlineOffset={2}
                    wordBreak="break-all"
                  >
                    {tool.transfer_informations}
                  </Text>
                </NextLink>
              </Line>

              <Line title="Remarque Localisation Hébergement">
                <Text>
                  {(tool.location_note &&
                    (tool.location_note[0].children[0] as any).text) ??
                    "NC"}
                </Text>
              </Line>

              {/* <Line title="Actions à mener si utilisation de l'outil">
                <Flex flexDir={"row"} flexWrap={"wrap"} gap={3} overflow={"auto"}>
                  <For each={tool.actions?.split(", ")}>
                    {(item, index) => (
                      <Box
                        key={index}
                        bgColor={"gray.50"}
                        w={"fit"}
                        p={2}
                        rounded={"sm"}
                      >
                        <Text truncate fontSize={14} fontWeight={400}>
                          {item}
                        </Text>
                      </Box>
                    )}
                  </For>
                </Flex>
              </Line> */}

              <Line title="Localisation hébergement : utilisateurs finaux">
                <Flex flexDir={"row"} gap={3} overflow={"auto"}>
                  <For each={tool.final_users_location?.split(", ")}>
                    {(item, index) => (
                      <Box
                        key={index}
                        bgColor={"blue.50"}
                        w={"fit"}
                        p={2}
                        rounded={"sm"}
                      >
                        <Text truncate fontSize={14} fontWeight={400}>
                          {item}
                        </Text>
                      </Box>
                    )}
                  </For>
                </Flex>
              </Line>

              <Line title="Entreprise EU">
                <Box
                  bgColor={tool.enterprise_european ? "green.50" : "red.50"}
                  w={"fit"}
                  p={2}
                  rounded={"sm"}
                >
                  <Text
                    truncate
                    fontSize={14}
                    fontWeight={400}
                    color={tool.enterprise_european ? "green.600" : "red.600"}
                  >
                    {tool.enterprise_european ? "Oui" : "Non"}
                  </Text>
                </Box>
              </Line>

              <Line title="Site internet">
                <NextLink target="_blank" href={tool.site_link ?? ""}>
                  <Text
                    color={"primary.solid"}
                    textDecoration={"underline"}
                    textUnderlineOffset={2}
                    wordBreak="break-all"
                  >
                    {tool.site_link}
                  </Text>
                </NextLink>
              </Line>

              <Line title="Certifications des sous-traitants ou hébergeurs">
                <Flex
                  flexDir={"row"}
                  flexWrap={"wrap"}
                  gap={3}
                  overflow={"auto"}
                >
                  <For each={tool.subcontractors_certifications?.split(", ")}>
                    {(item, index) => (
                      <Box
                        key={index}
                        bgColor={"gray.50"}
                        w={"fit"}
                        p={2}
                        rounded={"sm"}
                      >
                        <Text truncate fontSize={14} fontWeight={400}>
                          {item}
                        </Text>
                      </Box>
                    )}
                  </For>
                </Flex>
              </Line>

              <Line title="Lien DPA si applicable">
                <NextLink target="_blank" href={tool.dpa_link ?? ""}>
                  <Text
                    color={"primary.solid"}
                    textDecoration={"underline"}
                    textUnderlineOffset={2}
                    wordBreak="break-all"
                  >
                    {tool.dpa_link}
                  </Text>
                </NextLink>
              </Line>

              <Line title="Encadrement des transferts">
                <Flex
                  flexDir={"row"}
                  flexWrap={"wrap"}
                  gap={3}
                  overflow={"auto"}
                >
                  <For each={tool.transfer_supervision?.split(", ")}>
                    {(item, index) => (
                      <Box
                        key={index}
                        bgColor={"gray.50"}
                        w={"fit"}
                        p={2}
                        rounded={"sm"}
                      >
                        <Text truncate fontSize={14} fontWeight={400}>
                          {item}
                        </Text>
                      </Box>
                    )}
                  </For>
                </Flex>
              </Line>

              <Line title="Fonctionnalités RGPD/Sécurité">
                <Flex
                  flexDir={"row"}
                  flexWrap={"wrap"}
                  gap={3}
                  overflow={"auto"}
                >
                  <For each={tool.rgpd_feature?.split(", ")}>
                    {(item, index) => (
                      <Box
                        key={index}
                        bgColor={"gray.50"}
                        w={"fit"}
                        p={2}
                        rounded={"sm"}
                      >
                        <Text truncate fontSize={14} fontWeight={400}>
                          {item}
                        </Text>
                      </Box>
                    )}
                  </For>
                </Flex>
              </Line>

              <Line title="Documentation en FR">
                <Box
                  bgColor={tool.fr_documentation ? "green.50" : "red.50"}
                  w={"fit"}
                  p={2}
                  rounded={"sm"}
                >
                  <Text
                    truncate
                    fontSize={14}
                    fontWeight={400}
                    color={tool.fr_documentation ? "green.600" : "red.600"}
                  >
                    {tool.fr_documentation ? "Oui" : "Non"}
                  </Text>
                </Box>
              </Line>

              <Line title="Possibilité de selfhost">
                <Box
                  bgColor={
                    tool.self_host_possibility === "Oui" ? "green.50" : "red.50"
                  }
                  w={"fit"}
                  p={2}
                  rounded={"sm"}
                >
                  <Text
                    truncate
                    fontSize={14}
                    fontWeight={400}
                    color={
                      tool.self_host_possibility === "Oui"
                        ? "green.600"
                        : "red.600"
                    }
                  >
                    {tool.self_host_possibility === "Oui" ? "Oui" : "Non"}
                  </Text>
                </Box>
              </Line>

              <Line title="Open source">
                <Box
                  bgColor={tool.opensource === "Oui" ? "green.50" : "red.50"}
                  w={"fit"}
                  p={2}
                  rounded={"sm"}
                >
                  <Text
                    truncate
                    fontSize={14}
                    fontWeight={400}
                    color={tool.opensource === "Oui" ? "green.600" : "red.600"}
                  >
                    {tool.opensource === "Oui" ? "Oui" : "Non"}
                  </Text>
                </Box>
              </Line>

              <Line title='Certifié "DPF"'>
                <Text>
                  {tool.certification_dpf ? tool.certification_dpf : "NC"}
                </Text>
              </Line>

              <Line title="Sous-traitants ultérieurs (Hébergement/Infrastructure)">
                <Flex
                  flexDir={"row"}
                  flexWrap={"wrap"}
                  gap={3}
                  overflow={"auto"}
                >
                  <For each={tool.subcontractors_infra?.split(", ")}>
                    {(item, index) => (
                      <Box
                        key={index}
                        bgColor={"gray.50"}
                        w={"fit"}
                        p={2}
                        rounded={"sm"}
                      >
                        <Text truncate fontSize={14} fontWeight={400}>
                          {item}
                        </Text>
                      </Box>
                    )}
                  </For>
                </Flex>
              </Line>

              <Line title="DPA accessible en ligne">
                <Box
                  bgColor={
                    tool.online_accessible_dpa === "Oui" ? "green.50" : "red.50"
                  }
                  w={"fit"}
                  p={2}
                  rounded={"sm"}
                >
                  <Text
                    truncate
                    fontSize={14}
                    fontWeight={400}
                    color={
                      tool.online_accessible_dpa === "Oui"
                        ? "green.600"
                        : "red.600"
                    }
                  >
                    {tool.online_accessible_dpa === "Oui" ? "Oui" : "Non"}
                  </Text>
                </Box>
              </Line>

              <Line title="Localisation hébergement : relation client">
                <Flex
                  flexDir={"row"}
                  flexWrap={"wrap"}
                  gap={3}
                  overflow={"auto"}
                >
                  <For each={tool.location_host_client?.split(", ")}>
                    {(item, index) => (
                      <Box
                        key={index}
                        bgColor={"gray.50"}
                        w={"fit"}
                        p={2}
                        rounded={"sm"}
                      >
                        <Text truncate fontSize={14} fontWeight={400}>
                          {item}
                        </Text>
                      </Box>
                    )}
                  </For>
                </Flex>
              </Line>

              <Line title="Type d'outil">
                <Flex
                  flexDir={"row"}
                  flexWrap={"wrap"}
                  gap={3}
                  overflow={"auto"}
                >
                  <For each={tool.tool_kind?.split(", ")}>
                    {(item, index) => (
                      <Box
                        key={index}
                        bgColor={"gray.50"}
                        w={"fit"}
                        p={2}
                        rounded={"sm"}
                      >
                        <Text truncate fontSize={14} fontWeight={400}>
                          {item}
                        </Text>
                      </Box>
                    )}
                  </For>
                </Flex>
              </Line>

              <Line title="Privacy score SELFHOSTED">
                {tool.privacy_score_self_hosted !== "n/a" ? (
                  <PrivacyScoreBadge
                    score={tool.privacy_score_self_hosted ?? ""}
                  />
                ) : (
                  "N/A"
                )}
              </Line>

              <Line title="Privacy score SAAS">
                {tool.privacy_score_saas !== "n/a" ? (
                  <PrivacyScoreBadge score={tool.privacy_score_saas ?? ""} />
                ) : (
                  "N/A"
                )}
              </Line>

              <Line title="Transfert hors EU">
                <Text>{tool.transfer_out_eu}</Text>
              </Line>

              <Line title="Liste des sous-traitants ultérieurs">
                <NextLink target="_blank" href={tool.subcontractors ?? ""}>
                  <Text
                    color={"primary.solid"}
                    textDecoration={"underline"}
                    textUnderlineOffset={2}
                    wordBreak="break-all"
                  >
                    {tool.subcontractors}
                  </Text>
                </NextLink>
              </Line>

              <Line title="Accès aux données">
                <Flex
                  flexDir={"row"}
                  flexWrap={"wrap"}
                  gap={3}
                  overflow={"auto"}
                >
                  <For each={tool.data_access?.split(", ")}>
                    {(item, index) => (
                      <Box
                        key={index}
                        bgColor={"gray.50"}
                        w={"fit"}
                        p={2}
                        rounded={"sm"}
                      >
                        <Text truncate fontSize={14} fontWeight={400}>
                          {item}
                        </Text>
                      </Box>
                    )}
                  </For>
                </Flex>
              </Line>

              <Line title="Certifications de l'entreprise" last>
                <Flex
                  flexDir={"row"}
                  flexWrap={"wrap"}
                  gap={3}
                  overflow={"auto"}
                >
                  <For each={tool.enterprise_certifications?.split(", ")}>
                    {(item, index) => (
                      <Box
                        key={index}
                        bgColor={"gray.50"}
                        w={"fit"}
                        p={2}
                        rounded={"sm"}
                      >
                        <Text truncate fontSize={14} fontWeight={400}>
                          {item}
                        </Text>
                      </Box>
                    )}
                  </For>
                </Flex>
              </Line>
            </Box>
          </Flex>
        )}
      </Flex>

      {/* Outils similaires */}
      <Flex pt={10} gap={6} flexDir={"column"}>
        <Text fontSize={20} fontWeight={500}>
          Outils similaires
        </Text>

        <ToolsCaroussel tools={tools} isLoading={isLoadingTools} />
      </Flex>
    </Flex>
  );
};

function Line({
  title,
  last = false,
  children,
}: {
  title: string;
  last?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Flex
      w={"full"}
      py={5}
      gap={5}
      borderBottomColor={"blue.50"}
      borderBottomWidth={!last ? 1 : 0}
    >
      <Flex w={"1/3"} justifyContent={"start"} alignItems={"center"}>
        <Text>{title}</Text>
      </Flex>
      <Box h={"100"} bgColor={"blue.50"} w={0.5} rounded={"full"} />
      <Flex
        w={"2/3"}
        flexDir={"row"}
        justifyContent={"start"}
        alignItems={"center"}
      >
        {children}
      </Flex>
    </Flex>
  );
}

export default ToolPage;
