import moment from "moment";
import "moment/locale/id"; // Impor bahasa Indonesia
moment.locale("id");

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
