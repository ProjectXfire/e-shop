"use client";

import Pagination from "@/shared/components/pagination/Pagination";
import { useQueryPathname } from "@/shared/utils/query-params/use-pathname";

interface Props {
  pages: number;
  defaultPage?: number;
}

function ProductsPagination({ pages, defaultPage }: Props): React.ReactElement {
  const { handlePathname } = useQueryPathname();

  const handlePage = (page: number): void => {
    handlePathname({ page });
  };

  return <Pagination totalPages={pages} defaultPage={defaultPage} onChangePage={handlePage} />;
}
export default ProductsPagination;
