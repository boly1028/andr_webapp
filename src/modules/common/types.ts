export type TxStep =
  | "idle"
  | "posting"
  | "postError"
  | "broadcasting"
  | "broadcastError"
  | "broadcastSuccess";
