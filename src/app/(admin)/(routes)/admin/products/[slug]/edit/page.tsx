import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getProductBySlug } from "@/core/shop/services/get-product.service";
import { getCategories } from "@/core/shop/services/get-categories.service";
import ProductEdit from "@/app/(admin)/_components/product-edit/ProductEdit";
import MaxWidthContainer from "@/shared/components/containers/max-width-container/MaxWidthContainer";
import FadeinContainer from "@/shared/components/containers/fadein-container/FadeinContainer";
import PaddingContainer from "@/shared/components/containers/padding-container/PaddingContainer";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";

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

async function EditProductPage({ params }: Props): Promise<React.ReactElement> {
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  const { data: categories } = await getCategories();

  if (!product || !categories) redirect("/admin");

  return (
    <MaxWidthContainer>
      <FadeinContainer>
        <PaddingContainer>
          <TitleAnimated title="Editar producto" subtitle={product.title} />
          <ProductEdit product={product} categories={categories} />
        </PaddingContainer>
      </FadeinContainer>
    </MaxWidthContainer>
  );
}
export default EditProductPage;
