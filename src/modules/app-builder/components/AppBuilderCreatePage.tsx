import ReactFlow, { Controls, MiniMap, Background } from "react-flow-renderer";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { PlusIcon } from "@/modules/common";

const AppBuilderCreatePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onConnect = () => {
    console.log("connect");
  };

  return (
    <Box position="relative" h="100%">
      <ReactFlow
        style={{ width: "100%", height: "100%" }}
        onConnect={onConnect}
        connectionLineStyle={{ stroke: "#ddd", strokeWidth: 2 }}
        snapToGrid={true}
        snapGrid={[16, 16]}
      >
        <Background gap={12} size={1} />
        <MiniMap
          nodeColor={(n) => {
            if (n.type === "input") return "blue";
            return "#FFCC00";
          }}
        />
        <Controls />
      </ReactFlow>
      <Box position="absolute" top="0" right="0" zIndex={10} m={8}>
        <Button
          leftIcon={<PlusIcon boxSize={4} />}
          colorScheme="purple"
          size="lg"
          onClick={onOpen}
        >
          Add ADO
        </Button>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Add ADO</DrawerHeader>
            <DrawerBody>ADOs List</DrawerBody>
            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </Box>
  );
};

export default AppBuilderCreatePage;
