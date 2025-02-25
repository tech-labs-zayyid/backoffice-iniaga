import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  HomeOutlined,
  DashboardOutlined,
  GlobalOutlined,
  ProductOutlined,
  FileImageOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";

export default {
  generalInput: {
    required: true,
    message: "tidak boleh kosong",
  },
  emailInput: {
    type: "email",
    message: "format email salah",
  },
  numberInput: {
    pattern: new RegExp(/^[0-9]*$/),
    message: "tidak boleh memasukan selain angka",
  },
  urlInput: {
    type: "url",
    message: "format url tidak valid",
  },
  pagination: {
    limit: 10,
    page: 1,
  },
  cloudinaryImage: [
    {
      image:
        "http://res.cloudinary.com/dxjazxzn4/image/upload/v1740324254/zhyqvtewplysmgabqlou.png",
      title: "Beautiful Sunset",
      description: "A stunning sunset over the ocean.",
    },
    {
      image:
        "https://res.cloudinary.com/dxjazxzn4/image/upload/v1740218449/jn3vfh2ewt56c4sookze.png",
      title: "Mountain View",
      description: "A breathtaking view of the mountains.",
    },
    {
      image:
        "https://res.cloudinary.com/dxjazxzn4/image/upload/v1740218449/jn3vfh2ewt56c4sookze.png",
      title: "City Lights",
      description: "A dazzling cityscape at night.",
    },
    {
      image:
        "http://res.cloudinary.com/dxjazxzn4/image/upload/v1740324459/zm40pjf9pkkcoerjyiex.jpg",
      title: "Beautiful Sunset",
      description: "A stunning sunset over the ocean.",
    },
    {
      image:
        "http://res.cloudinary.com/dxjazxzn4/image/upload/v1740324507/qugbfsf7b5nzrjyucjor.jpg",
      title: "Mountain View",
      description: "A breathtaking view of the mountains.",
    },
    {
      image:
        "http://res.cloudinary.com/dxjazxzn4/image/upload/v1740324535/ioxuf0ayjb9izrtsa6l1.jpg",
      title: "City Lights",
      description: "A dazzling cityscape at night.",
    },
  ],
  sidebar: [
    {
      icon: 'DashboardOutlined',
      label: "Dashboard",
      link: "dashboard",
    },
    {
      icon: 'ProductOutlined',
      label: "Product",
      link: "product",
    },
    {
      icon: 'FileImageOutlined',
      label: "Gallery",
      link: "gallery",
    },
    {
      icon: 'UserOutlined',
      label: "Agent",
      link: "agent",
    },
    {
      icon: 'GlobalOutlined',
      label: "Content",
      link: `content?tab=0`,
    },
  ],
};
