import {
	Flex,
	Input,
	InputGroup,
	Button,
	Text,
	Separator,
	Switch,
	Icon,
} from "@chakra-ui/react";
import Badge from "~/components/ui/badge/badge";
import PrivacyScoreBadge from "~/components/ui/badge/privacy-score-badge";
import { IoMdClose } from "react-icons/io";

type Score = "A" | "B" | "C" | "D" | "E" | "F";

interface Props {
	search: string;
	setSearch: (value: string) => void;
	scores: { score: Score; active: boolean }[];
	dpa: boolean;
	locations: { id: number; name: string; active: boolean }[];
	certifications: { id: number; name: string; active: boolean }[];
	handleScore: (index: number) => void;
	handleLocation: (index: number) => void;
	handleCertification: (index: number) => void;
	setDpa: (value: boolean) => void;
}

export default function CategoriesFilters({
	search,
	setSearch,
	scores,
	dpa,
	locations,
	certifications,
	handleScore,
	handleLocation,
	handleCertification,
	setDpa,
}: Props) {
	return (
		<Flex
			flexDir={"column"}
			w={"1/3"}
			px={5}
			py={6}
			borderWidth={1}
			borderColor={"gray.200"}
			rounded={"2xl"}
			gap={7}
			h={"fit"}
		>
			<Text fontSize={24} fontWeight={500}>
				Filtres
			</Text>

			<Flex flexDir={"column"} gap={3}>
				<Text fontSize={16} fontWeight={400}>
					Rechercher
				</Text>
				<InputGroup>
					<Flex
						bgColor={"gray.50"}
						borderRadius={12}
						py={4}
						px={5}
						gap={3}
						borderWidth={1}
						borderColor={"gray.200"}
						alignItems={"center"}
						transition="all 0.2s"
						_focusWithin={{
							borderColor: "blue.500",
							bgColor: "blue.50",
						}}
					>
						<Icon w={6} h={6} color={"gray.800"}>
							<svg viewBox="0 0 24 24" aria-labelledby="search">
								<title id="search">Recherche</title>
								<path
									d="M21.72 21.5257C21.57 21.6757 21.3801 21.7457 21.1901 21.7457C21.0001 21.7457 20.81 21.6757 20.66 21.5257L16.29 17.1557C16.68 16.8357 17.03 16.4857 17.35 16.0957L21.72 20.4657C22.01 20.7557 22.01 21.2357 21.72 21.5257Z"
									fill="currentColor"
								/>
								<path
									opacity="0.4"
									d="M11.1899 18.9961C15.6082 18.9961 19.1899 15.4144 19.1899 10.9961C19.1899 6.57782 15.6082 2.99609 11.1899 2.99609C6.77166 2.99609 3.18994 6.57782 3.18994 10.9961C3.18994 15.4144 6.77166 18.9961 11.1899 18.9961Z"
									fill="currentColor"
								/>
								<path
									d="M14.75 9.5C14.75 9.914 14.414 10.25 14 10.25H8C7.586 10.25 7.25 9.914 7.25 9.5C7.25 9.086 7.586 8.75 8 8.75H14C14.414 8.75 14.75 9.086 14.75 9.5ZM12 11.75H8C7.586 11.75 7.25 12.086 7.25 12.5C7.25 12.914 7.586 13.25 8 13.25H12C12.414 13.25 12.75 12.914 12.75 12.5C12.75 12.086 12.414 11.75 12 11.75Z"
									fill="currentColor"
								/>
							</svg>
						</Icon>
						<Input
							name="search"
							id="search"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Rechercher un outils"
							bgColor={"transparent"}
							outline={"none"}
							unstyled
							fontSize={16}
							fontWeight={400}
						/>
						<Button
							visibility={search !== "" ? "visible" : "hidden"}
							onClick={() => setSearch("")}
							variant={"ghost"}
							size={"xs"}
							p={0.5}
							m={0}
						>
							<IoMdClose />
						</Button>
					</Flex>
				</InputGroup>
			</Flex>
			<Separator />

			<Flex flexDir={"column"} gap={3}>
				<Text fontSize={16} fontWeight={400}>
					Score :
				</Text>
				<Flex gap={2}>
					{scores.map((score, index) => (
						<Button
							key={index}
							unstyled
							cursor={"pointer"}
							onClick={() => handleScore(index)}
						>
							<PrivacyScoreBadge score={score.score} active={score.active} />
						</Button>
					))}
				</Flex>
			</Flex>
			<Separator />

			<Flex flexDir={"column"} gap={3}>
				<Text fontSize={16} fontWeight={400}>
					DPA :
				</Text>
				<Flex gap={2}>
					<Switch.Root
						checked={dpa}
						onCheckedChange={(e) => setDpa(e.checked)}
						colorPalette={"blue"}
					>
						<Switch.HiddenInput />
						<Switch.Control>
							<Switch.Thumb />
						</Switch.Control>
						<Switch.Label fontSize={14} fontWeight={500}>
							DPA conforme
						</Switch.Label>
					</Switch.Root>
				</Flex>
			</Flex>
			<Separator />

			<Flex flexDir={"column"} gap={3}>
				<Text fontSize={16} fontWeight={400}>
					Localisation de l'entreprise :
				</Text>
				<Flex gap={2} flexWrap={"wrap"}>
					{locations.map((location, index) => (
						<Button
							key={location.id}
							unstyled
							cursor={"pointer"}
							onClick={() => handleLocation(index)}
						>
							<Badge color="blue" active={location.active}>
								{location.name}
							</Badge>
						</Button>
					))}
				</Flex>
			</Flex>
			<Separator />

			<Flex flexDir={"column"} gap={3}>
				<Text fontSize={16} fontWeight={400}>
					Certifications de l'entreprise :
				</Text>
				<Flex gap={2} flexWrap={"wrap"}>
					{certifications.map((certification, index) => (
						<Button
							key={index}
							unstyled
							cursor={"pointer"}
							onClick={() => handleCertification(index)}
						>
							<Badge active={certification.active}>{certification.name}</Badge>
						</Button>
					))}
				</Flex>
			</Flex>
		</Flex>
	);
}
