import { Badge } from "@chakra-ui/react";

type PrivacyScoreBadgeProps = {
	score: "A" | "B" | "C" | "D" | "E" | "F" | "N" | null | undefined;
	active?: boolean;
	size?: "md" | "sm";
};

const colors = {
	A: { active: "green.500", bgColor: "green.50" },
	B: { active: "lime.500", bgColor: "lime.50" },
	C: { active: "yellow.500", bgColor: "yellow.50" },
	D: { active: "orange.500", bgColor: "orange.50" },
	E: { active: "red.500", bgColor: "red.50" },
	F: { active: "red.500", bgColor: "red.50" },
	N: { active: "gray.500", bgColor: "gray.50" },
};

const styles = {
	md: { fontSize: 22, p: 2.5 },
	sm: { fontSize: 20, p: 1.5 },
};

const PrivacyScoreBadge = ({
	score,
	active = true,
	size = "md",
}: PrivacyScoreBadgeProps) => {
	const normalizedScore = score ?? "N";
	const color = active
		? colors[normalizedScore].active
		: colors[normalizedScore].bgColor;
	const fontColor = active ? "white" : colors[normalizedScore].active;

	return (
		<Badge
			color={fontColor}
			bgColor={color}
			fontWeight={500}
			lineHeight="0.7"
			borderWidth={1}
			borderColor={color}
			{...styles[size]}
		>
			{normalizedScore}
		</Badge>
	);
};

export default PrivacyScoreBadge;
