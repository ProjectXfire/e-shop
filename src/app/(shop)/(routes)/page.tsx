import { redirect } from "next/navigation";
import { getFilteredProducts } from "@/core/shop/services/get-products.service";
import ProductsGrid from "../_components/products-grid/ProductsGrid";
import ProductsPagination from "../_components/products-grid/ProductsPagination";
import SearchProduct from "../_components/search-product/SearchProduct";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import MaxWidthContainer from "@/shared/components/containers/max-width-container/MaxWidthContainer";
import PaddingContainer from "@/shared/components/containers/padding-container/PaddingContainer";
import Message from "@/shared/components/message/Message";
import FadeinContainer from "@/shared/components/containers/fadein-container/FadeinContainer";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface Props {
  searchParams: SearchParams;
}

export const revalidate = 3600;

async function ShopPage({ searchParams }: Props): Promise<React.ReactElement> {
  const query = await searchParams;
  const querySearchValue = query.search ?? "";
  const queryPage = query.page ?? 1;

  const page = isNaN(Number(queryPage)) ? null : Number(queryPage);

  if (page === null || page < 0) redirect("/");

  const { data } = await getFilteredProducts({ page, take: 12 }, querySearchValue as string);

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

  if (data.products.length === 0)
    return (
      <MaxWidthContainer>
        <PaddingContainer>
          <header className="flex gap-4 items-center justify-between flex-wrap">
            <TitleAnimated title="Tienda" subtitle="Todos los productos" />
            <SearchProduct />
          </header>
          <Message message="No se encontraron artículos" />
        </PaddingContainer>
      </MaxWidthContainer>
    );

  return (
    <MaxWidthContainer>
      <PaddingContainer>
        <FadeinContainer>
          <header className="flex gap-4 items-center justify-between flex-wrap">
            <TitleAnimated title="Tienda" subtitle="Todos los productos" />
            <SearchProduct />
          </header>
          <ProductsGrid products={data.products} />
          <ProductsPagination pages={data.pages} defaultPage={page} />
        </FadeinContainer>
      </PaddingContainer>
    </MaxWidthContainer>
  );
}
export default ShopPage;
