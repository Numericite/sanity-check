import { Badge, Text } from "@chakra-ui/react";

type Props = {
  val: boolean | null;
  text?: string | null;
};

export default function BooleanBadge({ val, text = null }: Props) {
  const color = val === true ? "green" : val === false ? "red" : "gray";

  return (
    <Badge
      bgColor={`${color}.50`}
      borderColor={`${color}.100`}
      borderWidth={1}
      w={"fit"}
      p={2}
      rounded={"sm"}
    >
      <Text fontSize={14} fontWeight={400} color={`${color}.900`}>
        {text
          ? text
          : val === true
            ? "Oui"
            : val === false
              ? "Non"
              : "Non renseignée"}
      </Text>
    </Badge>
  );
}
