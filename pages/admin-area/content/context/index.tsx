import { createContext, useContext, useState, ReactNode } from "react";

// Definisikan tipe untuk form social media
interface SocialMediaForm {
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  tiktok: string;
}

// Definisikan tipe untuk form profile
interface ProfileForm {
  title: string;
  image: string;
  description: string;
}

// Gabungkan keduanya dalam satu state global
interface ContentContextType {
  socialMedia: SocialMediaForm;
  profile: ProfileForm;
  isRenderCkEditor: boolean;

  setSocialMedia: (data: SocialMediaForm) => void;
  setProfile: (data: ProfileForm) => void;
  setIsRenderCkEditor: (data: any) => void;
}

// Buat default value
const defaultValues: ContentContextType = {
  isRenderCkEditor: false,
  socialMedia: {
    facebook: "",
    instagram: "",
    twitter: "",
    youtube: "",
    tiktok: "",
  },
  profile: {
    title: "",
    image: "",
    description: "",
  },
  setSocialMedia: () => {},
  setProfile: () => {},
  setIsRenderCkEditor: () => {},
};

// Buat context
const ContentContext = createContext<ContentContextType>(defaultValues);

// Provider
export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [socialMedia, setSocialMedia] = useState<SocialMediaForm>(
    defaultValues.socialMedia
  );
  const [profile, setProfile] = useState<ProfileForm>(defaultValues.profile);
  const [isRenderCkEditor, setIsRenderCkEditor] = useState<boolean>(false);

  return (
    <ContentContext.Provider
      value={{
        socialMedia,
        profile,
        setSocialMedia,
        setProfile,
        isRenderCkEditor,
        setIsRenderCkEditor,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

// Custom hook untuk menggunakan context
// export const useContentContext = () => useContext(ContentContext);

export const useContentContext = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useFormContext harus digunakan di dalam ContentProvider");
  }
  return context;
};
