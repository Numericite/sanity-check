import { Image as ChakraImage, Skeleton } from "@chakra-ui/react";
import NextImage from "next/image";
import { useState } from "react";
import type { Media } from "~/payload/payload-types";

interface ToolLogoProps {
	media: number | Media | null | undefined;
	size?: number;
}

const ToolLogo: React.FC<ToolLogoProps> = ({ media, size = 52 }) => {
	const [isLoading, setIsLoading] = useState(true);

	if (
		typeof media === "number" ||
		typeof media === null ||
		typeof media === undefined ||
		!media?.url
	)
		return null;

	const loaded = () => {
		setIsLoading(false);
	};

	return (
		<Skeleton
			loading={!isLoading}
			borderRadius={12}
			width={`${size}px`}
			height={`${size}px`}
		>
			<ChakraImage asChild borderRadius={12}>
				<NextImage
					src={`${process.env.NEXT_PUBLIC_URL}${media.url}`}
					alt={media.alt}
					width={size}
					height={size}
					onLoad={() => loaded}
				/>
			</ChakraImage>
		</Skeleton>
	);
};

export default ToolLogo;
