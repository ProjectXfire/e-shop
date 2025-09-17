import { order, Order, Size, sizes, viewMode, ViewMode } from "./queries";

export function validatePage(value?: string | string[] | null): number {
  try {
    if (value === undefined) return 1;
    if (value === null) return 1;
    if (typeof value !== "string") return 1;
    const page = isNaN(Number(value)) ? 1 : Number(value);
    return page;
  } catch (error) {
    return 1;
  }
}

export function validateSearchValue(value?: string | string[] | null): string {
  try {
    if (value === undefined) return "";
    if (value === null) return "";
    if (typeof value !== "string") return "";
    return value;
  } catch (error) {
    return "";
  }
}

export function validateView(value?: string | string[] | null): ViewMode {
  try {
    if (value === undefined) return "grid";
    if (value === null) return "grid";
    if (typeof value !== "string") return "grid";
    const view = (viewMode as readonly string[]).includes(value) ? value : "grid";
    return view as ViewMode;
  } catch (error) {
    return "grid";
  }
}

export function validateOrder(value?: string | string[] | null): Order | null {
  try {
    if (value === undefined) return null;
    if (value === null) return null;
    if (typeof value !== "string") return null;
    const orderValue = (order as readonly string[]).includes(value) ? value : null;
    return orderValue as Order;
  } catch (error) {
    return null;
  }
}

export function validateSizes(value?: string | string[] | null): Size[] {
  try {
    if (value === undefined) return [];
    if (value === null) return [];
    if (typeof value !== "string") return [];
    const sizesArray = JSON.parse(value);
    if (!Array.isArray(sizesArray)) throw new Error();
    if (sizesArray.length === 0) return [];
    for (let i = 0; i < sizesArray.length; i++) {
      if (!sizes.includes(sizesArray[i])) throw new Error();
    }
    return sizesArray as Size[];
  } catch (error) {
    return [];
  }
}

export function validatePrice(value?: string | string[] | null): number[] {
  try {
    if (value === undefined) return [];
    if (value === null) return [];
    if (typeof value !== "string") return [];
    const range = value.split("-");

    if (range[0].length === 0) return [];
    const firstValue = Number(range[0]);
    const isRange1Number = isNaN(firstValue);
    if (isRange1Number) throw new Error();
    if (range.length === 1) return [firstValue];

    if (range[1].length === 0) return [];
    const secondValue = Number(range[1]);
    const isRange2Number = isNaN(secondValue);
    if (isRange2Number) throw new Error();

    if (firstValue > secondValue) return [];

    return [firstValue, secondValue];
  } catch (error) {
    return [];
  }
}
