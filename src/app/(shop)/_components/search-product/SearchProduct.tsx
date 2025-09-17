"use client";

import { useRef } from "react";

import { IoSearchOutline } from "react-icons/io5";
import InputAnimated from "@/shared/components/animations/input-animated/InputAnimated";
import { useQueryPathname } from "@/shared/utils/query-params/use-pathname";

function SearchProduct(): React.ReactElement {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const { handlePathname } = useQueryPathname();

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (timer.current) clearInterval(timer.current);
    timer.current = setTimeout(() => {
      handlePathname({ search: value, page: 1 });
    }, 500);
  };

  return (
    <InputAnimated
      containerStyles="max-w-[300px]"
      placeholder="Buscar producto..."
      icon={<IoSearchOutline size={20} />}
      onChange={handleValue}
    />
  );
}
export default SearchProduct;
