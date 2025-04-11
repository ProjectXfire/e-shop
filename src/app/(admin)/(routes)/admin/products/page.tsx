import { redirect } from "next/navigation";
import { getProductsCache } from "@/core/shop/services/get-products.service";
import ProductsList from "@/app/(admin)/_components/products-list/ProductsList";
import ProductsPagination from "@/app/(shop)/_components/products-grid/ProductsPagination";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import FadeinContainer from "@/shared/components/containers/fadein-container/FadeinContainer";
import MaxWidthContainer from "@/shared/components/containers/max-width-container/MaxWidthContainer";
import PaddingContainer from "@/shared/components/containers/padding-container/PaddingContainer";
import LinkAnimated from "@/shared/components/animations/link-animated/LinkAnimated";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface Props {
  searchParams: SearchParams;
}

async function ProductsPage({ searchParams }: Props): Promise<React.ReactElement> {
  const query = await searchParams;
  const queryPage = query.page ?? 1;

  const page = isNaN(Number(queryPage)) ? null : Number(queryPage);

  if (page === null || page < 0) redirect("/admin");

  const { pages, products } = await getProductsCache({ page, take: 20 });

  return (
    <MaxWidthContainer>
      <FadeinContainer>
        <PaddingContainer>
          <header className="flex justify-between gap-4 flex-wrap items-center">
            <TitleAnimated title="Productos" subtitle="Todas los productos" />
            <LinkAnimated href="/admin/products/create">Nuevo producto</LinkAnimated>
          </header>
          <ProductsList products={products} />
          <div className="mt-[20px]">
            <ProductsPagination pages={pages} defaultPage={page} />
          </div>
        </PaddingContainer>
      </FadeinContainer>
    </MaxWidthContainer>
  );
}
export default ProductsPage;
