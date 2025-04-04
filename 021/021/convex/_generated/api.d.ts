/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as imageStorage from "../imageStorage.js";
import type * as order from "../order.js";
import type * as Product from "../Product.js";
import type * as productAttributes from "../productAttributes.js";
import type * as ProductCategory from "../ProductCategory.js";
import type * as Review from "../Review.js";
import type * as size from "../size.js";
import type * as stock from "../stock.js";
import type * as tasks from "../tasks.js";
import type * as user from "../user.js";
import type * as UserType from "../UserType.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  imageStorage: typeof imageStorage;
  order: typeof order;
  Product: typeof Product;
  productAttributes: typeof productAttributes;
  ProductCategory: typeof ProductCategory;
  Review: typeof Review;
  size: typeof size;
  stock: typeof stock;
  tasks: typeof tasks;
  user: typeof user;
  UserType: typeof UserType;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
