import { useEffect, useState } from "react";
import { call } from "./baseApi";
import { ProductField, ProductResponse } from "../contants/products";
import Gallery from "../../pages/admin-area/gallery";

export const useGalleries = () => {
  const [data, setData] = useState<ProductResponse>(null);

  const getGalleries = async () => {
    const response = await call({
      method: "GET",
      subUrl: "sales/gallery",
    });
    setData(response?.data);
  };

  const createGalleries = async (payload: ProductField) => {
    const response = await call({
      method: "POST",
      subUrl: "sales/gallery",
      data: payload,
    });
    return response;
  };
  const putGalleries = async (id: string, payload: ProductField) => {
    const response = await call({
      method: "PUT",
      subUrl: `sales/gallery/${id}`,
      data: payload,
    });
    return response;
  };

  return {
    gallery: data,
    putGalleries,
    getGalleries,
    createGalleries,
  };
};
