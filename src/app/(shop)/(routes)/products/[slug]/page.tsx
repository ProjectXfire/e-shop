import { redirect } from "next/navigation";
import { getProductBySlug } from "@/core/shop/services/get-product.service";
import ProductContainer from "@/app/(shop)/_components/product-container/ProductContainer";
import ProductFeatures from "@/app/(shop)/_components/product-features/ProductFeatures";
import SlideShow from "@/app/(shop)/_components/slide-show/SlideShow";
import MaxWidthContainer from "@/shared/components/containers/max-width-container/MaxWidthContainer";
import FadeinContainer from "@/shared/components/containers/fadein-container/FadeinContainer";

interface Props {
  params: Promise<{ slug: string }>;
}

async function ProductPage({ params }: Props): Promise<React.ReactElement> {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) redirect("/");

  return (
    <MaxWidthContainer>
      <FadeinContainer>
        <ProductContainer>
          <SlideShow images={product.images} />
          <ProductFeatures product={product} />
        </ProductContainer>
      </FadeinContainer>
    </MaxWidthContainer>
  );
}
export default ProductPage;
