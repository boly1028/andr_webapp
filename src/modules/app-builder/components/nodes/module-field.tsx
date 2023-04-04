import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { Input, HStack, Flex, Text } from "@chakra-ui/react";

const handleStyle = {
  background: "#9360FB",
  width: 8,
  height: 8,
  border: "1px solid #000",
};

//Data = Prop declared for content loading
function StringNode({ data }: any) {
  //Triggered on Change Event
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="module-field">
      <Handle
        type="target"
        position={Position.Left}
        style={handleStyle}
        id="left"
      />
      <Flex gap={4} padding={1}>
        <Text orientation="vertical" fontSize="xs">
          {data.title}
        </Text>
        {/* <input id="text" name="text" onChange={onChange} /> */}
        <Flex>
          <Input name="text" onChange={onChange} size="xs" />
        </Flex>
      </Flex>
      <Handle
        type="target"
        position={Position.Right}
        style={handleStyle}
        id="right"
      />
    </div>
  );
}

export default StringNode;
