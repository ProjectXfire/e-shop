import { redirect } from "next/navigation";
import { getProductsCache } from "@/core/shop/services/get-products.service";
import ProductsGrid from "../_components/products-grid/ProductsGrid";
import ProductsPagination from "../_components/products-grid/ProductsPagination";
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
  const queryPage = query.page ?? 1;

  const page = isNaN(Number(queryPage)) ? null : Number(queryPage);

  if (page === null || page < 0) redirect("/");

  const { pages, products } = await getProductsCache({ page, take: 12 });

  if (products.length === 0)
    return (
      <MaxWidthContainer>
        <PaddingContainer>
          <Message message="No se encontraron artículos" />
        </PaddingContainer>
      </MaxWidthContainer>
    );

  return (
    <MaxWidthContainer>
      <PaddingContainer>
        <FadeinContainer>
          <TitleAnimated title="Tienda" subtitle="Todos los productos" />
          <ProductsGrid products={products} />
          <ProductsPagination pages={pages} />
        </FadeinContainer>
      </PaddingContainer>
    </MaxWidthContainer>
  );
}
export default ShopPage;
