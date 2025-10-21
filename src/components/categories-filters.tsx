import {
	Flex,
	Input,
	InputGroup,
	Button,
	Text,
	Separator,
	Switch,
} from "@chakra-ui/react";
import Badge from "~/components/ui/badge/badge";
import PrivacyScoreBadge from "~/components/ui/badge/privacy-score-badge";
import { IoMdClose } from "react-icons/io";
import { SearchIcon } from "./ui/icon/icons";

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
						<SearchIcon w={6} h={6} color={"gray.800"} />
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
