import { redirect } from "next/navigation";
import { getProductsByGenderCache } from "@/core/shop/services/get-products.service";
import { categoriesRoutes } from "@/core/shop/constants/categories-routes";
import ProductsGrid from "@/app/(shop)/_components/products-grid/ProductsGrid";
import ProductsPagination from "@/app/(shop)/_components/products-grid/ProductsPagination";
import MaxWidthContainer from "@/shared/components/containers/max-width-container/MaxWidthContainer";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import PaddingContainer from "@/shared/components/containers/padding-container/PaddingContainer";
import FadeinContainer from "@/shared/components/containers/fadein-container/FadeinContainer";
import Message from "@/shared/components/message/Message";

export const revalidate = 60;

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
type Params = Promise<{ slug: string }>;

interface Props {
  params: Params;
  searchParams: SearchParams;
}

const title: Record<string, string> = { men: "Hombres", women: "Mujeres", kids: "Niños" };

async function CategoryPage({ params, searchParams }: Props): Promise<React.ReactElement> {
  const { slug } = await params;

  const query = await searchParams;
  const queryPage = query.page ?? 1;

  const page = isNaN(Number(queryPage)) ? null : Number(queryPage);

  const path = `/gender/${slug}`;

  if (!categoriesRoutes.some((cat) => cat.path === path)) redirect("/");

  if (page === null || page < 0) redirect("/");

  const { pages, products } = await getProductsByGenderCache(slug, { page, take: 12 });

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
          <TitleAnimated title={`Artículos de ${title[slug]}`} subtitle="Todos los productos" />
          <ProductsGrid products={products} />
          <ProductsPagination pages={pages} />
        </FadeinContainer>
      </PaddingContainer>
    </MaxWidthContainer>
  );
}
export default CategoryPage;
