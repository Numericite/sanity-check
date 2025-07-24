"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { appChakraSystem } from "~/utils/chakra-system";

export function Provider(props: ColorModeProviderProps) {
	return (
		<ChakraProvider value={appChakraSystem}>
			<ColorModeProvider {...props} />
		</ChakraProvider>
	);
}
