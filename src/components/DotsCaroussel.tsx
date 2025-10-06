import { Box, Flex } from "@chakra-ui/react";

type DotsCarousselProps = {
  number: number;
  active: number;
  setActive: (val: number) => void;
};

export default function DotsCaroussel({
  number,
  active,
  setActive,
}: DotsCarousselProps) {
  return (
    <Flex justifyContent={"center"} alignItems={"center"} gap={2}>
      {Array.from({ length: number }).map((_, index) => (
        <Box
          key={index}
          onClick={() => setActive(index)}
          transition={"all"}
          w={active === index ? 9 : 3}
          h={3}
          borderRadius={"full"}
          bgColor={active === index ? "primary.solid" : "primary.muted"}
        />
      ))}
    </Flex>
  );
}
