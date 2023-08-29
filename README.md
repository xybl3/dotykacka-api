# dotykacka-api

Api wrapper for [dotykacka.cz](https://www.dotykacka.cz/)

## BEFORE DIVING INTO LIBRARY PLEASE CHECK [DOTYKACKA API DOCUMENTATION](https://docs.api.dotypos.com/) IT WILL HELP YOU UNDERSTAND THIS LIBRARY BETTER

### Usage

Javascript:

```js
const dotykacka = require("dotykacka-api");

const dotykackaClient = new dotykacka.DotykackaClient({
  refreshToken: "",
  branchId: 0,
  cloudId: 0,
  clientId: "",
  clientSecret: "",
  webhook: "",
});

dotykackaClient.getProducts().then((products) => {
  console.log(products);
});

dotykackaClient.getCustomers().then((customers) => {
  console.log(customers);
});
```

Typescript:

```ts
import { DotykackaClient } from "dotykacka-api";

const client = new DotykackaClient({
  refreshToken: "",
  branchId: 0,
  cloudId: 0,
  clientId: "",
  clientSecret: "",
  webhook: "",
});

dotykackaClient.getProducts().then((products) => {
  console.log(products);
});

dotykackaClient.getCustomers().then((customers) => {
  console.log(customers);
});
```

### Documentation

Click [here](https://) for documentation
