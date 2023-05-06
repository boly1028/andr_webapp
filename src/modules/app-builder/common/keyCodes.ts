import { Key } from "ts-key-enum";

export const APP_BUILDER_KEYCODES = {
    DELETE: [[Key.Shift, 'd']].map(key => key.join('+')).join(','),
    RESET: [[Key.Control, Key.Shift, 'd']].map(key => key.join('+')).join(','),
    MULTISELECT: Key.Shift,
    ZOOM: Key.Shift,
    FIT_VIEW: [[Key.Shift, 'v']].map(key => key.join('+')).join(','),
    ZOOM_IN: [[Key.Shift, Key.ArrowUp]].map(key => key.join('+')).join(','),
    ZOOM_OUT: [[Key.Shift, Key.ArrowDown]].map(key => key.join('+')).join(','),
    PUBLISH: [[Key.Shift, Key.Enter]].map(key => key.join('+')).join(','),
} as const;