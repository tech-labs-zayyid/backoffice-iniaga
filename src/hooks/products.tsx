import { useEffect, useState } from "react";
import { call } from "./baseApi";
import { ProductField, ProductResponse } from "../contants/products";

export const useProducts = () => {
  const [data, setData] = useState<ProductResponse>(null);

  const getProducts = async () => {
    const response = await call({
      method: "GET",
      subUrl: "sales/product",
    });
    setData(response?.data);
  };

  const createProducts = async (payload: ProductField) => {
    const response = await call({
      method: "POST",
      subUrl: "sales/product",
      data: payload,
    });
    return response;
    console.log(response);
  };
  const putProducts = async (id: string, payload: ProductField) => {
    const response = await call({
      method: "PUT",
      subUrl: `sales/product/${id}`,
      data: payload,
    });
    return response;
  };

  return {
    products: data,
    putProducts,
    getProducts,
    createProducts,
  };
};
