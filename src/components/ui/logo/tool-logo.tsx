import {
	Image as ChakraImage,
	Skeleton,
	type ConditionalValue,
} from "@chakra-ui/react";
import NextImage from "next/image";
import { useState } from "react";
import type { Media } from "~/payload/payload-types";
import { getPopulated } from "~/utils/payload-helpers";

interface ToolLogoProps {
	media: number | Media | null | undefined;
	size?: ConditionalValue<number | undefined>;
}

export default function ToolLogo({ media, size = 12 }: ToolLogoProps) {
	const [isLoading, setIsLoading] = useState(true);
	const mediaPopulated = getPopulated(media);

	if (!mediaPopulated || !mediaPopulated?.url)
		return <Skeleton loading={true} rounded={"xl"} w={size} h={size} />;

	const loaded = () => {
		setIsLoading(false);
	};

	return (
		<Skeleton
			loading={isLoading}
			rounded={"xl"}
			w={size}
			h={size}
			position={"relative"}
		>
			<ChakraImage asChild rounded={"xl"}>
				<NextImage
					src={`${mediaPopulated.url}`}
					alt={mediaPopulated.alt}
					fill
					onLoad={loaded}
				/>
			</ChakraImage>
		</Skeleton>
	);
}
