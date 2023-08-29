import axios, { AxiosError } from "axios";
import {
  Product,
  ProductCreateMinimum,
  IProductResponse,
} from "../models/product";

async function getProducts(
  cloudId: number,
  accessToken: string
): Promise<IProductResponse | null> {
  const url = `https://api.dotykacka.cz/v2/clouds/${cloudId}/products`;
  try {
    const req = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return req.data as IProductResponse;
  } catch (error) {
    const e = error as AxiosError;
    if (e.response?.status == 400) {
      throw new Error(`Error fetching products. ${e.response.data}`);
    }
  }
  return null;
}

async function getSingleProduct(
  cloudId: number,
  accessToken: string,
  productId: number
): Promise<Product | null> {
  const url = `https://api.dotykacka.cz/v2/clouds/${cloudId}/products/${productId}`;
  try {
    const req = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return req.data as Product;
  } catch (error) {
    const e = error as AxiosError;
    if (e.response?.status == 400) {
      throw new Error(`Error fetching products. ${e.response.data}`);
    }
  }
  return null;
}

async function createProducts(
  cloudId: number,
  accessToken: string,
  products: Array<ProductCreateMinimum | Product>
): Promise<Array<Product> | null> {
  const url = `https://api.dotykacka.cz/v2/clouds/${cloudId}/products`;
  try {
    const req = await axios.post(url, products, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return req.data as Array<Product>;
  } catch (error) {
    const e = error as AxiosError;
    if (e.response?.status == 400) {
      throw new Error(`Error fetching products. ${e}`);
    }
  }
  return null;
}

export { getProducts, getSingleProduct, createProducts };
