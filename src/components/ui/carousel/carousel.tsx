import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import DotsCaroussel from "./dots-carousel";

type CarousselProps<T extends { id: number }> = {
	items: T[] | undefined;
	isLoading: boolean;
	component: React.ComponentType<{ item: T; isLoading: boolean }>;
};

export default function Carousel<T extends { id: number }>({
	items,
	isLoading,
	component,
}: CarousselProps<T>) {
	const [active, setActive] = useState(0);
	const gridRef = useRef<HTMLDivElement>(null);
	const Component = component;

	const numberOfElements = items ? items.length : 0;
	const numberOfSlides = Math.max((items?.length || 0) - 2, 1);

	const isProgrammaticScroll = useRef(false);
	const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (!gridRef.current) return;

		const grid = gridRef.current;
		const scrollWidth = grid.scrollWidth;
		const visibleWidth = grid.clientWidth;
		const maxScrollLeft = scrollWidth - visibleWidth;
		const targetScroll = (maxScrollLeft / (numberOfSlides - 1)) * active;

		isProgrammaticScroll.current = true;

		grid.scrollTo({
			left: targetScroll,
			behavior: "smooth",
		});

		const timeout = setTimeout(() => {
			isProgrammaticScroll.current = false;
		}, 300);

		return () => clearTimeout(timeout);
	}, [active, numberOfSlides]);

	useEffect(() => {
		if (!gridRef.current) return;
		const grid = gridRef.current;

		const handleScroll = () => {
			if (isProgrammaticScroll.current) return;

			if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

			scrollTimeout.current = setTimeout(() => {
				const scrollLeft = grid.scrollLeft;
				const scrollWidth = grid.scrollWidth;
				const visibleWidth = grid.clientWidth;
				const maxScrollLeft = scrollWidth - visibleWidth;
				if (maxScrollLeft <= 0) return;

				const slide = Math.round(
					(scrollLeft / maxScrollLeft) * (numberOfSlides - 1),
				);
				setActive(slide);
			}, 50);
		};

		grid.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			grid.removeEventListener("scroll", handleScroll);
			if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
		};
	}, [numberOfSlides]);

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
						items
							.filter((item) => item && item.id !== undefined)
							.map((item) => (
								<GridItem key={item.id}>
									<Component item={item} isLoading={isLoading} />
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
