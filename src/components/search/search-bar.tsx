import {
	Box,
	Button,
	Flex,
	Icon,
	IconButton,
	Input,
	Separator,
	Spinner,
	Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { LuSearch, LuX } from "react-icons/lu";
import { api } from "~/utils/api";
import SearchCategory from "./search-category";
import SearchTool from "./search-tool";
import { IoMdWarning } from "react-icons/io";
import { useDebounce } from "~/hooks/use-debounce";

export default function SearchBar() {
	const searchRef = useRef<HTMLDivElement>(null);
	const [isFocus, setIsFocus] = useState(false);
	const [search, setSearch] = useState("");
	const [error, setError] = useState("");
	const debounce = useDebounce(search);

	const { data: categories, isLoading: isLoadingCategories } =
		api.category.getList.useQuery(
			{
				limit: 0,
				filters: [{ key: "name", operation: "contains", value: debounce }],
				sort: ["name"],
			},
			{ enabled: debounce !== "" && debounce.length > 2 },
		);

	const { data: tools, isLoading: isLoadingTools } = api.tool.getList.useQuery(
		{
			limit: 0,
			filters: [{ key: "name", operation: "contains", value: debounce }],
			sort: ["privacy_score_saas", "dpa_compliant"],
		},
		{ enabled: debounce !== "" && debounce.length > 2 },
	);

	const { data: exampleTools, isLoading: isLoadingExampleTools } =
		api.tool.getList.useQuery({
			limit: 5,
			filters: [{ key: "privacy_score_saas", value: "A" }],
			sort: ["random", "privacy_score_saas", "dpa_compliant"],
		});

	const handleSearch = async () => {
		setIsFocus(true);
	};

	useEffect(() => {
		setError("");
		if (debounce.length < 3 && debounce !== "") {
			setError("Votre recherche doit comporter au moins 3 caractères.");
		}
	}, [debounce]);

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
			<Box ref={searchRef} w={"full"} zIndex={"sticky"}>
				<Flex
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
				<Flex zIndex={"sticky"} position={"relative"} w={"full"}>
					{isFocus && (
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
									{tools && tools.length > 0 && (
										<>
											<Text fontWeight={400} fontSize={16} color={"blue.600"}>
												{tools.length} outil
												{tools.length > 1 ? "s" : ""}
											</Text>
											{tools.map((tool) => (
												<SearchTool key={tool.id} tool={tool} />
											))}
											{categories && categories.length > 0 && (
												<Separator color={"gray.100"} />
											)}
										</>
									)}
									{categories && categories.length > 0 && (
										<>
											<Text fontWeight={400} fontSize={16} color={"blue.600"}>
												{categories.length} catégorie
												{categories.length > 1 ? "s" : ""}
											</Text>
											{categories.map((category) => (
												<SearchCategory
													key={`category-${category.id}`}
													category={category}
												/>
											))}
										</>
									)}
								</>
							) : debounce === "" ? (
								<Flex gap={2} flexDir={"column"}>
									<Flex gap={2} alignItems={"center"}>
										<LuSearch />
										<Text>Rechercher un outil :</Text>
									</Flex>
									<Flex gap={2} flexWrap={"wrap"}>
										{!isLoadingExampleTools &&
											exampleTools?.map((tool) => (
												<Button
													key={`example-tool-${tool.id}`}
													variant={"outline"}
													w={"fit"}
													onClick={() => setSearch(tool.name)}
												>
													{tool.name}
												</Button>
											))}
									</Flex>
								</Flex>
							) : (
								<Flex alignItems={"center"} gap={1}>
									<Text>Aucun résultat</Text>
								</Flex>
							)}
						</Flex>
					)}
				</Flex>
			</Box>
		</>
	);
}
