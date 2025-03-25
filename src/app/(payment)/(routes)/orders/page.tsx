import OrdersList from "../../_components/orders-list/OrdersList";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import FadeinContainer from "@/shared/components/containers/fadein-container/FadeinContainer";
import MaxWidthContainer from "@/shared/components/containers/max-width-container/MaxWidthContainer";
import PaddingContainer from "@/shared/components/containers/padding-container/PaddingContainer";

const orders = [
  { id: "1", name: "Pepe Pancho", status: "Pagado" },
  { id: "2", name: "Pepe Pancho 2", status: "Pendiente" },
  { id: "3", name: "Pepe Pancho 3", status: "Pendiente" },
  { id: "4", name: "Pepe Pancho 4", status: "Pagado" },
  { id: "5", name: "Pepe Pancho 5", status: "Pagado" },
];

function MyOrdersPage(): React.ReactElement {
  return (
    <MaxWidthContainer>
      <FadeinContainer>
        <PaddingContainer>
          <TitleAnimated title="Ordernes" subtitle="Todas mis órdenes" />
          <OrdersList orders={orders} />
        </PaddingContainer>
      </FadeinContainer>
    </MaxWidthContainer>
  );
}
export default MyOrdersPage;
