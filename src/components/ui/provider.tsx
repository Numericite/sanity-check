"use client";

import { ChakraProvider } from "@chakra-ui/react";
import appChakraSystem from "~/utils/chakra-system";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={appChakraSystem}>
      <ColorModeProvider forcedTheme="light" {...props} />
    </ChakraProvider>
  );
}
