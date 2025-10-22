import {
	Box,
	Flex,
	Icon,
	IconButton,
	Input,
	Separator,
	Spinner,
	Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { LuSearch, LuX } from "react-icons/lu";
import { api } from "~/utils/api";
import SearchCategory from "./search-category";
import SearchTool from "./search-tool";
import { IoMdWarning } from "react-icons/io";

export default function SearchBar() {
	const searchRef = useRef<HTMLDivElement>(null);
	const [isFocus, setIsFocus] = useState(false);
	const [search, setSearch] = useState("");
	const [searchTerm, setSearchTerm] = useState("");
	const [searched, setSearched] = useState(false);
	const [error, setError] = useState("");

	const {
		data: categories,
		isLoading: isLoadingCategories,
		refetch: refetchCategories,
	} = api.category.getList.useQuery(
		{
			limit: 0,
			filters: [{ key: "name", operation: "contains", value: searchTerm }],
			sort: ["name"],
		},
		{ enabled: false },
	);

	const {
		data: tools,
		isLoading: isLoadingTools,
		refetch: refetchTools,
	} = api.tool.getList.useQuery(
		{
			limit: 0,
			filters: [{ key: "name", operation: "contains", value: searchTerm }],
			sort: ["privacy_score_saas", "dpa_compliant"],
		},
		{ enabled: false },
	);

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	const handleSearch = async () => {
		setIsFocus(true);
		setError("");
		if (search.length < 3) {
			setError("Votre recherche doit comporter au moins 3 caractères.");
		} else {
			setSearched(true);
			setSearchTerm(search);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		refetchCategories();
		refetchTools();
	}, [searchTerm]);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				searchRef.current &&
				!searchRef.current.contains(event.target as Node)
			) {
				setIsFocus(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<>
			{isFocus && (
				<Box
					position="absolute"
					bottom={0}
					left={0}
					w={"full"}
					h={"full"}
					bgGradient={"to-t"}
					gradientFrom={"blue.800"}
					gradientTo={"transparent"}
					zIndex={"dropdown"}
				/>
			)}
			<Flex
				ref={searchRef}
				alignItems="center"
				bgColor={isFocus ? "blue.50" : "white"}
				rounded="full"
				px={4}
				py={3}
				mt={8}
				w="full"
				borderWidth={1}
				borderColor={
					isFocus ? (error === "" ? "blue.500" : "red.600") : "gray.100"
				}
				transition="all 0.2s ease-in-out"
				zIndex={"sticky"}
			>
				<Input
					placeholder="Rechercher un outil ou une catégorie"
					size="lg"
					w="full"
					variant="outline"
					outline="none"
					border="none"
					onFocus={() => setIsFocus(true)}
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					onKeyDown={(e) => handleKeyDown(e)}
				/>
				{search && (
					<IconButton
						aria-label="Annuler la recherche"
						bgColor={isFocus ? "white" : "gray.100"}
						rounded="full"
						size="2xs"
						p={0}
						mr={4}
						onClick={() => {
							setSearch("");
							setIsFocus(false);
							setSearched(false);
						}}
					>
						<Icon as={LuX} boxSize={3} color="blue.600" />
					</IconButton>
				)}
				<IconButton
					aria-label="Rechercher un outil"
					rounded="full"
					p={6}
					flex={1}
					colorPalette={isFocus ? "primary" : "black"}
					onClick={() => handleSearch()}
				>
					<Icon as={LuSearch} boxSize={6} />
				</IconButton>
			</Flex>
			<Flex position={"relative"} w={"full"}>
				{(searched || error !== "") && isFocus && (
					<Flex
						position={"absolute"}
						flexDir={"column"}
						w={"full"}
						mt={1}
						rounded={"3xl"}
						borderWidth={1}
						borderColor={"gray.100"}
						p={5}
						gap={5}
						bgColor={"white"}
						zIndex={"sticky"}
					>
						{error !== "" ? (
							<Flex alignItems={"center"} gap={1}>
								<Icon as={IoMdWarning} color={"red.600"} />
								<Text color={"red.600"}>{error}</Text>
							</Flex>
						) : isLoadingCategories && isLoadingTools ? (
							<Flex
								w={"full"}
								flexDir={"column"}
								justifyContent={"center"}
								alignItems={"center"}
							>
								<Spinner size={"xl"} color={"blue.600"} />
								<Text>Chargement...</Text>
							</Flex>
						) : (categories && categories.length > 0) ||
							(tools && tools.length > 0) ? (
							<>
								{categories && categories.length > 0 && (
									<>
										<Text fontWeight={400} fontSize={16} color={"blue.600"}>
											{categories.length} catégorie
											{categories.length > 1 ? "s" : ""}
										</Text>
										{categories.map((category) => (
											<SearchCategory key={category.id} category={category} />
										))}
										<Separator color={"gray.100"} />
									</>
								)}
								{tools && tools.length > 0 && (
									<>
										<Text fontWeight={400} fontSize={16} color={"blue.600"}>
											{tools.length} outil
											{tools.length > 1 ? "s" : ""}
										</Text>
										{tools.map((tool) => (
											<SearchTool key={tool.id} tool={tool} />
										))}
									</>
								)}
							</>
						) : (
							<Flex alignItems={"center"} gap={1}>
								<Text>Aucun résultat</Text>
							</Flex>
						)}
					</Flex>
				)}
			</Flex>
		</>
	);
}
