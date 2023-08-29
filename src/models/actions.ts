import { Order } from "./order";

export type PosAction =
  | "order/create"
  | "order/update"
  | "order/add-item"
  | "order/split"
  | "order/issue"
  | "order/pay"
  | "order/create-issue"
  | "order/create-issue-pay"
  | "order/split-issue"
  | "order/split-issue-pay"
  | "order/issue-and-pay"
  | "order/cancel"
  | "order/list";
