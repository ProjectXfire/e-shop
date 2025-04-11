import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getProductBySlug } from "@/core/shop/services/get-product.service";
import Product from "@/app/(admin)/_components/product/Product";
import ProductContainer from "@/app/(shop)/_components/product-container/ProductContainer";
import SlideShow from "@/app/(shop)/_components/slide-show/SlideShow";
import MaxWidthContainer from "@/shared/components/containers/max-width-container/MaxWidthContainer";
import FadeinContainer from "@/shared/components/containers/fadein-container/FadeinContainer";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  return {
    title: product?.title,
    description: product?.description,
    openGraph: {
      title: product?.title,
      description: product?.description,
      images: product?.images,
    },
  };
}

async function ProductPage({ params }: Props): Promise<React.ReactElement> {
  const { slug } = await params;

  const product = await getProductBySlug(slug);

  if (!product) redirect("/admin");

  return (
    <MaxWidthContainer>
      <FadeinContainer>
        <ProductContainer>
          <SlideShow images={product.images} />
          <Product product={product} />
        </ProductContainer>
      </FadeinContainer>
    </MaxWidthContainer>
  );
}
export default ProductPage;
