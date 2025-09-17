import { handleParams } from "@/shared/utils/query-params/handle-params";
import { getFilteredProducts } from "@/core/shop/services/get-products.service";
import ProductsGrid from "../_components/products-grid/ProductsGrid";
import ProductsPagination from "../_components/products-grid/ProductsPagination";
import MaxWidthContainer from "@/shared/components/containers/max-width-container/MaxWidthContainer";
import PaddingContainer from "@/shared/components/containers/padding-container/PaddingContainer";
import Message from "@/shared/components/message/Message";
import FadeinContainer from "@/shared/components/containers/fadein-container/FadeinContainer";
import ProductsContainer from "../_components/products-container/ProductsContainer";
import Filters from "../_components/filters/Filters";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface Props {
  searchParams: SearchParams;
}

export const revalidate = 3600;

async function ShopPage({ searchParams }: Props): Promise<React.ReactElement> {
  const { page, searchValue, view, sizes, price } = await handleParams(searchParams);

  const { data } = await getFilteredProducts({ page, take: 12, searchValue, sizes, price });

  if (!data)
    return (
      <MaxWidthContainer>
        <PaddingContainer>
          <FadeinContainer>
            <Message message="No se pudo cargar los artículos" />
          </FadeinContainer>
        </PaddingContainer>
      </MaxWidthContainer>
    );

  return (
    <MaxWidthContainer>
      <PaddingContainer>
        <FadeinContainer>
          <ProductsContainer
            filtersComponent={<Filters />}
            productsComponent={
              <>
                <ProductsGrid products={data.products} viewMode={view} />
                <ProductsPagination pages={data.pages} defaultPage={page} />
              </>
            }
          ></ProductsContainer>
        </FadeinContainer>
      </PaddingContainer>
    </MaxWidthContainer>
  );
}
export default ShopPage;
