import { useCallback } from "react";
import { Handle, Position } from "react-flow-renderer";

const handleStyle = {
  background: "#ff00ff",
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
    <div className="string-node">
      <Handle
        type="target"
        position={Position.Left}
        style={handleStyle}
        id="left"
      />
      <div>
        <label htmlFor="text">{data.title}</label>
        <input id="text" name="text" onChange={onChange} />
      </div>
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
