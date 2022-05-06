// PanelName = Prop declared for content loading
async function fetchPanelSchema(panelName) {
  //const res = await fetch(`@/pages/api/flex-builder/schema/${panelName}.json`);
  const res = await import(`@/pages/api/flex-builder/schema/${panelName}.json`);

  //const json = await res.json();
  //console.log(json);
  //console.log(JSON.stringify(json));
  return res;
}

//Load the submited responses to retrieve and load the JSONSchema
async function loadPanelJSON(data) {
  const response = await fetchPanelSchema(data);
  //console.log(response);
  return response;
}

export default loadPanelJSON;
