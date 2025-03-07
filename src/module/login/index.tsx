import React, { useEffect, useState } from "react";
import { useLogin } from "../../hooks/auth";
import { AxiosError } from "axios";
import { ErrorResponse } from "../../contants/error";
import { setCookie } from "cookies-next";
import router from "next/router";
import config from "../../config/config";
import { LOCALSTORAGE } from "../../contants/localstorage";
import {
  Form,
  Input,
  Row,
  Button as ButtonAntd,
  Spin,
  Col,
  Modal,
  message,
} from "antd";
import general from "../../config/general";
import { useHandleLoadingGlobal } from "../../../redux/general.reducer";
const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const { user, setModalForgotPassword, handleLogin } = useLogin();

  useEffect(() => {
    if (user !== null) {
      setCookie("token", user.token_data.token, { maxAge: 60 * 6 * 24 * 7 });
      router.push("/admin-area/dashboard");
    }
  }, [user]);

  const [form] = Form.useForm();

  const loading = useHandleLoadingGlobal();

  return (
    <React.Fragment>
      <section className="flex flex-col  bg-gray-100 dark:bg-gray-900 py-40 lg:px-8  lg:py-24">
        <Spin spinning={loading}>
          <div className="flex-col container grid place-items-center align-middle">
            <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10  bg-white rounded-lg shadow-md lg:shadow-lg">
              <div>
                <h1 className=" text-center mt-2 text-2xl font-semibold text-gray-800 md:text-3xl dark:text-white">
                  Form Masuk
                </h1>
                <p className=" text-center mt-3 text-gray-500 dark:text-gray-400">
                  Silahkan lengkapi form dibawah ini.
                </p>
              </div>
              <Form
                form={form}
                layout="vertical"
                className="mt-10 mb-7"
                onFinish={handleLogin}
              >
                <Form.Item
                  name={"email"}
                  label="E-MAIL"
                  required
                  hasFeedback
                  rules={[general.generalInput, general.emailInput as any]}
                >
                  <Input placeholder="masukkan alamat e-mail anda" />
                </Form.Item>
                <Form.Item
                  name={"password"}
                  label="PASSWORD"
                  required
                  hasFeedback
                  rules={[general.generalInput]}
                >
                  <Input.Password placeholder="masukkan password anda" />
                </Form.Item>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex items-start">
                      <a
                        href="javascript:void(0)"
                        className="text-sm text-hijau hover:underline ml-auto"
                        onClick={(e) => {
                          e.preventDefault();
                          setModalForgotPassword(true);
                          // router.push("/register");
                        }}
                      >
                        Lupa Password?
                      </a>
                    </div>
                  </div>
                  <ButtonAntd block className="hijau-button" htmlType="submit">
                    MASUK
                  </ButtonAntd>
                  <div
                    className="text-sm text-center font-medium text-gray-500 dark:text-gray-300"
                    style={{
                      border: "1px solid #EEE",
                      padding: 5,
                      borderRadius: "5px",
                    }}
                  >
                    Belum punya akun?{" "}
                    <a
                      href="javascript:void(0)"
                      className="text-hijau hover:underline"
                      onClick={(e) => {
                        e.preventDefault();
                        router.push("/register");
                      }}
                    >
                      Buat akun
                    </a>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </Spin>
      </section>
    </React.Fragment>
  );
};

export default Login;
