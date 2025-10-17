import { Image as ChakraImage, Skeleton } from "@chakra-ui/react";
import NextImage from "next/image";
import { useState } from "react";
import type { Media } from "~/payload/payload-types";
import { getPopulated } from "~/utils/payload-helpers";

interface ToolLogoProps {
	media: number | Media | null | undefined;
	size?: number;
}

export default function ToolLogo({ media, size = 52 }: ToolLogoProps) {
	const [isLoading, setIsLoading] = useState(true);
	const mediaPopulated = getPopulated(media);

	if (!mediaPopulated || !mediaPopulated?.url) return null;

	const loaded = () => {
		setIsLoading(false);
	};

	return (
		<Skeleton
			loading={!isLoading}
			rounded={"xl"}
			width={`${size}px`}
			height={`${size}px`}
		>
			<ChakraImage asChild rounded={"xl"}>
				<NextImage
					src={`${mediaPopulated.url}`}
					alt={mediaPopulated.alt}
					width={size}
					height={size}
					onLoad={() => loaded}
				/>
			</ChakraImage>
		</Skeleton>
	);
}
