const SEPARATOR = '-.-'

export const createHandlerId = (nodeId: string, rjsfIdPrefix: string, dir?: DIRECTION) => {
    const data = [nodeId, rjsfIdPrefix];
    if (dir) data.push(dir)
    return data.join(SEPARATOR);
}

export const extractDataFromHandler = (handle: string) => {
    const items = handle.split(SEPARATOR);
    return {
        nodeId: items[0],
        rjsfIdPrefix: items[1],
        dir: items[2] as DIRECTION
    }
}

export const createLocalVfsPath = (raw: string) => {
    if (raw.trim().length === 0) return raw;
    if (raw.startsWith('./')) return raw;
    if (raw.includes('/')) return raw;
    return `./${raw}`;
}

export const getComponentNameFromVfsPath = (path: string) => {
    if (!path.startsWith('./')) return undefined;
    return path.replace('./', '');
}

export enum DIRECTION {
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right'
}