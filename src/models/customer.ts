export interface Customer {
  _cloudId: number;
  _discountGroupId: number;
  _sellerId: number;
  addressLine1: string;
  addressLine2: string;
  barcode: string;
  birthday: string; //TODO: Change to timestap type
  city: string;
  companyId: string;
  companyName: string;
  country: string;
  created: string; //TODO: Change to timestap type
  deleted: boolean;
  display: boolean;
  email: string;
  expireDate: string | null; //TODO: Change to timestap type
  externalId: string | null;
  firstName: string;
  flags: number;
  headerPrint: string;
  hexColor: string;
  id: number;
  internalNote: string;
  lastName: string;
  modifiedBy: string;
  note: string;
  phone: string;
  points: number;
  tags: string[];
  vatId: string;
  versionDate: string; //TODO: Change to timestap type
  zip: string;
}

export interface CustomerResponse {
  currentPage: string;
  perPage: string;
  totalItemsOnPage: string;
  totalItemsCount: string;
  firstPage: string;
  lastPage: string;
  nextPage: string | null;
  prevPage: string | null;
  data: Customer[];
}

export interface CustomerCreateMinimum {
  _cloudId: number;
  addressLine1: string;
  barcode: string;
  companyId: string;
  companyName: string;
  deleted: boolean;
  display: boolean;
  email: string;
  firstName: string;
  lastName: string;
  headerPrint: string;
  hexColor: string;
  internalNote: string;
  phone: string;
  points: number;
  tags: string[];
  flags: number;
  vatId: string;
  zip: string;
}
