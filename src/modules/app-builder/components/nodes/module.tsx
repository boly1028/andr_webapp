import { useCallback } from "react";
import { Handle, Position } from "react-flow-renderer";

// Setup Visual Elements
import { Box, Button, Circle, Text, Icon, HStack } from "@chakra-ui/react";
import { Server } from "lucide-react";

const handleStyle = {
  background: "#9360FB",
  width: 8,
  height: 8,
  border: "1px solid #000",
};

//Data = Prop declared for content loading
function ModuleNode({ data }) {
  //Triggered on Change Event
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="module-node">
      <Handle
        type="source"
        position={Position.Top}
        style={handleStyle}
        id="left"
      />
      <div>
        <HStack spacing={4} padding={2}>
          <Circle size="26px" paddingRight={0} bg="primary.400" color="white">
            <Icon as={Server} />
          </Circle>
          <Text color="grey.700" fontSize="md" fontWeight={200}>
            {data.title}
          </Text>
          <Text color="gray.500" fontSize="xs" fontWeight={100}>
            "{data.id}"
          </Text>
        </HStack>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        style={handleStyle}
        id="right"
      />
    </div>
  );
}

export default ModuleNode;
