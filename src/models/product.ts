import { Unit } from "./unit";

export interface Product {
  _categoryId: number;
  _cloudId: number;
  _defaultCourseId: BigInteger;
  _eetSubjectId: BigInteger;
  _supplierId: BigInteger;
  alternativeName: string;
  currency: string;
  deleted: boolean;
  deliveryNoteIds: string;
  description: string;
  discountPercent: number;
  discountPermitted: boolean;
  display: boolean;
  ean: string[];
  externalId: string;
  flags: number;
  hexColor: string;
  id: BigInteger;
  margin: string;
  marginMin: number;
  modifiedBy: string;
  name: string;
  notes: string[];
  onSale: boolean;
  packageItem: number;
  packaging: number;
  packagingMeasurement: number;
  plu: string;
  points: number;
  priceInPoints: number;
  priceWithVat: number;
  priceWithVatB: number;
  priceWithVatC: number;
  priceWithVatD: number;
  priceWithVatE: number;
  priceWithoutVat: number;
  purchasePriceWithoutVat: number;
  requiresPriceEntry: boolean;
  sortOrder: BigInteger;
  stockDeduct: boolean;
  stockOverdraft: any; //TODO: Change that to enum
  subtitle: string;
  supplierProductCode: string;
  tags: string[];
  unit: Unit;
  unitMeasurement: Unit;
  vat: number;
  versionDate: string; //TODO: Change
}

export interface ProductResponse {
  currentPage: string;
  perPage: string;
  totalItemsOnPage: string;
  totalItemsCount: string;
  firstPage: string;
  lastPage: string;
  nextPage: string | null;
  prevPage: string | null;
  data: Product[];
}

export interface ProductCreateMinimum {
  _categoryId: number;
  deleted: boolean;
  discountPercent: number;
  discountPermitted: boolean;
  display: boolean;
  flags: number;
  hexColor: string;
  name: string;
  onSale: boolean;
  packaging: number;
  points: number;
  priceWithoutVat: number;
  requiresPriceEntry: boolean;
  stockDeduct: boolean;
  stockOverdraft: Unit;
  unit: Unit;
  vat: number;
}
