export default {
  logo: "https://iniaga.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcrop_logo.79742657.png&w=128&q=75",
  favicon: "https://iniaga.vercel.app/favicon.ico",
  profile:
    "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/man-user-circle-icon.png",
  development: {
    API_URL: process.env.PUBLIC_NEXT_API_URL || "",
  },
  production: {
    API_URL: process.env.PUBLIC_NEXT_API_URL || "",
  },

  baseUrl:
    process.env.NODE_ENV === "production"
      ? process.env.PUBLIC_NEXT_API_URL || ""
      : process.env.PUBLIC_NEXT_API_URL || "",
};
