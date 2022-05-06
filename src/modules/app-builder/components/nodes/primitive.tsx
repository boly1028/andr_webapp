import { useCallback } from "react";
import { Handle, Position } from "react-flow-renderer";

const handleStyle = {
  background: "#FEB9F9",
  width: 8,
  height: 8,
  border: "1px solid #000",
};

//Data = Prop declared for content loading
function PrimitiveNode({ data }) {
  //Triggered on Change Event
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="primitive-node">
      <Handle
        type="source"
        position={Position.Top}
        style={handleStyle}
        id="left"
      />
      <div>
        <p className="title">{data.title}</p>
        <p className="nodeId">{data.id}</p>
        <button>edit</button>
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

export default PrimitiveNode;
