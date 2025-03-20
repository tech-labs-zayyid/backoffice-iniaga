import moment from "moment";
import "moment/locale/id"; // Impor bahasa Indonesia
moment.locale("id");

export interface TokenPayload {
  sub?: string;
  exp?: number;
  iat?: number;
  [key: string]: any;
}

export const formatRupiah = (angka, isRp = true) => {
  var reverse = angka.toString().split("").reverse().join(""),
    ribuan = reverse.match(/\d{1,3}/g);
  ribuan = ribuan.join(".").split("").reverse().join("");
  if (!isRp) {
    return ribuan;
  }
  return "Rp " + ribuan;
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