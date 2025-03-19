import { useEffect, useState } from "react";
import { call } from "./baseApi";
import { ProductField, ProductResponse } from "../contants/products";

export const useAgent = () => {
  const [data, setData] = useState<ProductResponse>(null);

  const getAgen = async (limit: number, page: number) => {
    const response = await call({
      method: "GET",
      subUrl: `agent/list?limit=${limit}&page=${page}`,
    });
    setData(response?.data?.data);
  };

  const createAgent = async (payload: any) => {
    const response = await call({
      method: "POST",
      subUrl: "agent/create",
      data: payload,
    });
    return response;
    console.log(response);
  };
  // const putAgent = async (id: string, payload: ProductField) => {
  //   const response = await call({
  //     method: "PUT",
  //     subUrl: `agent/product/${id}`,
  //     data: payload,
  //   });
  //   return response;
  // };

  return {
    agents: data,
    getAgen,
    createAgent,
    // putProducts,
    // getProducts,
    // createProducts,
  };
};
