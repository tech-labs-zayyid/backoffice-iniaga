import { useEffect, useState } from "react";
import { call } from "./baseApi";
import { ProductField, ProductResponse } from "../contants/products";
import Gallery from "../../pages/admin-area/gallery";

export const useGalleries = () => {
  const [data, setData] = useState<any[]>([]);

  const getGalleries = async () => {
    const response = await call({
      method: "GET",
      subUrl: "sales/gallery",
    });

    setData(response?.data?.code === 200 ? response?.data?.data?.data_list : []);
  };

  const createGalleries = async (payload: any) => {
    const response = await call({
      method: "POST",
      subUrl: "sales/gallery",
      data: payload,
    });
    return response;
    console.log(response);
  };

  const detailGalleries = async (id: string) => {
    const response = await call({
      method: "GET",
      subUrl: `sales/gallery/${id}`
    });
    return response?.data.code === 200 ? response?.data?.data : { id: '', image: '' } ;
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
    detailGalleries,
    createGalleries,
  };
};
