import {
  Customer,
  CustomerCreateMinimum,
  CustomerResponse,
} from "./models/customer";
import { AddOrderItems, Order, OrderItem, OrderUpdate } from "./models/order";
import {
  Product,
  ProductCreateMinimum,
  ProductResponse,
} from "./models/product";
import { getAccessToken } from "./utils/accessToken";
import {
  createCustomers,
  getCustomers,
  getSingleCustomer,
} from "./utils/customer";
import {
  addOderItems,
  cancelOrder,
  createOrder,
  updateOrder,
} from "./utils/posActions";
import {
  createProducts,
  getProducts,
  getSingleProduct,
} from "./utils/products";

interface IDotykackaClientConfig {
  refreshToken: string;
  branchId: number;
  cloudId: number;
  clientId: string;
  clientSecret: string;
  webhook: string;
}

class DotykackaClient {
  private refreshToken: string;
  private branchId: number;
  private cloudId: number;
  private clientId: string;
  private clientSecret: string;
  private webhook: string;

  private accessTokenPromise: Promise<string>;

  /**
   * Creates an instance of DotykackaClient.
   * You should call this constructor only once, and then import the instance of that class to other file
   * @param {string} refreshToken - The refresh token.
   * @param {number} branchId - The branch ID.
   * @param {number} cloudId - The cloud ID.
   */
  constructor(config: IDotykackaClientConfig) {
    this.refreshToken = config.refreshToken;
    this.branchId = config.branchId;
    this.cloudId = config.cloudId;
    this.clientId = config.clientId;
    this.clientSecret = config.clientSecret;
    this.webhook = config.webhook;

    // That needs to be at the end of constructor because it needs to be initialized after all variables are set. Otherwise it will throw an error. Because initializeAccessToken() uses variables from constructor( refresh token )
    this.accessTokenPromise = this.initializeAccessToken();
  }
  private async initializeAccessToken(): Promise<string> {
    try {
      return getAccessToken(this.cloudId, this.refreshToken);
    } catch (error) {
      console.error("Error initializing access token:", error);
      throw new Error("Failed to initialize access token.");
    }
  }

  generateRefreshConnect(): string {
    return `https://admin.dotykacka.cz/client/connect?client_id=${this.clientId}&client_secret=${this.clientSecret}&scope=*&redirect_uri=${this.webhook}`;
  }

  /**
   * Retrieves the access token. You dont need to call this method, it is called automatically when access token is not valid but it is needed to perform actions. You can call this method only in specific cases when you need to get the access token.
   *
   * @returns {Promise<string>} The access token
   *
   * @example
   * const client = new DotykackaClient()
   * const accessToken = await client.getAccessToken();
   * console.log(accessToken);
   *
   * @throws {Error} Error fetching access token. Try checking your refreshToken. and cloudId.
   *
   */
  async getAccessToken(): Promise<string> {
    return await getAccessToken(this.cloudId, this.refreshToken);
  }

  /**
   * Retrieves all products from cloud id
   *
   * @returns {Promise<ProductResponse| null>} The products
   *
   * @example
   * const client = new DotykackaClient()
   * const products = await client.getProducts();
   * console.log(products?.data); // Array of products
   * console.log(products?.data[0]); // First product
   * console.log(products?.data[0].name); // Name of first product
   */

  async getProducts(): Promise<ProductResponse | null> {
    const accessToken = await this.accessTokenPromise;
    try {
      const productRes = await getProducts(this.cloudId, accessToken);
      return productRes;
    } catch (error) {
      const newToken = getAccessToken(this.cloudId, this.refreshToken);
      this.accessTokenPromise = newToken;
      const productRes = await getProducts(
        this.cloudId,
        await this.accessTokenPromise
      );
      return productRes;
    }
  }

  /**
   *
   * Retrieves a single product from cloud by product id
   *
   * @param {number} productId - The product id
   * @returns  {Promise<Product | null>} The product
   *
   * @example
   * const client = new DotykackaClient()
   * const product = await client.getSingleProduct(3933964038464634);
   * console.log(product); // product
   * console.log(product?.name); // Name of product
   * console.log(product?.priceWithVat); // Price of product
   *
   */

  async getSingleProduct(productId: number): Promise<Product | null> {
    const accessToken = await this.accessTokenPromise;
    try {
      const productRes = await getSingleProduct(
        this.cloudId,
        accessToken,
        productId
      );
      return productRes;
    } catch (error) {
      const newToken = getAccessToken(this.cloudId, this.refreshToken);
      this.accessTokenPromise = newToken;
      const productRes = await getSingleProduct(
        this.cloudId,
        await this.accessTokenPromise,
        productId
      );
      return productRes;
    }
  }

  /**
   * Creates a product
   * @todo Fix that
   * @returns
   */

  async createProducts(
    products: Array<ProductCreateMinimum | Product>
  ): Promise<Array<Product> | null> {
    console.assert(
      products.length > 0,
      "You need to provide at least one product"
    );
    console.assert(
      products.length < 100,
      "You can only create 100 products at once"
    );
    const accessToken = await this.accessTokenPromise;
    try {
      const productRes = await createProducts(
        this.cloudId,
        accessToken,
        products
      );
      return productRes;
    } catch (error) {
      const newToken = getAccessToken(this.cloudId, this.refreshToken);
      this.accessTokenPromise = newToken;
      const productRes = await createProducts(
        this.cloudId,
        await this.accessTokenPromise,
        products
      );
      return productRes;
    }
  }

  /**
   *  Retrieves all customers from cloud id
   *
   * @example
   * const client = new DotykackaClient()
   * const customers = await client.getCustomers();
   * console.log(customers?.data); // Array of customers
   * console.log(customers?.data[0]); // First customer
   * console.log(customers?.data[0].name); // Name of first customer
   * @throws {Error} Error fetching customers. ${e.response.data}
   *
   * @returns {Promise<CustomerResponse | null>} The customers
   */

