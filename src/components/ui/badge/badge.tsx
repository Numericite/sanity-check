import {
	Badge as ChakraBadge,
	Text,
	type ConditionalValue,
} from "@chakra-ui/react";

type Props = {
	color?: string;
	rounded?: "default" | "full";
	size?: ConditionalValue<"md" | "sm" | "lg" | "xs" | undefined>;
	children: React.ReactNode;
};

export default function Badge({
	color = "gray",
	rounded = "default",
	size = "md",
	children,
}: Props) {
	return (
		<ChakraBadge
			bgColor={`${color}.50`}
			borderColor={`${color}.100`}
			borderWidth={1}
			size={size}
			rounded={rounded === "full" ? "full" : undefined}
			fontSize={size === "lg" ? 16 : undefined}
			fontWeight={400}
			color={`${color}.900`}
		>
			{children}
		</ChakraBadge>
	);
}
