import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import UAParser from "ua-parser-js";

// Gabungkan keduanya dalam satu state global
interface GeneralContextType {
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
}

// Buat default value
const defaultValues: GeneralContextType = {
  isMobile: false,
  setIsMobile: (value: boolean) => {},
};

// Buat context
const ContentContext = createContext<GeneralContextType>(defaultValues);

// Provider
export const GeneralProvider = ({ children }: { children: ReactNode }) => {
  const [isMobile, setIsMobile] = useState<boolean>(defaultValues.isMobile);
  useEffect(() => {
    const parser = new UAParser();
    const result = parser.getResult();
    const deviceType = result.device.type;
    setIsMobile(deviceType === "mobile");
  }, []);

  return (
    <ContentContext.Provider
      value={{
        isMobile,
        setIsMobile,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useGeneralContext = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error("useFormContext harus digunakan di dalam GeneralProvider");
  }
  return context;
};
