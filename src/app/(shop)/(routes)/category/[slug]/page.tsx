import { redirect } from "next/navigation";
import { getProductsByCategory } from "@/core/shop/services/get-products.service";
import { categoriesRoutes } from "@/core/shop/constants/categories-routes";
import MaxWidthContainer from "@/shared/components/containers/max-width-container/MaxWidthContainer";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import ProductsGrid from "@/app/(shop)/_components/products-grid/ProductsGrid";
import PaddingContainer from "@/shared/components/containers/padding-container/PaddingContainer";

interface Props {
  params: Promise<{ slug: string }>;
}

const title: Record<string, any> = { men: "Hombres", women: "Mujeres", kids: "Niños" };

async function CategoryPage({ params }: Props): Promise<React.ReactElement> {
  const { slug } = await params;

  const path = `/category/${slug}`;

  if (!categoriesRoutes.some((cat) => cat.path === path)) redirect("/");

  const products = await getProductsByCategory(slug);

  return (
    <MaxWidthContainer>
      <PaddingContainer>
        <TitleAnimated title={`Artículos de ${title[slug]}`} subtitle="Todos los productos" />
        <ProductsGrid products={products} />
      </PaddingContainer>
    </MaxWidthContainer>
  );
}
export default CategoryPage;
