type Params = Promise<{ slug: string }>;

interface Props {
  params: Params;
}

async function OrderPage({ params }: Props): Promise<React.ReactElement> {
  const { slug } = await params;

  return <div>OrderPage</div>;
}
export default OrderPage;
