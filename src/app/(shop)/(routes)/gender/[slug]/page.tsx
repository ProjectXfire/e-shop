import { redirect } from "next/navigation";
import { handleParams } from "@/shared/utils/query-params/handle-params";
import { getProductsByGender } from "@/core/shop/services/get-products.service";
import { categoriesRoutes } from "@/core/shop/constants/categories-routes";
import ProductsGrid from "@/app/(shop)/_components/products-grid/ProductsGrid";
import ProductsPagination from "@/app/(shop)/_components/products-grid/ProductsPagination";
import ProductsContainer from "@/app/(shop)/_components/products-container/ProductsContainer";
import Filters from "@/app/(shop)/_components/filters/Filters";
import MaxWidthContainer from "@/shared/components/containers/max-width-container/MaxWidthContainer";
import PaddingContainer from "@/shared/components/containers/padding-container/PaddingContainer";
import FadeinContainer from "@/shared/components/containers/fadein-container/FadeinContainer";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
type Params = Promise<{ slug: string }>;

interface Props {
  params: Params;
  searchParams: SearchParams;
}

export const revalidate = 3600;

async function CategoryPage({ params, searchParams }: Props): Promise<React.ReactElement> {
  const { slug } = await params;

  const { page, searchValue, view, price, sizes } = await handleParams(searchParams);

  const path = `/gender/${slug}`;

  if (!categoriesRoutes.some((cat) => cat.path === path)) redirect("/");

  const { pages, products } = await getProductsByGender(slug, {
    page,
    take: 12,
    searchValue,
    price,
    sizes,
  });

  return (
    <MaxWidthContainer>
      <PaddingContainer>
        <FadeinContainer>
          <ProductsContainer
            filtersComponent={<Filters />}
            productsComponent={
              <>
                <ProductsGrid products={products} viewMode={view} />
                <ProductsPagination pages={pages} defaultPage={page} />
              </>
            }
          ></ProductsContainer>
        </FadeinContainer>
      </PaddingContainer>
    </MaxWidthContainer>
  );
}
export default CategoryPage;
