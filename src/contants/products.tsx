interface ProductImage {
  product_image_id: string | any;
  image_url: string;
}
export interface ProductField {
  id_product?: string;
  product_name?: string;
  price?: number;
  product_sub_category?: string;
  tdp?: number;
  installment?: number;
  province_id?: string;
  province_name?: string;
  city_id?: string;
  city_name?: string;
  clone_images?: any | string;
  best_product?: boolean;
  id_description?: string;
  description?: string;
  status?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string | null;
  slug?: string;
  images?: Array<{
    image_url: string;
  }>;
  product_images?: string[];
}
interface Pagination {
  limit_per_page: number;
  current_page: number;
  total_page: number;
  total_rows: number;
}

export interface ProductResponse {
  status: string;
  message: string;
  data: ProductField[];
  pagination: Pagination;
}
export const initialValue: ProductField = {
  id_product: "",
  product_name: "",
  price: 0,
  product_sub_category: "",
  tdp: 0,
  installment: 0,
  province_id: "",
  province_name: "",
  city_id: "",
  city_name: "",
  best_product: false,
  id_description: "",
  description: "",
  status: "",
  is_active: true,
  created_at: "",
  updated_at: null,
  product_images: [],
  slug: "",
};
