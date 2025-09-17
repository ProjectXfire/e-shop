import {
  validateOrder,
  validatePage,
  validatePrice,
  validateSearchValue,
  validateSizes,
  validateView,
} from "./validate-query";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function handleParams(searchParams: SearchParams) {
  const query = await searchParams;
  const queryPage = query.page;
  const querySearchValue = query.search;
  const queryView = query.view;
  const queryOrder = query.order;
  const querySizes = query.sizes;
  const queryPrice = query.price;

  const page = validatePage(queryPage);
  const searchValue = validateSearchValue(querySearchValue);
  const view = validateView(queryView);
  const sizes = validateSizes(querySizes);
  const price = validatePrice(queryPrice);
  const order = validateOrder(queryOrder);

  return {
    page,
    searchValue,
    view,
    sizes,
    order,
    price,
  };
}
