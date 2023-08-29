import axios, { AxiosError } from "axios";
import {
  Customer,
  CustomerCreateMinimum,
  CustomerResponse,
} from "../models/customer";

async function getCustomers(
  cloudId: number,
  accessToken: string
): Promise<CustomerResponse | null> {
  const url = `https://api.dotykacka.cz/v2/clouds/${cloudId}/customers`;
  try {
    const req = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return req.data as CustomerResponse;
  } catch (error) {
    const e = error as AxiosError;
    if (e.response?.status == 400) {
      throw new Error(`Error fetching customers. ${e.response.data}`);
    }
  }
  return null;
}

async function getSingleCustomer(
  customerId: number,
  cloudId: number,
  accessToken: string
): Promise<CustomerResponse | null> {
  const url = `https://api.dotykacka.cz/v2/clouds/${cloudId}/customers/${customerId}`;
  try {
    const req = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return req.data as CustomerResponse;
  } catch (error) {
    const e = error as AxiosError;
    if (e.response?.status == 400) {
      throw new Error(`Error fetching customers. ${e.response.data}`);
    }
  }
  return null;
}

async function createCustomers(
  cloudId: number,
  accessToken: string,
  customers: Array<CustomerCreateMinimum | Customer>
): Promise<Array<Customer> | null> {
  const url = `https://api.dotykacka.cz/v2/clouds/${cloudId}/customers`;
  try {
    const req = await axios.post(url, customers, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return req.data as Array<Customer>;
  } catch (error) {
    const e = error as AxiosError;
    console.log(e.response?.data);
    if (e.response?.status == 400) {
      throw new Error(`Error fetching customers. ${e}`);
    }
  }
  return null;
}

export { getCustomers, getSingleCustomer, createCustomers };
