"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Order, Size, ViewMode } from "./queries";
import {
  validateOrder,
  validatePrice,
  validateSearchValue,
  validateSizes,
  validateView,
} from "./validate-query";

interface UrlQuery {
  page?: number;
  order?: Order;
  view?: ViewMode;
  search?: string;
  size?: Size;
  price?: string;
}

interface Filters {
  order: Order | null;
  view: ViewMode;
  price: string;
  sizes: Size[];
  search: string;
}

export const useQueryPathname = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePathname = (query: UrlQuery): void => {
    const { page, order, view, search, size, price } = query;
    const params = new URLSearchParams(searchParams);
    if (page !== undefined) params.set("page", page.toString());
    if (order !== undefined) params.set("order", order);
    if (view !== undefined) params.set("view", view);
    if (search !== undefined) params.set("search", search);
    if (price !== undefined) {
      params.set("price", price);
      params.set("page", "1");
    }
    const sizesQuery = params.get("sizes");
    const sizes = validateSizes(sizesQuery);
    if (size !== undefined) {
      if (sizes.length === 0) {
        params.set("page", "1");
        params.set("sizes", JSON.stringify([size]));
      } else {
        const isInArray = (sizes as readonly any[]).includes(size);
        if (isInArray) {
          params.set("page", "1");
          params.set("sizes", JSON.stringify(sizes.filter((cSize) => cSize !== size)));
        } else {
          sizes.push(size);
          params.set("page", "1");
          params.set("sizes", JSON.stringify(sizes));
        }
      }
    }
    router.push(`${pathname}?${params}`);
  };

  const currentFilters = (): Filters => {
    const params = new URLSearchParams(searchParams);
    const order = validateOrder(params.get("order"));
    const view = validateView(params.get("view"));
    const search = validateSearchValue(params.get("search"));
    const sizes = validateSizes(params.get("sizes"));
    const price = validatePrice(params.get("price"));

    return {
      order,
      view,
      search,
      sizes,
      price: price.join("-"),
    };
  };

  return {
    handlePathname,
    currentFilters,
  };
};
