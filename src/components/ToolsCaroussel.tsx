import { Box, Grid, GridItem } from "@chakra-ui/react";
import type { Tool } from "~/payload/payload-types";
import ToolCard from "./ToolCard";
import DotsCaroussel from "./DotsCaroussel";
import { useEffect, useRef, useState } from "react";

type ToolsCarousselProps = {
  tools: Tool[];
  isLoading: boolean;
};

export default function ToolsCaroussel({
  tools,
  isLoading,
}: ToolsCarousselProps) {
  const [active, setActive] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const grid = gridRef.current;
    const scrollWidth = grid.scrollWidth;
    const visibleWidth = grid.clientWidth;
    const numberOfSlides = 4;

    const maxScrollLeft = scrollWidth - visibleWidth;
    const targetScroll = (maxScrollLeft / (numberOfSlides - 1)) * active;

    grid.scrollTo({
      left: targetScroll,
      behavior: "smooth",
    });
  }, [active]);

  return (
    <>
      <Box w={"full"} ref={gridRef} overflow="auto">
        <Grid templateColumns="repeat(6, 1fr)" gap={6} w={"190%"}>
          {tools &&
            tools.length > 0 &&
            tools?.map((tool, index) => (
              <GridItem key={tool?.id ? tool.id : `tool-${index}`}>
                <ToolCard tool={tool?.id ? tool : null} isLoading={isLoading} />
              </GridItem>
            ))}
        </Grid>
      </Box>
      <DotsCaroussel number={4} active={active} setActive={setActive} />
    </>
  );
}
