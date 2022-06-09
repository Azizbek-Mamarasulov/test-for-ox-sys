import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { axios } from "./axios";

export interface ProductPropertyProps {
  name: string;
  value: string;
}

export interface ProductProps {
  id: number;
  barcode: number;
  productName: string;
  sellable: boolean;
  shippable: boolean;
  shortDescription: string;
  sku: string;
  supplier: string;
  countable: boolean;
  productProperties: [];
}

export function useProducts(search?: string) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, _setPage] = useState(parseInt(searchParams.get("page")!) || 1);
  const [size, _setSize] = useState(parseInt(searchParams.get("size")!) || 10);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | AxiosError>(null);
  const [data, setData] = useState<ProductProps[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const setPage = (page: number) => {
    searchParams.set("page", String(page));
    setSearchParams(searchParams);
    _setPage(page);
  };

  const setSize = (size: number) => {
    searchParams.set("size", String(size));
    setSearchParams(searchParams);
    _setSize(size);
  };

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`variations?page=${page}&size=${size}`, {
          signal: controller.signal,
        });
        setData(res.data.items);
        setTotalCount(res.data.total_count);
      } catch (err) {
        setError(err as AxiosError);
      } finally {
        setIsLoading(false);
      }

      return () => controller.abort();
    })();
  }, [page, size]);
  return {
    isLoading,
    error,
    data: formatData(search, data, typeof search === "string"),
    page,
    size,
    totalCount,
    setPage,
    setSize,
  };
}

function sort(a: ProductProps, b: ProductProps): number {
  // ----------
  // ma'lum bir ma'lumotlarning productName empty string ga ya'ni "" teng bo'layotganligi sababli, ularni jadvalni pastki qismida ko'rsatadi
  if (!a.productName) return 1;
  if (!b.productName) return -1;
  // ----------
  return a.productName.toLowerCase() < b.productName.toLowerCase() ? -1 : 1;
}

function finalSort(a: ProductProps, b: ProductProps, value: string): number {
  if (!a.productName) return 1;
  if (!b.productName) return -1;
  const aVal = a.productName.toLowerCase().indexOf(value.toLowerCase());
  const bVal = b.productName.toLowerCase().indexOf(value.toLowerCase());

  if (aVal === bVal) return a.productName < b.productName ? -1 : 1;
  return aVal < bVal ? -1 : 1;
}

function formatData(
  value: string | undefined,
  data: ProductProps[],
  always: boolean
) {
  if (typeof value === "string" && always) {
    return data
      .sort(sort)
      .filter((product) =>
        product.productName.toLowerCase().includes(value.toLowerCase())
      )
      .sort((a, b) => finalSort(a, b, value));
  }
  return data;
}
