# Andromeda Webapp

The andromeda web-app repo is responsible for our web application which is a react based application built using the next.js framework.

## Features

- **Written in TypeScript**
- Multi-chain support.
- Create section to build and deploy Andromeda contracts with no coding required.
- Drag-and-drop section to build Andromeda Apps with ease.
- Assets section to view and interact with all builds.
- App store section with pre-build templates to chose from. 
- Embeddables section with plugins that easily integrate with apps.
- Learn section to guide new users on using the web-app.

## Pages 

|Page|Description|
|---------------------------------------|------------------------------------------|
| app-builder| App building page to build apps using drag-and-drop options and connections.|
| app-store | Page containing pre-build templates of popular apps.|
| dashboard | Dashboard page allowing quick navigation to the different parts of the app. |
| embeddables| Page of embedibles which are plugins to be integrated with web-3 apps. |
| flex-builder | Page that allows custom building of our ADOs. Contains starting templates. |
| learn | Page dedicated to teach users about Andromeda specific terms and how to navigate and operate the web-app. |

## Run

To run the web-app, make sure you have node.js then :

1. Clone the repo from [github](https://github.com/andromedaprotocol/andromeda-webapp)
2. Go to the working branch (Currently develop)
3. Run `npm i` 
4. Run `npm run dev` in the terminal to start a testing copy
5. Open http://localhost:3000 to view it in the browser.

## Scripts

The scripts can be found in the package.json file. 
To run one of the scripts:
`npm run [script-name]`

# Folder Architecture

### Non-Global

Non Global sections needs to be kept as simplified as possible, as they can very easily grow to be overpopulated and unwieldy.

#### Pages

- We should not create a new folder for each page. If it is one page, no need to create a folder for it and instead can be added in the root. If more than one page are created to address a single purpose, then related source files should be placed in a folder.

- If not sure whether something needs to be a component or not, think of its reusability. 

- Most of the corresponding page/section specific components, assets, hooks, ect… should be held in the modules section.

#### Moduels/Features

- Contains the various parts related to only one specific page/feature.

- Can be addressed like a second “src” structure used for page sources with a second tier of global / non-global considered separation such as a part for a specific page, or a component to be accessible by multiples. This is similar to how may handle a page/form specific modal, or a modal universally used to perform a common action.

### Global

The Global structure can be summarized by the following table: 

|Folder| Description |
|-----------------------------|-------------------------------------|
| lib| Encapsulated references of 3rd party imports referenced from index.ts. Facilitates code updates to all references from one source.|
| api | All service related functionality for integrating with an API so it can be served to entire app. |
|util| Pure functions only that are preferably non-complex functions. |
| data | Data such as constants, default JSON structures, and config values. |
| hooks | Generic hooks for use everywhere. Some services / api sub-groups may have their own functionality specific hooks defined in their sub-folders. |
| theme | UI components and presentational components such as av bars, side bars, footers, buttons, and icons.|
| modals | Modals are used to perform actions like transactions, confirmations, etc. They are extended to child components via global context. |
| placeholders | Non Javascript code such as images/ CSS ect...|

## Schema Handling
We have `JSON schemas` for ADO's. These schemas help us generate user interfaces for the ADO. Each ADO has its own schema inside a folder of  similar name with other related schemas. These schemas and folder structure are created by our generator. DO NOT MODIFY THESE FILES!

## Test Handling

Tests occur in same folder (or as close as possible) to files it is testing.

## Special Note for developers

To make your code easier to navigate and understand, try to create a modular system. If you are implementing something new, do a quick scan for any similar implementations in the codebase. To help others find your implementation easily, give a meaningful name to variables and add comments with related keywords.