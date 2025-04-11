import { redirect } from "next/navigation";
import { getCategories } from "@/core/shop/services/get-categories.service";
import CreateProduct from "@/app/(admin)/_components/create-product/CreateProduct";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import FadeinContainer from "@/shared/components/containers/fadein-container/FadeinContainer";
import MaxWidthContainer from "@/shared/components/containers/max-width-container/MaxWidthContainer";
import PaddingContainer from "@/shared/components/containers/padding-container/PaddingContainer";

async function CreateProductPage(): Promise<React.ReactElement> {
  const { data: categories } = await getCategories();

  if (!categories) redirect("/admin");

  return (
    <MaxWidthContainer>
      <FadeinContainer>
        <PaddingContainer>
          <TitleAnimated title="Producto" subtitle="Agregar un nuevo producto" />
          <CreateProduct categories={categories} />
        </PaddingContainer>
      </FadeinContainer>
    </MaxWidthContainer>
  );
}
export default CreateProductPage;
