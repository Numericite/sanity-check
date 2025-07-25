import {
	createSystem,
	defaultConfig,
	defineConfig,
	defineRecipe,
} from "@chakra-ui/react";

const buttonRecipe = defineRecipe({
	base: {
		borderRadius: "xl",
	},
});

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
				lime: {
					50: { value: "#F7FEE7" },
					100: { value: "#ECFCCB" },
					200: { value: "#D9F99D" },
					300: { value: "#BEF264" },
					400: { value: "#A3E635" },
					500: { value: "#84CC16" },
					600: { value: "#65A30D" },
					700: { value: "#4D7C0F" },
					800: { value: "#3F6212" },
					900: { value: "#365314" },
					950: { value: "#1A2E05" },
				},
			},
		},
		semanticTokens: {
			colors: {
				primary: {
					solid: { value: "{colors.blue.600}" },
					contrast: { value: "{colors.white}" },
					fg: { value: "{colors.blue.950}" },
					muted: { value: "{colors.blue.950}" },
					subtle: { value: "{colors.blue.50}" },
					emphasized: { value: "{colors.blue.300}" },
					focusRing: { value: "{colors.blue.500}" },
					active: { value: "{colors.blue.600}" },
				},
				secondary: {
					solid: { value: "{colors.gray.400}" },
					contrast: { value: "{colors.white}" },
					fg: { value: "{colors.gray.950}" },
					muted: { value: "{colors.gray.950}" },
					subtle: { value: "{colors.gray.50}" },
					emphasized: { value: "{colors.gray.300}" },
					focusRing: { value: "{colors.gray.500}" },
					active: { value: "{colors.gray.600}" },
				},
			},
		},
		recipes: {
			button: buttonRecipe,
		},
	},
});

export const appChakraSystem = createSystem(defaultConfig, config);
