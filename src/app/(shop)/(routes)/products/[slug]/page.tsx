import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getProductBySlugCache } from "@/core/shop/services/get-product.service";
import ProductContainer from "@/app/(shop)/_components/product-container/ProductContainer";
import ProductFeatures from "@/app/(shop)/_components/product-features/ProductFeatures";
import SlideShow from "@/app/(shop)/_components/slide-show/SlideShow";
import MaxWidthContainer from "@/shared/components/containers/max-width-container/MaxWidthContainer";
import FadeinContainer from "@/shared/components/containers/fadein-container/FadeinContainer";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import ProductStock from "@/app/(shop)/_components/product-stock/ProductStock";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlugCache(slug);
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

  const product = await getProductBySlugCache(slug);

  if (!product) redirect("/");

  return (
    <MaxWidthContainer>
      <FadeinContainer>
        <ProductContainer>
          <SlideShow images={product.images} />
          <section className="flex flex-col gap-[30px] px-[15px] py-[10px] pb-[30px]">
            <TitleAnimated title={product.title} subtitle={`Price: $${product.price.toString()}`} />
            <ProductStock slug={slug} />
            <ProductFeatures product={product} />
          </section>
        </ProductContainer>
      </FadeinContainer>
    </MaxWidthContainer>
  );
}
export default ProductPage;
