import { useCallback } from "react";
import { Handle, Position } from "react-flow-renderer";

const handleStyle = {
  background: "#004AFF",
  width: 8,
  height: 8,
  border: "1px solid #000",
};

//Data = Prop declared for content loading
function BaseADONode({ data }) {
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
        <p className="title">{data.title}</p>
        <p className="nodeId">{data.id}</p>
        <button>Add Module</button>
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

export default BaseADONode;
