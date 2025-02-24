import { create } from "zustand";

// Definisikan tipe untuk Zustand Store
interface FormStore {
  formDataProfile: {
    title: string;
    image: string;
    description: string;
  };
  setFormDataProfile: (field: string, value: string) => void;

  formDataSocialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
    youtube: string;
    tiktok: string;
  };
  setFormDataSocialMedia: (field: string, value: string) => void;

  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const useContent = create<FormStore>((set) => ({
  activeTab: "0", // Default ke tab pertama
  setActiveTab: (tab) => set({ activeTab: tab }),
  formDataProfile: {
    title: "",
    image: "",
    description: "",
  },
  formDataSocialMedia: {
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
    tiktok: "",
  },

  setFormDataProfile: (field, value) =>
    set((state) => ({
      formDataProfile: { ...state.formDataProfile, [field]: value },
    })),

  setFormDataSocialMedia: (field, value) =>
    set((state) => ({
      formDataSocialMedia: { ...state.formDataSocialMedia, [field]: value },
    })),
}));

export default useContent;
