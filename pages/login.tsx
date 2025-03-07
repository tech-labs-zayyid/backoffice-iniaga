import React, { useEffect, useState } from "react";
import Head from "next/head";
import LoginForm from "../src/module/login";
import { getCookie, hasCookie } from "cookies-next";
import { useRouter } from "next/router";
import { Spin, message } from "antd";
const Login: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (getCookie("token") !== undefined) {
      setLoading(true);
      message.info("anda sudah melakukan login").then(() => {
        router.push("/").then(() => setLoading(false));
      });
    }
  }, []);
  return (
    <div>
      <Head>
        <title>Iniaga - Login</title>
        <meta
          name="description"
          content="Encourage Parents, helping children"
        />
      </Head>
      <Spin spinning={loading}>
        <LoginForm />
      </Spin>
    </div>
  );
};

export default Login;
