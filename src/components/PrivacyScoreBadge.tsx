import { Badge } from "@chakra-ui/react";

type PrivacyScoreBadgeProps = {
	score: string;
	active?: boolean;
	size?: "md" | "sm";
};

const PrivacyScoreBadge = ({
	score,
	active = true,
	size = "md",
}: PrivacyScoreBadgeProps) => {
	const badgeColor = {
		A: { active: "green.500", bgColor: "green.100" },
		B: { active: "lime.500", bgColor: "lime.100" },
		C: { active: "yellow.500", bgColor: "yellow.300" },
		D: { active: "orange.500", bgColor: "orange.300" },
		E: { active: "red.500", bgColor: "red.50" },
		F: { active: "red.800", bgColor: "red.100" },
	}[score] || { active: "gray.500", bgColor: "gray.300" };

	return (
		<Badge
			color={active ? "white" : badgeColor.active}
			bgColor={active ? badgeColor.active : badgeColor.bgColor}
			fontSize={size === "md" ? 22 : 20}
			fontWeight={500}
			lineHeight="0.7"
			borderWidth={1}
			borderColor={active ? badgeColor.bgColor : badgeColor.bgColor}
			p={size === "md" ? 2.5 : 1.5}
		>
			{score}
		</Badge>
	);
};

export default PrivacyScoreBadge;
