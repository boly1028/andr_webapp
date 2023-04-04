export const getPanelTargetHandlePrefix = (panelName: string, dir: DIRECTION) => {
    return `${panelName}-target-${dir}`
}

export const getSourceHandlePrefix = (edgeId: string, dir: DIRECTION) => {
    return `${edgeId}-source-${dir}`
}

export enum DIRECTION {
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right'
}