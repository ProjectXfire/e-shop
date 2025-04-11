import { redirect } from "next/navigation";
import { getOrders } from "@/core/admin/services/get-orders.service";
import OrdersList from "@/app/(admin)/_components/orders-list/OrdersList";
import MaxWidthContainer from "@/shared/components/containers/max-width-container/MaxWidthContainer";
import FadeinContainer from "@/shared/components/containers/fadein-container/FadeinContainer";
import PaddingContainer from "@/shared/components/containers/padding-container/PaddingContainer";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import PaginationRouting from "@/shared/components/pagination/PaginationRouting";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface Props {
  searchParams: SearchParams;
}

async function Orders({ searchParams }: Props): Promise<React.ReactElement> {
  const query = await searchParams;
  const queryPage = query.page ?? 1;

  const page = isNaN(Number(queryPage)) ? null : Number(queryPage);

  if (page === null || page < 0) redirect("/admin");

  const { pages, orders } = await getOrders({ page, take: 20 });

  return (
    <MaxWidthContainer>
      <FadeinContainer>
        <PaddingContainer>
          <TitleAnimated title="órdenes" subtitle="Todas las órdenes" />
          <OrdersList orders={orders} />
          <div className="mt-[20px]">
            <PaginationRouting pages={pages} defaultPage={page} />
          </div>
        </PaddingContainer>
      </FadeinContainer>
    </MaxWidthContainer>
  );
}
export default Orders;
