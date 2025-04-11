"use client";

import ReactPaginate from "react-paginate";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import styles from "./styles.module.css";

interface Props {
  totalPages: number;
  defaultPage?: number;
  onChangePage: (currentPage: number) => void;
}

function Pagination({ onChangePage, totalPages, defaultPage }: Props): React.ReactElement {
  const handlePageClick = (e: { selected: number }) => {
    onChangePage(e.selected + 1);
  };

  return (
    <ReactPaginate
      className={styles.pagination}
      initialPage={defaultPage ? defaultPage - 1 : 0}
      pageLinkClassName={styles.pagination__button}
      activeClassName={styles.pagination__active}
      previousClassName={styles.pagination__arrows}
      nextClassName={styles.pagination__arrows}
      breakLabel="..."
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      nextLabel={<MdArrowForwardIos size={15} />}
      previousLabel={<MdArrowBackIos size={15} />}
      onPageChange={handlePageClick}
      pageCount={totalPages}
      renderOnZeroPageCount={null}
    />
  );
}
export default Pagination;
