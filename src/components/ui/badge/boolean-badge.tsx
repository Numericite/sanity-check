import { Badge, Text } from "@chakra-ui/react";

type Props = {
	val: boolean | null;
	text?: string;
};

export default function BooleanBadge({ val, text }: Props) {
	const color = val ? "green" : val === false ? "red" : "gray";
	const content = text
		? text
		: val
			? "Oui"
			: val === false
				? "Non"
				: "Non renseignée";

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
				{content}
			</Text>
		</Badge>
	);
}
