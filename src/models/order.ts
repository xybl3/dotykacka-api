import { PosAction } from "./actions";

export interface Order {
  // action: PosAction;
  "customer-id"?: number;
  "discount-percent"?: number;
  "table-id"?: number;
  "user-id"?: number;
  note?: string;
  "external-id"?: string;
  items: OrderItem[];
  lock: boolean;
}

export interface OrderUpdate {
  // action: PosAction;
  "order-id": number; // _orderId
  "customer-id": number; // _customerId
  "discount-percent": number; // 20 = 20%
  note: string;
  lock: boolean;
}

export interface OrderItem {
  id: number;
  qty: number;
  note?: string;
  "discount-percent"?: number;
  "manual-price"?: number;
  "manual-points"?: number;
  tags?: string[];
  "course-id"?: number;
  customizations?: Customization[];
}

export interface Customization {
  "product-customization-id": number;
  "product-id": number;
  "take-away": boolean;
}

export interface AddOrderItems {
  items: OrderItem[];
  lock: boolean;
}
