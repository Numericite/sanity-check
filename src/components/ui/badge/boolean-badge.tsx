import Badge from "./badge";

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

	return <Badge color={color}>{content}</Badge>;
}
