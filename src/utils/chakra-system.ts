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
				emerald: {
					50: { value: "#F0FDF4" },
					100: { value: "#DCFCE7" },
					200: { value: "#BBF7D0" },
					300: { value: "#86EFAC" },
					400: { value: "#4ADE80" },
					500: { value: "#22C55E" },
					600: { value: "#16A34A" },
					700: { value: "#15803D" },
					800: { value: "#166534" },
					900: { value: "#14532D" },
					950: { value: "#052E16" },
				},
				fuchsia: {
					50: { value: "#F5F3FF" },
					100: { value: "#EDE9FE" },
					200: { value: "#DDD6FE" },
					300: { value: "#C4B5FD" },
					400: { value: "#A78BFA" },
					500: { value: "#8B5CF6" },
					600: { value: "#7C3AED" },
					700: { value: "#6D28D9" },
					800: { value: "#5B21B6" },
					900: { value: "#4C1D95" },
					950: { value: "#2E1065" },
				},
			},
		},
		semanticTokens: {
			colors: {
				primary: {
					solid: { value: "{colors.blue.600}" },
					contrast: { value: "{colors.white}" },
					fg: { value: "{colors.blue.950}" },
					muted: { value: "{colors.blue.100}" },
					subtle: { value: "{colors.blue.50}" },
					emphasized: { value: "{colors.blue.300}" },
					focusRing: { value: "{colors.blue.500}" },
					active: { value: "{colors.blue.600}" },
				},
				secondary: {
					solid: { value: "{colors.gray.400}" },
					contrast: { value: "{colors.white}" },
					fg: { value: "{colors.gray.950}" },
					muted: { value: "{colors.gray.100}" },
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
