import { create } from "zustand";

interface ProductData {
  name: string;
  description: string;
  image: string;
  category: string;
}

interface FormData {
  modal: boolean;
  action: string;
  payload: ProductData;
}

interface ProductStore {
  products: ProductData[];
  formData: FormData;
  setFormData: (data: Partial<FormData>) => void;
  addProduct: (product: ProductData) => void;
}

const useProductStore = create<ProductStore>((set) => ({
  products: [
    {
      image:
        "https://res.cloudinary.com/dxjazxzn4/image/upload/v1740324535/ioxuf0ayjb9izrtsa6l1.jpg",
      name: "Beautiful Sunset",
      category: "Transportation",
      description: "A stunning sunset over the ocean.",
    },
    {
      image:
        "https://res.cloudinary.com/dxjazxzn4/image/upload/v1740324507/qugbfsf7b5nzrjyucjor.jpg",
      name: "Mountain View",
      category: "Transportation",
      description: "A breathtaking view of the mountains.",
    },
    {
      image:
        "https://res.cloudinary.com/dxjazxzn4/image/upload/v1740324459/zm40pjf9pkkcoerjyiex.jpg",
      name: "City Lights",
      category: "Transportation",
      description: "A dazzling cityscape at night.",
    },
  ],
  formData: {
    modal: false,
    action: "add",
    payload: { name: "", description: "", image: "", category: "" },
  },
  setFormData: (data) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),
  addProduct: (product) =>
    set((state) => ({ products: [...state.products, product] })),
}));
export default useProductStore;
