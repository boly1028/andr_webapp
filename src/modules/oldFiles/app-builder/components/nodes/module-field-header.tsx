import { useCallback } from "react";
import { Handle, Position } from "reactflow";
import { Center, Input, HStack, Flex, Text } from "@chakra-ui/react";

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
    <div className="module-field-header">
      <Text orientation="horizontal" align="center" fontSize="sm">
        {data.title}
      </Text>
    </div>
  );
}

export default StringNode;