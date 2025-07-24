import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
	theme: {
		tokens: {
			fonts: {
				heading: { value: "var(--font-lexend)" },
				body: { value: "var(--font-lexend)" },
			},
			colors: {
				blue: {
					50: { value: "#EFF6FF" },
					100: { value: "#DBEAFE" },
					200: { value: "#BFDBFE" },
					300: { value: "#93C5FD" },
					400: { value: "#60A5FA" },
					500: { value: "#3B82F6" },
					600: { value: "#2563EB" },
					700: { value: "#1D4ED8" },
					800: { value: "#1E40AF" },
					900: { value: "#1E3A8A" },
					950: { value: "#172554" },
				},
			},
		},
		semanticTokens: {
			colors: {
				primary: {
					solid: { value: "{colors.blue.500}" },
					contrast: { value: "{colors.blue.100}" },
					fg: { value: "{colors.blue.700}" },
					muted: { value: "{colors.blue.100}" },
					subtle: { value: "{colors.blue.200}" },
					emphasized: { value: "{colors.blue.300}" },
					focusRing: { value: "{colors.blue.500}" },
					active: { value: "{colors.blue.600}" },
				},
			},
		},
	},
});

export const appChakraSystem = createSystem(defaultConfig, config);
