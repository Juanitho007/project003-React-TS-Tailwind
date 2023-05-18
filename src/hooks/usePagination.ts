import { useEffect, useState } from "react";
export const usePagination = <T>(list: T[], quantityPerPage: number) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const lowerLimit: number = quantityPerPage * (pageNumber - 1);
  const upperLimit: number = quantityPerPage * pageNumber - 1;
  const totalPages: number = Math.ceil(list.length / quantityPerPage);
  const listSlice: T[] = list.slice(lowerLimit, upperLimit + 1);
  const changePageTo = (page: number) => {
    if (page > totalPages) setPageNumber(totalPages);
    else if (page < 1) setPageNumber(1);
    else setPageNumber(page);
  };
  const pages: number[] = Array(totalPages)
    .fill(undefined)
    .map((_, i) => i + 1);

  useEffect(() => {
    setPageNumber(1);
  }, [quantityPerPage]);

  return [pageNumber, listSlice, pages, changePageTo] as const;
};
