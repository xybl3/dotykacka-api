import axios, { AxiosError } from "axios";
import { AddOrderItems, Order, OrderUpdate } from "../models/order";
import { PosAction } from "../models/actions";

const url = (cloudId: number, branchId: number) =>
  `https://api.dotykacka.cz/v2/clouds/${cloudId}/branches/${branchId}/pos-actions`;

async function createOrder(
  cloudId: number,
  branchId: number,
  authorizationToken: string,
  order: Order
) {
  try {
    const api = await axios.post(
      url(cloudId, branchId),
      {
        action: "order/create" as PosAction,
        ...order,
      },
      {
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      }
    );
    return api.data;
  } catch (error) {
    throw new Error(`Error creating order. ${error}`);
  }
}

async function updateOrder(
  cloudId: number,
  branchId: number,
  authorizationToken: string,
  orderId: number,
  order: OrderUpdate
) {
  try {
    const api = await axios.post(
      url(cloudId, branchId),

      {
        action: "order/update" as PosAction,
        ...order,
      },
      {
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      }
    );
    return api.data;
  } catch (error) {
    throw new Error(`Error updating order. ${error}`);
  }
}

async function addOderItems(
  cloudId: number,
  branchId: number,
  authorizationToken: string,
  orderId: number,
  data: AddOrderItems
) {
  try {
    const api = await axios.post(
      url(cloudId, branchId),
      {
        action: "order/add-item" as PosAction,
        "order-id": orderId,
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      }
    );
    return api.data;
  } catch (error) {
    throw new Error(`Error adding order items. ${error}`);
  }
}
async function cancelOrder(
  cloudId: number,
  branchId: number,
  authorizationToken: string,
  orderId: number
) {
  try {
    const api = await axios.post(
      url(cloudId, branchId),
      {
        action: "order/cancel" as PosAction,
        "order-id": orderId,
      },
      {
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      }
    );
    return api.data;
  } catch (error) {
    throw new Error(`Error canceling order. ${error}`);
  }
}

export { createOrder, updateOrder, addOderItems, cancelOrder };
