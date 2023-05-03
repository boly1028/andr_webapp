import { getSchemaFromPath } from "@/lib/schema/utils";

// PanelName = Prop declared for content loading
async function fetchPanelSchema(panelName: any) {
  //const res = await fetch(`@/pages/api/flex-builder/schema/${panelName}.json`);
  const res = await getSchemaFromPath(panelName);

  //const json = await res.json();
  //console.log(json);
  //console.log(JSON.stringify(json));
  return res;
}

//Load the submited responses to retrieve and load the JSONSchema
async function loadPanelJSON(data: any) {
  const response = await fetchPanelSchema(data);
  //console.log(response);
  return response;
}

export default loadPanelJSON;