  async getCustomers(): Promise<any | null> {
    const accessToken = await this.accessTokenPromise;
    try {
      const customerRes = await getCustomers(this.cloudId, accessToken);
      return customerRes;
    } catch (error) {
      const newToken = getAccessToken(this.cloudId, this.refreshToken);
      this.accessTokenPromise = newToken;
      const customerRes = await getCustomers(
        this.cloudId,
        await this.accessTokenPromise
      );
      return customerRes;
    }
  }

  /**
   * Retrieves a single customer from cloud by customer id
   * @example
   * const client = new DotykackaClient()
   * const customer = await client.getSingleCustomer(3933964038464634);
   * console.log(customer); // customer
   * console.log(customer?.name); // Name of customer
   * console.log(customer?.email); // Email of customer
   * @throws {Error} Error fetching customers. ${e.response.data}
   *
   *
   * @param {number} customerId - The customer id
   * @returns
   */
  async getSingleCustomer(
    customerId: number
  ): Promise<CustomerResponse | null> {
    const accessToken = await this.accessTokenPromise;
    try {
      const customerRes = await getSingleCustomer(
        customerId,
        this.cloudId,
        accessToken
      );
      return customerRes;
    } catch (error) {
      const newToken = getAccessToken(this.cloudId, this.refreshToken);
      this.accessTokenPromise = newToken;
      const customerRes = await getSingleCustomer(
        customerId,
        this.cloudId,
        await this.accessTokenPromise
      );
      return customerRes;
    }
  }

  /**
   *
   * @param {Array<Customer | CustomerCreateMinimum} customers
   * @returns
   */

  async createCustomers(
    customers: Array<Customer | CustomerCreateMinimum>
  ): Promise<Array<Customer> | null> {
    console.assert(
      customers.length > 0,
      "You need to provide at least one customer"
    );

    console.assert(
      customers.length < 100,
      "You can only create 100 customers at once"
    );

    const accessToken = await this.accessTokenPromise;
    try {
      const customerRes = await createCustomers(
        this.cloudId,
        accessToken,
        customers
      );
      return customerRes;
    } catch (error) {
      const newToken = getAccessToken(this.cloudId, this.refreshToken);
      this.accessTokenPromise = newToken;
      const customerRes = await createCustomers(
        this.cloudId,
        await this.accessTokenPromise,
        customers
      );
      return customerRes;
    }
  }

  /**
   * Used to create order
   * You need to remember that you need to have your Dotykacka turned on. Otherwise it will not work, it can hang on creating order or it can throw an error.
   *
   * @param {Order} order
   * @returns
   *
   * @todo Explicitly type the response
   */

  async createOrder(order: Order) {
    const accessToken = await this.accessTokenPromise;
    try {
      const orderRes = await createOrder(
        this.cloudId,
        this.branchId,
        accessToken,
        order
      );
      return orderRes;
    } catch (error) {
      const newToken = getAccessToken(this.cloudId, this.refreshToken);
      this.accessTokenPromise = newToken;
      const orderRes = await createOrder(
        this.cloudId,
        this.branchId,
        await this.accessTokenPromise,
        order
      );
      return orderRes;
    }
  }

  /**
   * Used to update order by order id
   * You need to remember that you need to have your Dotykacka turned on. Otherwise it will not work, it can hang on creating order or it can throw an error.
   * @param {number} orderId
   * @param {OrderUpdate} order
   * @returns
   */

  async updateOrder(orderId: number, order: OrderUpdate) {
    const accessToken = await this.accessTokenPromise;
    try {
      const orderRes = await updateOrder(
        this.cloudId,
        this.branchId,
        accessToken,
        orderId,
        order
      );
      return orderRes;
    } catch (error) {
      const newToken = getAccessToken(this.cloudId, this.refreshToken);
      this.accessTokenPromise = newToken;
      const orderRes = await updateOrder(
        this.cloudId,
        this.branchId,
        await this.accessTokenPromise,
        orderId,
        order
      );
      return orderRes;
    }
  }

  /**
   *
   * @param {number} orderId
   * @param {AddOrderItems} order
   * @returns
   */

  async addOrderItems(orderId: number, order: AddOrderItems) {
    const accessToken = await this.accessTokenPromise;
    try {
      const orderRes = await addOderItems(
        this.cloudId,
        this.branchId,
        accessToken,
        orderId,
        order
      );
    } catch (error) {
      const newToken = getAccessToken(this.cloudId, this.refreshToken);
      this.accessTokenPromise = newToken;
      const orderRes = await addOderItems(
        this.cloudId,
        this.branchId,
        await this.accessTokenPromise,
        orderId,
        order
      );
      return orderRes;
    }
  }

  /**
   * Used to cancel order by order id
   * You need to remember that you need to have your Dotykacka turned on. Otherwise it will not work, it can hang on creating order or it can throw an error.
   * @param {number} orderId
   * @returns
   */

  async cancelOrder(orderId: number) {
    const accessToken = await this.accessTokenPromise;
    try {
      const canceledOrderRes = await cancelOrder(
        this.cloudId,
        this.branchId,
        accessToken,
        orderId
      );
      return canceledOrderRes;
    } catch (error) {
      const newToken = getAccessToken(this.cloudId, this.refreshToken);
      this.accessTokenPromise = newToken;
      const canceledOrderRes = await cancelOrder(
        this.cloudId,
        this.branchId,
        await this.accessTokenPromise,
        orderId
      );
      return canceledOrderRes;
    }
  }
}

export { DotykackaClient };
