import { FC, useCallback, useEffect, useState } from "react";
import NextLink from "next/link";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  MiniMap,
  Controls,
  ControlButton,
  Background,
} from "react-flow-renderer";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

import {
  Box,
  Button,
  Circle,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  HStack,
  Icon,
  IconButton,
  List,
  ListItem,
  ListIcon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Spacer,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import {
  CheckCircleIcon,
  EditIcon,
  EyeIcon,
  FilePlusIcon,
  MoreHorizontalIcon,
  UnlockIcon,
} from "@/modules/common";
import { PlusIcon } from "@/modules/common";
import {
  Binary,
  Codepen,
  Codesandbox,
  Columns,
  Download,
  FileCheck,
  FileCheck2,
  Image as ImageIcon,
  Link2,
  PackageCheck,
  Server,
  Terminal,
  Terminal2,
} from "lucide-react";
import { CheckIcon, ChevronRightIcon } from "@/modules/common";

// Import sample JSON data returns
import loadPanelJSON from "@/modules/app-builder/functions/load-panel-data";

//Import Custom Node Declarations
import initialNodes from "../components/nodes";
import initialEdges from "../components/edges";
// Node Type Declaration
import StringNode from "@/modules/app-builder/components/nodes/string";
// Custom Panel Class Type Handlers
import BaseADONode from "@/modules/app-builder/components/nodes/baseADO";
import ModuleNode from "@/modules/app-builder/components/nodes/module";
import ModifierNode from "@/modules/app-builder/components/nodes/modifier";
import PrimitiveNode from "@/modules/app-builder/components/nodes/primitive";

const nodeTypes = {
  baseADO: BaseADONode,
  module: ModuleNode,
  modifier: ModifierNode,
  primitive: PrimitiveNode,
  string: StringNode,
};

const AppBuilderCreatePage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const template = { disabled: true };
  const [ibc, setIbc] = useState(0.0);
  const [ibc3, setIbc3] = useState(0.0);
  const wrapperBg = useColorModeValue("white", "gray.800");
  const containerBg = useColorModeValue("white", "gray.900");
  const titleColor = useColorModeValue("gray.700", "white");

  // Load Starter Samples
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  // Configuration Options///////////////////////////////////////////////////////////
  const defaultEdgeOptions = { animated: false }; // Don't apply animation for most edge connections (as it's being reserved to indicate automation)

  // Had to move from useState() control button pressed checks as state updates cannot be read fast enough
  let controlButtonHeld = false;
  //const [controlButtonHeld, setControlButtonHeld] = useState(false);

  function downKeyHandler({ key }: any) {
    // "Control" is a case sensitive check
    if (key === "Control") {
      controlButtonHeld = true;
      //alert("Control Down & " + controlButtonHeld);
    }
  }
  function upKeyHandler({ key }: any) {
    if (key === "Control") {
      //alert("ControlUp");
      controlButtonHeld = false;
    }
    if (key === "a" && controlButtonHeld) {
      toggleMenu();
    }
  }
  useEffect(() => {
    window.addEventListener("keydown", downKeyHandler);
    window.addEventListener("keyup", upKeyHandler);
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener("keydown", downKeyHandler);
      window.removeEventListener("keyup", upKeyHandler);
    };
  }, []);

  const nodeDimensions = {
    width: 300,
    startY: 150,
  };
  const nodeStartX = 1;
  const nodeStartY = 10;

  //Background Configurations
  const bgConfig = {
    backgroundVariant: "dots",
    gap: 20,
    size: 0.75,
    color: "#0000ff",
  };

  //Control Bar Configurations
  const controlConfig = {
    showZoom: true,
    showFitView: true,
    showInteractive: true,
  };

  //MiniMap Configurations
  //Returns a node color to many map based on node type
  const miniMapNodeColor = (node: any) => {
    switch (node.type) {
      case "input":
        return "red";

      case "baseADO":
        return "#0BA5EC";
      case "module":
        return "#9360FB";
      case "modifier":
        return "#15B79E";
      case "primitive":
        return "#FEB9F9";
      case "default":
        return "#00ff00";
      case "output":
        return "rgb(0,0,255)";
      default:
        return "rgba(0,0,255,0.0)";
    }
  };

  const miniMapConfig = {
    nodeColor: miniMapNodeColor,
    nodeStrokeWidth: 0.19,
    nodeBorderRadius: 1,
    maskColor: "rgb(140, 142, 343, 0.05)",
  };

  function ibcToggle() {
    if (ibc == 0) {
      setIbc(0.19);
    } else {
      setIbc(0);
    }
  }
  function ibc3Toggle() {
    if (ibc3 == 0) {
      setIbc3(0.19);
    } else {
      setIbc3(0);
    }
  }

  // Menu Selection Toggles & Action Calls /////////////////////////////////////////////////////
  //Toggles the primary panel selecor fly wheel menu

  function toggleMenu() {
    //let toggle = document.querySelector(".toggle");
    const menu = document.querySelector(".menu");
    menu?.classList.toggle("active");
  }

  //ADO Selector Menu
  function toggleADOSelector(opt?: any) {
    if (opt !== "close") {
      toggleMenu();
    }
    const adoSelector = document.querySelector(".ado-selection-panel");
    adoSelector?.classList.toggle("active");
  }
  function selectADO(selection: any) {
    loadPanel(selection);
    toggleADOSelector("close");
  }

  //Module Selector Menu
  function toggleModuleSelector(opt: any) {
    if (opt !== "close") {
      toggleMenu();
    }
    const moduleSelector = document.querySelector(".module-selection-panel");
    moduleSelector?.classList.toggle("active");
  }
  function selectModule(selection: any) {
    loadPanel(selection);
    toggleModuleSelector("close");
  }

  //Modifier Selector Menu
  function toggleModifierSelector(opt: any) {
    if (opt !== "close") {
      toggleMenu();
    }
    const modifierSelector = document.querySelector(
      ".modifier-selection-panel",
    );
    modifierSelector?.classList.toggle("active");
  }
  function selectModifier(selection: any) {
    loadPanel(selection);
    toggleModifierSelector("close");
  }

  //Primitive Selector Menu
  function togglePrimitiveSelector(opt: any) {
    if (opt !== "close") {
      toggleMenu();
    }
    const primitiveSelector = document.querySelector(
      ".primitive-selection-panel",
    );
    primitiveSelector?.classList.toggle("active");
  }
  function selectPrimitive(selection: any) {
    loadPanel(selection);
    togglePrimitiveSelector("close");
  }

  // App-Builder Control Functions
  const pushCLI = () => {
    const cliMessage = "cli message";
    alert(cliMessage);
  };

  //Operation Calls //////////////////////////////////////////////////////
  const loadArray = (arrData: any, parentName: any) => {
    console.log(arrData);
    //alert(JSON.stringify(arrData));
    for (const key in arrData) {
      console.log("Array Data>" + key + ":" + arrData[key]["items"]);
      console.log(arrData[key]["items"]);

      //Process Children to add to parent
      const processData = arrData[key]["items"];
      //let spaceY = 0;
      processData.map((currData: any) => {
        // alert(
        //   "Object" + JSON.stringify(currData) + "| Type: " + currData["type"],
        // );
        // if (currData["type"] === "object") {
        //   //Revcursively Call Self for Additional Processing
        //   const tmpObj = {};
        //   tmpObj[currData["type"]] = currData;
        //   loadObject(tmpObj, parentName);
        // }

        if (currData[key] === "array") {
          // alert("Type Array");
        }
        if (currData["type"] === "string") {
          // alert("Type String");
          // console.log("Load Child " + currData["type"] + currData["title"]);
          // //Load Child Nodes to Environment
          // spaceY += 40;
          // AddChild(
          //   currData["type"],
          //   uuid(),
          //   parentName,
          //   spaceY,
          //   currData["title"]
          // );
        }
      });
    }
  };

  type LoadObjectProps = {
    objData: any;
    parentName: any;
  };

  const loadObject = (objData: any, parentName: any) => {
    console.log(objData);
    //alert(JSON.stringify(objData));
    for (const key in objData) {
      console.log("Object Data> " + key + ":" + objData[key]["properties"]);
      console.log(objData[key]["type"]);

      //swap sources when a properties option is not declared correctly
      if (!objData[key]["properties"]) {
        // alert("Not a properties line!");
      } else {
        // codeset used for testing
      }

      //Process Children to add to parent
      const processData = _.toArray(objData[key]["properties"]);
      let spaceY = 0;
      processData.map((currData) => {
        // alert(
        //   "Object" + JSON.stringify(currData) + "| Type: " + currData["type"]
        // );
        if (currData["type"] === "object") {
          //Revcursively Call Self for Additional Processing
          const tmpObj: any = {};
          tmpObj[currData["type"]] = currData;
          loadObject(tmpObj, parentName);
        }

        if (currData["type"] === "string") {
          //alert("Type String");
          console.log("Load Child " + currData["type"] + currData["title"]);
          //Load Child Nodes to Environment
          spaceY += 40;
          AddChild(
            currData["type"],
            uuidv4(),
            parentName,
            spaceY,
            currData["title"],
          );
        }
      });
    }
  };

  //Loads Panel Data from .json files
  const loadPanel = async (jsonRef: any) => {
    //Load related JSON Data from provided jsonRef value
    const jsonData = await loadPanelJSON(jsonRef);

    //alert(jsonData);
    //console.log(jsonData);
    const processData = _.toArray(jsonData); //convert object to array for easier map usage
    processData.map((currData) => {
      for (const key in currData) {
        //console.log(key + ":" + currData[key]);

        if (currData[key] === "array") {
          // alert("Type Array");
        }

        if (currData[key] === "object") {
          // alert("Type Object");
          //const parentName = prompt("New ID?");
          const parentName = getPanelId();
          //Call addParent()
          addParent(
            currData["class"],
            parentName,
            currData["title"],
            currData["description"],
          );

          loadObject(currData["properties"], parentName);
          //Loop through children
          //console.log(currData["properties"]);
          //let spaceY = 0;
          for (const childKey in currData["properties"]) {
            //console.log(currData["properties"][childKey]);
          }
        }
      }
    });
  };

  // Add a node (called on click)
  const addParent = useCallback(
    (nodeType, newId, title, description) => {
      const newNode = {
        id: newId,
        type: nodeType,
        data: {
          id: `id`,
          title: `${title}`,
          description: `${description}`,
        },
        position: {
          x: window.innerWidth / 2 - nodeDimensions.width,
          y: window.innerHeight / 2 - nodeDimensions.startY,
        },
        style: {
          width: nodeDimensions.width,
        },
      };
      setNodes((nds: any) => nds.concat(newNode));
    },
    [setNodes],
  );

  // Returns a default panel name for the new node-id
  const getPanelId = () => `panelname_${+new Date()}`;

  const onNodesChange = useCallback(
    (changes) => setNodes((nds: any) => applyNodeChanges(changes, nds)),
    [setNodes],
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  // Handler for Conecting Nodes
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
  );

  // Add a node (called on click)
  const onAdd = useCallback(
    (nodeType, newId) => {
      const newNode = {
        id: newId,
        type: nodeType,
        data: { label: `${newId}` },
        position: {
          x: self.innerWidth / 2,
          y: self.innerHeight / 2,
        },
      };
      setNodes((nds: any) => nds.concat(newNode));
    },
    [setNodes],
  );

  // Add a node (called on click)
  const AddChild = useCallback(
    (nodeType, newId, parent, y, title) => {
      const newNode = {
        id: newId,
        type: nodeType,
        data: { title: `${title}` },
        parentNode: parent,
        draggable: false,
        style: {
          width: nodeDimensions.width,
        },
        position: {
          x: 0,
          y: y,
        },
      };
      setNodes((nds: any) => nds.concat(newNode));
    },
    [setNodes],
  );

  // Add a node (called on click)
  const onAddModule = useCallback(
    (nodeType, newId) => {
      const newNode = {
        id: newId,
        type: nodeType,
        data: { label: `${newId}` },
        position: {
          x: self.innerWidth - nodeStartX,
          y: self.innerHeight - nodeStartY,
        },
        style: {
          width: nodeDimensions.width,
        },
      };
      setNodes((nds: any) => nds.concat(newNode));
      AddChild(
        "string",
        newId + "newChild" + Math.random() * 1000,
        newId,
        20,
        "New Label",
      );
      AddChild(
        "string",
        newId + "newChild" + Math.random() * 1000,
        newId,
        60,
        "ANother Field",
      );
    },
    [setNodes],
  );

  return (
    <Box position="relative" h="100%">
      <ReactFlow
        style={{ width: "100%", height: "100%" }}
        onConnect={onConnect}
        connectionLineStyle={{ stroke: "#ddd", strokeWidth: 2 }}
        snapToGrid={true}
        snapGrid={[16, 16]}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        defaultEdgeOptions={defaultEdgeOptions}
        // fitView
      >
        <Background {...bgConfig} />
        <MiniMap {...miniMapConfig} />

        <Controls {...controlConfig}>
          <ControlButton onClick={() => alert("Custom Button Pressed")}>
            ?
          </ControlButton>
          <ControlButton onClick={() => alert("Another Button with SVG")}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1H8.33334V3.44445H5.231L11.1502 9.36365L9.42172 11.0921L3.44445 5.11486V8.33334H1V1Z"
                fill="#101828"
              />
              <path
                d="M1 23H8.33334V20.5556H5.12671L11.1501 14.5322L9.42158 12.8037L3.44445 18.7809V15.6667H1V23Z"
                fill="#101828"
              />
              <path
                d="M15.6667 23H23V15.6667H20.5556V18.752L14.6072 12.8037L12.8788 14.5322L18.9021 20.5556H15.6667V23Z"
                fill="#101828"
              />
              <path
                d="M23 1H15.6666V3.44445H18.7978L12.8786 9.36368L14.6071 11.0921L20.5555 5.14373V8.33334H23V1Z"
                fill="#101828"
              />
            </svg>
          </ControlButton>
        </Controls>

        {/* IBC Overlays */}
        <div className="IBC1">
          <Box
            position="absolute"
            top="0"
            left="0"
            zIndex={-10}
            m={8}
            height="100%"
            width="50%"
            alignItems="center"
            bg="#63B3ED"
            opacity={ibc}
          ></Box>
        </div>
        <div className="IBC3">
          <Box
            position="absolute"
            top="0"
            left="0"
            zIndex={-10}
            m={8}
            height="100%"
            width="32%"
            alignItems="center"
            bg="#63B3ED"
            opacity={ibc3}
          ></Box>
          <Box
            position="absolute"
            top="0"
            right="0"
            zIndex={-10}
            m={8}
            height="100%"
            width="32%"
            alignItems="center"
            bg="pink"
            opacity={ibc3}
          ></Box>
        </div>
      </ReactFlow>

      <div className="select-menu">
        <div className="menu">
          <div className="toggle" onClick={toggleMenu}>
            +
          </div>
          <li style={{ "--i": 0 } as React.CSSProperties}>
            <a href="#" onClick={toggleADOSelector}>
              <Circle size="36px" bg="blue.400" color="white">
                <Icon as={PackageCheck} />
              </Circle>
            </a>
          </li>
          <li style={{ "--i": 1 } as React.CSSProperties}>
            <a href="#" onClick={toggleModuleSelector}>
              <Circle
                size="36px"
                bgGradient="radial(primary.500, primary.400)"
                color="white"
              >
                <Icon as={Server} />
              </Circle>
            </a>
          </li>
          <li style={{ "--i": 2 } as React.CSSProperties}>
            <a href="#" onClick={togglePrimitiveSelector}>
              <Circle size="36px" bg="pink.200" color="white">
                <Icon as={Codepen} />
              </Circle>
            </a>
          </li>
          <li style={{ "--i": 3 } as React.CSSProperties}>
            <a>
              <Circle size="36px" bg="pink.300" color="white">
                <Icon as={Link2} />
              </Circle>
            </a>
          </li>
          <li style={{ "--i": 4 } as React.CSSProperties}>
            <a href="#" onClick={toggleModifierSelector}>
              <Circle size="36px" bg="teal.200" color="white">
                <Icon as={Codesandbox} />
              </Circle>
            </a>
          </li>
          <li style={{ "--i": 5 } as React.CSSProperties}>
            <a>
              <Circle size="36px" bg="orange.300" color="white">
                <Icon as={Binary} />
              </Circle>
            </a>
          </li>
        </div>
      </div>

      {/* Placeholder Panel Selection System Menus */}
      {/* <div className="ado-selection-panel">
        <h2>ADO Selection Modal</h2>
        <li>
          <a href="#" onClick={() => selectADO("ado-base/nft-collectible")}>
            NFT Collectible
          </a>
        </li>
        <li>
          <a onClick={() => selectADO("cw20/0.1.0/cw20")}>CW20</a>
        </li>
        <li>
          <a onClick={() => selectADO("ado-base/splitter")}>Splitter</a>
        </li>
        <li>
          <a onClick={() => selectADO("timelock/0.1.0/timelock")}>Timelock</a>
        </li>
        <li>
          <a onClick={() => selectADO("ado-base/address-list")}>Address List</a>
        </li>
        <li>
          <a onClick={() => selectADO("crowdfund/0.1.0/crowdfund")}>
            Crowdfund
          </a>
        </li>
      </div> */}

      {/* <div className="module-selection-panel">
        <h2>Module Selection Modal</h2>
        <li>
          <a href="#" onClick={() => selectModule("ado-module/whitelist")}>
            Whitelist
          </a>
        </li>
        <li>
          <a onClick={() => selectModule("ado-module/blacklist")}>Blacklist</a>
        </li>
        <li>
          <a onClick={() => selectModule("ado-module/royalties")}>Royalties</a>
        </li>
        <li>
          <a onClick={() => selectModule("ado-module/taxes")}>Taxes</a>
        </li>

        <li>
          <a onClick={() => selectModule("cw721-offers/0.1.0/cw721-offers")}>
            Offers
          </a>
        </li>

        <li>
          <a onClick={() => selectModule("receipt/0.1.0/receipt")}>Receipts</a>
        </li>
      </div> */}

      {/* <div className="modifier-selection-panel">
        <h2>Modifier Selection Modal</h2>
        <li>
          <a href="#" onClick={() => selectModifier("cw20/0.1.0/send")}>
            Send
          </a>
        </li>
        <li>
          <a onClick={() => selectModifier("cw20/0.1.0/transfer")}>Transfer</a>
        </li>
        <li>
          <a onClick={() => selectModifier("cw20/0.1.0/transfer-from")}>
            Transfer From
          </a>
        </li>

        <li>
          <a href="#" onClick={() => selectModifier("cw20/0.1.0/burn")}>
            Burn
          </a>
        </li>

        <li>
          <a href="#" onClick={() => selectModifier("cw20/0.1.0/burn-from")}>
            Burn-From
          </a>
        </li>

        <li>
          <a
            href="#"
            onClick={() => selectModifier("cw20/0.1.0/increase-allowance")}
          >
            Increase Allowance
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={() => selectModifier("cw20/0.1.0/decrease-allowance")}
          >
            Decrease Allowance
          </a>
        </li>
      </div> */}

      {/* <div className="primitive-selection-panel">
        <h2>Primitive Selection Modal</h2>
        <li>
          <a
            href="#"
            onClick={() => selectPrimitive("primitives/0.1.0/string")}
          >
            String
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={() => selectPrimitive("primitives/0.1.0/decimal")}
          >
            Decimal
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={() => selectPrimitive("primitives/0.1.0/uint128")}
          >
            uInt128
          </a>
        </li>
        <li>
          <a href="#" onClick={() => selectPrimitive("primitives/0.1.0/coin")}>
            Coin
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={() => selectPrimitive("primitives/0.1.0/string")}
          >
            Binary Blob
          </a>
        </li>
      </div> */}

      <Box
        position="absolute"
        top="0"
        right="0"
        zIndex={10}
        m={8}
        alignItems="center"
        bg="#ffffff"
      >
        <Menu id="baseADO-menu" placement="bottom-end">
          <MenuButton
            as={IconButton}
            icon={<PackageCheck />}
            variant="link"
            mr={2}
          />
          <MenuList>
            <MenuItem onClick={() => selectADO("cw721/0.1.0/cw721")}>
              CW721
            </MenuItem>

            <MenuItem onClick={() => selectADO("timelock/0.1.0/timelock")}>
              Timelock
            </MenuItem>
            <MenuItem onClick={() => selectADO("auction/0.1.0/auction")}>
              Auction
            </MenuItem>

            <MenuItem
              onClick={() => selectADO("merkle-airdrop/0.1.0/merkle-airdrop")}
            >
              Merkle Airdrop
            </MenuItem>
            <MenuItem onClick={() => selectADO("splitter/0.1.0/splitter")}>
              Splitter
            </MenuItem>
            <MenuItem onClick={() => selectADO("mission/0.1.0/mission")}>
              Mission
            </MenuItem>
            <MenuItem onClick={() => selectADO("cw20/0.1.0/cw20")}>
              CW20
            </MenuItem>

            <MenuItem onClick={() => selectADO("crowdfund/0.1.0/crowdfund")}>
              Crowdfund
            </MenuItem>
            <MenuItem onClick={() => selectADO("swapper/0.1.0/swapper")}>
              Swapper
            </MenuItem>
            <MenuItem onClick={() => selectADO("ado-base/nft-collectible")}>
              NFT Collectible
            </MenuItem>
            <MenuItem onClick={() => selectADO("ado-base/splitter")}>
              Splitter (deprecated)
            </MenuItem>
            <MenuItem onClick={() => selectADO("ado-base/timelock")}>
              Timelock (deprecated)
            </MenuItem>
            <MenuItem
              onClick={() => selectADO("wrapped-cw721/0.1.0/wrapped_cw721")}
            >
              Wrapped CW721
            </MenuItem>
            <MenuItem onClick={() => selectADO("vault/0.1.0/vault")}>
              Vault
            </MenuItem>
          </MenuList>
        </Menu>

        <Menu id="external-menu" placement="bottom-end">
          <MenuButton as={IconButton} icon={<Link2 />} variant="link" mr={2} />
          <MenuList>
            <MenuItem onClick={() => selectADO("astroport/0.1.0/astroport")}>
              Astroport
            </MenuItem>

            <MenuItem onClick={() => selectADO("anchor/0.1.0/anchor")}>
              Anchor
            </MenuItem>
            <MenuItem onClick={() => selectADO("swapper/0.1.0/swapper")}>
              Swapper
            </MenuItem>
            <MenuItem onClick={() => selectADO("lockdrop/0.1.0/lockdrop")}>
              Lockdrop
            </MenuItem>
            <MenuItem
              onClick={() =>
                selectADO("mirror-wrapped-cdp/0.1.0/mirror_wrapped_cdp")
              }
            >
              Mirror
            </MenuItem>
          </MenuList>
        </Menu>

        <Menu id="module-menu" placement="bottom-end">
          <MenuButton as={IconButton} icon={<Server />} variant="link" mr={2} />
          <MenuList>
            <MenuItem onClick={() => selectModule("rates/0.1.0/rates")}>
              Royalties (Flat Fee)
            </MenuItem>
            <MenuItem onClick={() => selectModule("rates/0.1.0/rates")}>
              Royalties (Percent)
            </MenuItem>
            <MenuItem onClick={() => selectModule("ado-module/royalties")}>
              Royalties (deprecated)
            </MenuItem>
            <MenuItem onClick={() => selectModule("rates/0.1.0/rates")}>
              Taxes (Flat Fee)
            </MenuItem>
            <MenuItem onClick={() => selectModule("rates/0.1.0/rates")}>
              Taxes (Percent)
            </MenuItem>
            <MenuItem onClick={() => selectModule("ado-module/taxes")}>
              Taxes (deprecated)
            </MenuItem>
            <MenuItem
              onClick={() => selectModule("addresslist/0.1.0/addresslist")}
            >
              Whitelist
            </MenuItem>
            <MenuItem onClick={() => selectModule("ado-module/whitelist")}>
              Whitelist (deprecated)
            </MenuItem>
            <MenuItem
              onClick={() => selectModule("addresslist/0.1.0/addresslist")}
            >
              Blacklist
            </MenuItem>
            <MenuItem onClick={() => selectModule("ado-module/blacklist")}>
              Blacklist (deprecated)
            </MenuItem>

            <MenuItem onClick={() => selectModule("receipt/0.1.0/receipt")}>
              Receipt
            </MenuItem>

            <MenuItem
              onClick={() => selectModule("cw721-offers/0.1.0/cw721-offers")}
            >
              CW721 Offers
            </MenuItem>
          </MenuList>
        </Menu>

        <Menu id="primitive-menu" placement="bottom-end">
          <MenuButton
            as={IconButton}
            icon={<Codepen />}
            variant="link"
            mr={2}
          />
          <MenuList>
            <MenuItem
              onClick={() => selectPrimitive("primitives/0.1.0/boolean")}
            >
              Boolean
            </MenuItem>
            <MenuItem onClick={() => selectPrimitive("primitives/0.1.0/array")}>
              Array
            </MenuItem>
            <MenuItem
              onClick={() => selectPrimitive("primitives/0.1.0/string")}
            >
              String
            </MenuItem>
            <MenuItem
              onClick={() => selectPrimitive("primitives/0.1.0/decimal")}
            >
              Decimal
            </MenuItem>
            <MenuItem
              onClick={() => selectPrimitive("primitives/0.1.0/uint128")}
            >
              Unsigned Integer (128)
            </MenuItem>
            <MenuItem onClick={() => selectPrimitive("primitives/0.1.0/coin")}>
              Coin
            </MenuItem>
            <MenuItem>Binary Blob</MenuItem>
          </MenuList>
        </Menu>

        <Menu id="modifier-menu" placement="bottom-end">
          <MenuButton
            as={IconButton}
            icon={<Codesandbox />}
            variant="link"
            mr={8}
          />
          <MenuList>
            <MenuItem onClick={() => selectModifier("cw20/0.1.0/transfer")}>
              Transfer
            </MenuItem>
            <MenuItem onClick={() => selectModifier("cw20/0.1.0/burn-from")}>
              Burn From
            </MenuItem>
            <MenuItem
              onClick={() => selectModifier("cw20/0.1.0/decrease-allowance")}
            >
              Decreae Allowance
            </MenuItem>
            <MenuItem onClick={() => selectModifier("cw20/0.1.0/send")}>
              Send
            </MenuItem>
            <MenuItem onClick={() => selectModifier("cw20/0.1.0/mint")}>
              Mint
            </MenuItem>
            <MenuItem
              onClick={() => selectModifier("cw20/0.1.0/transfer-from")}
            >
              Transfer From
            </MenuItem>
            <MenuItem onClick={() => selectModifier("cw20/0.1.0/burn")}>
              Burn
            </MenuItem>
            <MenuItem
              onClick={() => selectModifier("cw20/0.1.0/increase-allowance")}
            >
              Increase Allowance
            </MenuItem>
            <MenuItem onClick={() => selectModifier("cw721/0.1.0/approve_all")}>
              Approve All
            </MenuItem>
            <MenuItem
              onClick={() => selectModifier("cw721/0.1.0/transfer_agreement")}
            >
              Transfer Agreement
            </MenuItem>
            <MenuItem onClick={() => selectModifier("cw721/0.1.0/archive")}>
              Archive
            </MenuItem>
            <MenuItem onClick={() => selectModifier("cw721/0.1.0/revoke")}>
              Revoke
            </MenuItem>
            <MenuItem
              onClick={() => selectModifier("cw721/0.1.0/transfer_nft")}
            >
              Transfer NFT
            </MenuItem>
            {/* <MenuItem onClick={() => selectModifier("cw721/0.1.0/approve")}>
              Approve
            </MenuItem>
            <MenuItem onClick={() => selectModifier("cw721/0.1.0/revoke_all")}>
              Revoke All
            </MenuItem>
            <MenuItem onClick={() => selectModifier("cw721/0.1.0/mint")}>
              Mint
            </MenuItem>
            <MenuItem onClick={() => selectModifier("cw721/0.1.0/send_nft")}>
              Send NFT
            </MenuItem>
            <MenuItem onClick={() => selectModifier("cw721/0.1.0/burn")}>
              Burn
            </MenuItem> */}
            <MenuItem
              onClick={() => selectModifier("cw721-offers/0.1.0/place-offer")}
            >
              Place Offer
            </MenuItem>
            {/* <MenuItem
              onClick={() => selectModifier("rates/0.1.0/update_rates")}
            >
              Update Rates
            </MenuItem> */}
            <MenuItem
              onClick={() => selectModifier("timelock/0.1.0/hold_funds")}
            >
              Hold Funds
            </MenuItem>
            <MenuItem
              onClick={() => selectModifier("timelock/0.1.0/release_funds")}
            >
              Release Funds
            </MenuItem>
            {/* <MenuItem onClick={() => selectModifier("auction/0.1.0/place_bid")}>
              Place Bid
            </MenuItem> */}
            <MenuItem
              onClick={() => selectModifier("auction/0.1.0/update_owner")}
            >
              Update Owner
            </MenuItem>
            <MenuItem onClick={() => selectModifier("auction/0.1.0/claim")}>
              Claim
            </MenuItem>
          </MenuList>
        </Menu>

        {/* <Button
          leftIcon={<PlusIcon boxSize={4} />}
          colorScheme="purple"
          size="lg"
          onClick={onOpen}
        ></Button> */}
        {/* <MenuButton
          as={IconButton}
          icon={<PackageCheck />}
          variant="link"
          mr={2}
        /> */}

        {/* IBC Overlays */}
        <Button
          id="ibc1"
          as={IconButton}
          colorScheme="blue"
          icon={<Columns />}
          onClick={ibcToggle}
          ml={6}
          mr={2}
          px={1}
        ></Button>
        <Button
          id="ibc3"
          as={IconButton}
          colorScheme="pink"
          icon={<Columns />}
          onClick={ibc3Toggle}
          mr={2}
          px={1}
        ></Button>

        {/* Export COntrols */}
        <Button
          id="cli"
          as={IconButton}
          colorScheme="cyan"
          icon={<Terminal />}
          onClick={pushCLI}
          ml={6}
          mr={2}
          px={1}
        ></Button>
        <Button
          as={IconButton}
          colorScheme="yellow"
          icon={<FileCheck />}
          onClick={onOpen}
          mr={2}
          px={1}
        ></Button>
        <Button
          id="starters"
          as={IconButton}
          colorScheme="purple"
          icon={<PlusIcon />}
          onClick={onOpen}
          ml={4}
          mr={2}
        >
          Starters
        </Button>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>App Starters</DrawerHeader>
            <DrawerBody>
              <Flex direction="column" width="100%" p={4}>
                <Box>
                  <HStack spacing={4}>
                    <Circle size="36px" bg="primary.600" color="white">
                      <Icon as={ImageIcon} />
                    </Circle>

                    <Text color={titleColor} fontSize="lg" fontWeight={600}>
                      Name
                    </Text>
                  </HStack>

                  <Text color="gray.500" fontSize="sm" my={4}>
                    Description
                  </Text>

                  <List spacing={2}>
                    <ListItem>
                      <Text color={"gray.500"} fontSize="sm">
                        <ListIcon
                          as={CheckIcon}
                          color="purple.400"
                          boxSize={5}
                        />
                        Option
                      </Text>
                    </ListItem>
                  </List>
                </Box>
                <Spacer />
                <NextLink href="#" passHref>
                  <Button
                    as="a"
                    mt={10}
                    isFullWidth
                    size="lg"
                    colorScheme="purple"
                    rightIcon={
                      !template.disabled ? (
                        <ChevronRightIcon boxSize={5} />
                      ) : undefined
                    }
                    isDisabled={template.disabled}
                  >
                    {template.disabled ? "Coming Soon" : "Get Started"}
                  </Button>
                </NextLink>
              </Flex>
              <Flex direction="column" width="100%" p={4}>
                <Box>
                  <HStack spacing={4}>
                    <Circle size="36px" bg="primary.600" color="white">
                      <Icon as={ImageIcon} />
                    </Circle>

                    <Text color={titleColor} fontSize="lg" fontWeight={600}>
                      Name
                    </Text>
                  </HStack>

                  <Text color="gray.500" fontSize="sm" my={4}>
                    Description
                  </Text>

                  <List spacing={2}>
                    <ListItem>
                      <Text color={"gray.500"} fontSize="sm">
                        <ListIcon
                          as={CheckIcon}
                          color="purple.400"
                          boxSize={5}
                        />
                        Option
                      </Text>
                    </ListItem>
                  </List>
                </Box>
                <Spacer />
                <NextLink href="#" passHref>
                  <Button
                    as="a"
                    mt={10}
                    isFullWidth
                    size="lg"
                    colorScheme="purple"
                    rightIcon={
                      !template.disabled ? (
                        <ChevronRightIcon boxSize={5} />
                      ) : undefined
                    }
                    isDisabled={template.disabled}
                  >
                    {template.disabled ? "Coming Soon" : "Get Started"}
                  </Button>
                </NextLink>
              </Flex>
            </DrawerBody>
            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </Box>
  );
};

export default AppBuilderCreatePage;
