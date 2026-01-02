import { Text } from "@chakra-ui/react";
import Badge from "../ui/badge/badge";

type Props = {
	val: ("Oui" | "Non" | "Au choix") | null;
};

export default function LineChoice({ val }: Props) {
	const colorTransferOutEu =
		val === "Oui" ? "green" : val === "Non" ? "red" : "gray";

	if (val) return <Badge color={colorTransferOutEu}>{val}</Badge>;

	return <Text>Aucune information</Text>;
}
