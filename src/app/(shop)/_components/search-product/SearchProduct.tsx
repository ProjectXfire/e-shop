"use client";

import { useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";
import InputAnimated from "@/shared/components/animations/input-animated/InputAnimated";

function SearchProduct(): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const timer = useRef<NodeJS.Timeout | null>(null);

  const handleValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (timer.current) clearInterval(timer.current);
    timer.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      params.set("search", value);
      router.push(`${pathname}?${params}`);
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
