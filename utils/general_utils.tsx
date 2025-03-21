import moment from "moment";
import "moment/locale/id"; // Impor bahasa Indonesia
moment.locale("id");

export interface TokenPayload {
  sub?: string;
  exp?: number;
  iat?: number;
  [key: string]: any;
}
export const rmFormatHTML = (html) => {
  let tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};
export const rmFormatRupiah = (value) => {
  return value.replace(/[^\d]/g, ""); // Hanya angka
};
export const formatRupiah = (value) => {
  if (!value) return "";
  const numberValue = value.replace(/\D/g, ""); // Hanya angka
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(numberValue);
};

export const rmDuplicateArray = (arr, key) => {
  const map = new Map();
  arr.forEach((item) => {
    map.set(item[key], item);
  });
  return Array.from(map.values());
};

export const dateIndo = (date, format = "D MMMM YYYY") => {
  return moment(date).format(format);
};

export const unixToDate = (date, format = "D MMMM YYYY") => {
  return moment.unix(date).format(format);
};

export const decodeToken = (token: string): TokenPayload | null => {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};
