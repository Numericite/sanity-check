import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import DotsCaroussel from "./dots-carousel";

type CarousselProps<T extends { id: number }> = {
	items: T[] | undefined;
	isLoading: boolean;
	CardComponent: React.ComponentType<{ item: T; isLoading: boolean }>;
};

export default function Carousel<T extends { id: number }>({
	items,
	isLoading,
	CardComponent,
}: CarousselProps<T>) {
	const [active, setActive] = useState(0);
	const gridRef = useRef<HTMLDivElement>(null);

	const numberOfElements = items ? items.length : 0;
	const numberOfSlides = items ? items.length - 2 : 0;

	useEffect(() => {
		if (!gridRef.current) return;

		const grid = gridRef.current;
		const scrollWidth = grid.scrollWidth;
		const visibleWidth = grid.clientWidth;

		const maxScrollLeft = scrollWidth - visibleWidth;
		const targetScroll = (maxScrollLeft / (numberOfSlides - 1)) * active;

		grid.scrollTo({
			left: targetScroll,
			behavior: "smooth",
		});
	}, [active, numberOfSlides]);

	return (
		<>
			<Box w="full" ref={gridRef} overflow="auto">
				<Grid
					templateColumns={`repeat(${numberOfElements < 3 ? 3 : numberOfElements}, 1fr)`}
					gap={6}
					minW="100%"
					w={`${100 + (numberOfSlides - 1) * 30}%`}
				>
					{items &&
						items.length > 0 &&
						items.map((item) => (
							<GridItem key={item.id}>
								<CardComponent item={item} isLoading={isLoading} />
							</GridItem>
						))}
				</Grid>
			</Box>

			{numberOfElements > 3 && (
				<DotsCaroussel
					number={numberOfSlides}
					active={active}
					setActive={setActive}
				/>
			)}
		</>
	);
}
