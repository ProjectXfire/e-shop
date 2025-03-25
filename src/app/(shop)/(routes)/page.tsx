import { getProducts } from "@/core/shop/services/get-products.service";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import ProductsGrid from "../_components/products-grid/ProductsGrid";
import MaxWidthContainer from "@/shared/components/containers/max-width-container/MaxWidthContainer";
import PaddingContainer from "@/shared/components/containers/padding-container/PaddingContainer";

async function ShopPage(): Promise<React.ReactElement> {
  const products = await getProducts();

  return (
    <MaxWidthContainer>
      <PaddingContainer>
        <TitleAnimated title="Tienda" subtitle="Todos los productos" />
        <ProductsGrid products={products} />
      </PaddingContainer>
    </MaxWidthContainer>
  );
}
export default ShopPage;
