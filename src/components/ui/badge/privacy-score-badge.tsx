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

const PrivacyScoreBadge = ({
  score,
  active = true,
  size = "md",
}: PrivacyScoreBadgeProps) => {
  const normalizedScore = score ?? "N";

  return (
    <Badge
      color={active ? "white" : colors[normalizedScore].active}
      bgColor={
        active
          ? colors[normalizedScore].active
          : colors[normalizedScore].bgColor
      }
      fontSize={size === "md" ? 22 : 20}
      fontWeight={500}
      lineHeight="0.7"
      borderWidth={1}
      borderColor={
        active
          ? colors[normalizedScore].bgColor
          : colors[normalizedScore].bgColor
      }
      p={size === "md" ? 2.5 : 1.5}
    >
      {normalizedScore}
    </Badge>
  );
};

export default PrivacyScoreBadge;
