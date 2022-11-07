import { Box, Flex, GridItem, Image, SimpleGrid } from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

interface BackdropCardProps {
  flex?: number;
  children?: ReactNode;
  logoComponent?: ReactNode;
}
const BackdropCard: FC<BackdropCardProps> = (props) => {
  const { flex = 1, children, logoComponent } = props;

  return (
    <SimpleGrid
      columns={1}
      gridAutoRows="1fr"
      w="full"
      h="full"
      bg="dark.50"
      pos="relative"
      zIndex={0}
    >
      <Flex
        pos="absolute"
        zIndex={0}
        w="full"
        h="full"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
      >
        {logoComponent}
      </Flex>
      <GridItem colSpan={1} rowSpan={1} />
      <GridItem
        colSpan={1}
        rowSpan={1}
        flex={flex}
        bg="rgba(255,255,255,0.1)"
        backdropFilter="auto"
        backdropBlur="46px"
        p="4"
        zIndex={1}
        pos="relative"
        h='full'
      >
        {children}
      </GridItem>
    </SimpleGrid>
  );
};
export default BackdropCard;
