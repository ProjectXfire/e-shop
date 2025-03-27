"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Pagination from "@/shared/components/pagination/Pagination";

interface Props {
  pages: number;
}

function ProductsPagination({ pages }: Props): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePage = (page: number): void => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`${pathname}?${params}`);
  };

  return <Pagination totalPages={pages} onChangePage={handlePage} />;
}
export default ProductsPagination;
