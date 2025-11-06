import { Badge as ChakraBadge, type ConditionalValue } from "@chakra-ui/react";

type Props = {
	color?: string;
	rounded?: "default" | "full";
	size?: ConditionalValue<"md" | "sm" | "lg" | "xs" | undefined>;
	active?: boolean;
	children: React.ReactNode;
};

export default function Badge({
	color = "gray",
	rounded = "default",
	size = "md",
	active,
	children,
}: Props) {
	return (
		<ChakraBadge
			bgColor={`${color}.${active ? 600 : 50}`}
			borderColor={`${color}.${active ? 600 : 100}`}
			borderWidth={1}
			size={size}
			rounded={rounded === "full" ? "full" : undefined}
			fontSize={size === "lg" ? 16 : undefined}
			fontWeight={400}
			color={active ? "white" : `${color}.900`}
		>
			{children}
		</ChakraBadge>
	);
}
