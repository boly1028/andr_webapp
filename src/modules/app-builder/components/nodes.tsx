//const initialNodes = [];

//const samplelNodes = [
const initialNodes = [
  {
    id: "ADO-1",
    type: "module",
    data: { label: "My Label" },
    position: { x: 0, y: 0 },
    style: {
      width: 170,
      height: 140,
    },
  },
  {
    id: "node-1",
    type: "string",
    position: { x: 0, y: 0 },
    data: { label: "123" },
    parentNode: "ADO-1",
    draggable: false,
  },
  {
    id: "node-2",
    type: "string",
    position: { x: 0, y: 25 },
    data: { label: "dsf" },
    parentNode: "ADO-1",
  },
  {
    id: "1",
    type: "input",
    data: { label: "Input Node" },
    position: { x: 250, y: 25 },
  },

  {
    id: "2",
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: "3",
    type: "output",
    data: { label: "Output Node" },
    position: { x: 250, y: 250 },
  },
];

export default initialNodes;
