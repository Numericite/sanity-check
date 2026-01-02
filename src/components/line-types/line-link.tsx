import { Text } from "@chakra-ui/react";
import NextLink from "next/link";

type Props = {
	val: string | null;
};

export default function LineLink({ val }: Props) {
	if (val)
		return (
			<NextLink target="_blank" href={val}>
				<Text
					color={"primary.solid"}
					textDecoration={"underline"}
					textUnderlineOffset={2}
					wordBreak="break-all"
				>
					{val}
				</Text>
			</NextLink>
		);

	return <Text>Aucune information</Text>;
}
