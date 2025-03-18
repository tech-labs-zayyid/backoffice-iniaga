import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { call } from "../hooks/baseApi";

interface SocialMediaEntry {
  user_account?: string;
  link_embed?: string;
  is_active?: boolean;
}

interface SocialMediaForm {
  [key: string]: SocialMediaEntry | any;
}

interface SocialMediaIds {
  [key: string]: string;
}

interface BannerForm {
  description: string;
  image_url: string;
  is_active: boolean;
}

interface ProfileForm {
  title: string;
  image: string;
  description: string;
}

interface ContentContextType {
  profile: ProfileForm;
  seo_description: string;
  banner: undefined[];
  socialMedia: SocialMediaForm;
  socialMediaIds: SocialMediaIds;
  setSocialMedia: (data: SocialMediaForm) => void;
  fetchSocialMedia: () => Promise<void>;
  submitSocialMedia: (data: SocialMediaForm) => Promise<void>;
  handleToggleActive: (platform: string, isActive: boolean) => Promise<void>;
  setProfile: (data: ProfileForm) => void;
  setSeoDescription: (data: string) => void;
  createSEO: (data: any) => void;
  createBanner: (data: any) => void
  detailBanner: (id: string) => void
  putBanner: (id: string, data: BannerForm) => void
}

const defaultValues: ContentContextType = {
  profile: {
    title: "",
    image: "",
    description: "",
  },
  seo_description: "",
  banner: [],
  socialMedia: {},
  socialMediaIds: {},
  setSocialMedia: () => {},
  setProfile: () => {},
  setSeoDescription: () => {},
  fetchSocialMedia: async () => {},
  submitSocialMedia: async () => {},
  handleToggleActive: async () => {},
  createSEO: async () => {},
  createBanner: async () => {},
  detailBanner: async () => {},
  putBanner: async () => {}
};

const ContentContext = createContext<ContentContextType>(defaultValues);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [socialMedia, setSocialMedia] = useState<SocialMediaForm>({});
  const [socialMediaIds, setSocialMediaIds] = useState<SocialMediaIds>({});
  const [banner, setBanner] = useState<any[]>([])

  const [profile, setProfile] = useState<ProfileForm>(defaultValues.profile);
  const [seo_description, setSeoDescription] = useState<string>("");

  const fetchSocialMedia = async () => {
    try {
      const response = await call({
        method: "GET",
        subUrl: "sales/social-media",
      });

      if (response?.data?.data?.data_list) {
        const formattedData: SocialMediaForm = {};
        const ids: SocialMediaIds = {};

        response.data.data.data_list.forEach((item: any) => {
          const mediaName = item.social_media_name.toLowerCase();

          formattedData[mediaName] = {
            user_account: item.user_account || "",
            link_embed: item.link_embed || "",
            is_active: item.is_active ?? true,
          };

          ids[mediaName] = item.id_social_media;
        });

        setSocialMedia(formattedData);
        setSocialMediaIds(ids);
      }
    } catch (error) {
      console.error("Error fetching social media:", error);
    }
  };

  const submitSocialMedia = async (data: SocialMediaForm) => {
    try {
      const toUpdate: any[] = [];
      const toInsert: any[] = [];

      Object.entries(data).forEach(([key, value]) => {
        if (!value.user_account && !value.link_embed) return;

        const id = socialMediaIds[key];

        const socialMediaData = {
          social_media_name: key,
          user_account: value.user_account,
          link_embed: value.link_embed,
          is_active: value.is_active ?? true,
        };

        if (id) {
          toUpdate.push({ ...socialMediaData, id_social_media: id });
        } else {
          toInsert.push(socialMediaData);
        }
      });

      if (toInsert.length > 0) {
        await call({
          method: "POST",
          subUrl: "sales/social-media",
          data: { data_social_media: toInsert },
        });
      }

      for (const item of toUpdate) {
        await call({
          method: "PUT",
          subUrl: `sales/social-media/${item.id_social_media}`,
          data: {
            social_media_name: item.social_media_name,
            user_account: item.user_account,
            link_embed: item.link_embed,
            is_active: item.is_active,
          },
        });
      }

      fetchSocialMedia();
    } catch (error) {
      console.error("Error on submit:", error);
    }
  };

  const handleToggleActive = async (platform: string, isActive: boolean) => {
    const id = socialMediaIds[platform];

    if (!id) return;

    try {
      await call({
        method: "PUT",
        subUrl: `sales/social-media/${id}`,
        data: {
          social_media_name: platform,
          user_account: socialMedia[platform]?.user_account || "",
          link_embed: socialMedia[platform]?.link_embed || "",
          is_active: isActive,
        },
      });

      setSocialMedia((prev) => ({
        ...prev,
        [platform]: { ...prev[platform], is_active: isActive },
      }));
    } catch (error) {
      console.error("error change status:", error);
    }
  };

  const fetchBanner = async () => {
    const response = await call({
      method: "GET",
      subUrl: "sales/banner",
    });
    setBanner(response?.data?.data?.data_list || [])
  };

  const detailBanner = async (id: string) => {
    const response = await call({
      method: "GET",
      subUrl: `sales/banner/${id}`
    });
    return response?.data.code === 200 ? response?.data?.data : { id: '', image: '' } ;
  };

  const putBanner = async (id: string, payload: BannerForm) => {
    const response = await call({
      method: "PUT",
      subUrl: `sales/banner/${id}`,
      data: payload,
    });
    if (response?.status === 200) fetchBanner()

    return response;
  };

  const createBanner = async (data: any) => {
    const response = await call({
      method: "POST",
      subUrl: "sales/banner",
      data
    });
    if (response?.status === 200) fetchBanner()

    return response
  };

  const fetchSEO = async () => {
    const response = await call({
      method: "GET",
      subUrl: "sales/seo-config",
    });

    return response
  };

  const createSEO = async (data: any) => {
    const response = await call({
      method: "POST",
      subUrl: "sales/seo-config",
      data
    });
    return response
  };

  useEffect(() => {
    fetchBanner();
    fetchSocialMedia();
    fetchSEO()
  }, []);

  return (
      <ContentContext.Provider value={{
        seo_description,
        profile,
        banner,
        setSeoDescription,
        setProfile,
        socialMedia,
        socialMediaIds,
        setSocialMedia,
        fetchSocialMedia,
        submitSocialMedia,
        handleToggleActive,
        createSEO,
        createBanner,
        detailBanner,
        putBanner
      }}>
        {children}
      </ContentContext.Provider>
  );
};

export const useContentContext = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useFormContext harus digunakan di dalam ContentProvider");
  }
  return context;
};
