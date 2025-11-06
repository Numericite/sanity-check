import { Carousel, useBreakpointValue } from "@chakra-ui/react";

type Props<T extends { id: number }> = {
	id: string;
	items: T[];
	isLoading?: boolean;
	component: React.ComponentType<{ item: T; isLoading: boolean }>;
};

export default function CarouselLayout<T extends { id: number }>({
	id,
	items,
	isLoading = false,
	component,
}: Props<T>) {
	const Component = component;

	return (
		<Carousel.Root
			slideCount={items.length}
			slidesPerPage={useBreakpointValue({ base: 1, md: 3 })}
			slidesPerMove={1}
			gap="3"
		>
			<Carousel.ItemGroup>
				{items.map((item, index) => (
					<Carousel.Item key={`${id}-${index}`} index={index}>
						<Component item={item} isLoading={isLoading} />
					</Carousel.Item>
				))}
			</Carousel.ItemGroup>
			<Carousel.Control justifyContent="center" gap="4">
				<Carousel.IndicatorGroup w={"full"} gap={2}>
					{Array.from({
						length:
							items.length - (useBreakpointValue({ base: 0, md: 2 }) ?? 0),
					}).map((_, i) => (
						<Carousel.Indicator
							index={i}
							key={`${id}-indicator-${i}`}
							bgColor={"blue.100"}
							h={3}
							w={3}
							_current={{ bgColor: "blue.600", w: 9 }}
							transition={"all"}
						/>
					))}
				</Carousel.IndicatorGroup>
			</Carousel.Control>
		</Carousel.Root>
	);
}
