import { Flex, Icon, IconButton, Input  } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { LuSearch, LuX } from "react-icons/lu";
import { useDebounce } from "~/hooks/use-debounce";

export default function SearchBar() {
	const searchRef = useRef<HTMLDivElement>(null);
	const [isFocus, setIsFocus] = useState(false);
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebounce(search);

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
			borderColor={isFocus ? "blue.500" : "gray.100"}
			transition="all 0.2s ease-in-out"
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
			>
				<Icon as={LuSearch} boxSize={6} />
			</IconButton>
		</Flex>
	);
}
