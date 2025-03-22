import React, { useEffect } from "react";
import { useLogin } from "../../hooks/auth";
import { setCookie } from "cookies-next";
import router from "next/router";
import {
  Form,
  Input,
  Button as ButtonAntd,
  Spin,
  Modal,
} from "antd";
import { useHandleLoadingGlobal } from "../../../redux/general.reducer";
import Image from "next/image";
import Link from "next/link";
import general from "../../config/general";

const Login = () => {
  const { 
    user, 
    setModalForgotPassword, 
    handleLogin, 
    modalForgotPassword, 
    handleForgotPassword, 
    isLoadingForgot 
  } = useLogin();

  useEffect(() => {
    if (user !== null) {
      setCookie("token", user.token_data.token, { maxAge: 60 * 6 * 24 * 7 });
      router.push("/admin-area/dashboard");
    }
  }, [user]);

  const [form] = Form.useForm();
  const loading = useHandleLoadingGlobal();

  return (
    <div className="flex flex-col items-center w-full justify-center min-h-screen bg-gray-900">
      <div className="max-w-4xl w-full flex shadow-lg rounded-lg overflow-hidden bg-gray-800 text-white">
        <div className="w-1/2 hidden md:block relative">
          <Image 
            src="https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="Background" 
            layout="fill" 
            objectFit="cover"
            unoptimized 
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center p-6">
            <h2 className="text-xl font-semibold">Selamat Datang Kembali,</h2>
            <h2 className="text-xl font-semibold">Penjualan Optimal, Teknologi Masa Kini dengan Iniaga</h2>
          </div>
        </div>

        {/* Right Side (Login Form) */}
        <div className="w-full md:w-1/2 p-8 relative">
          <div className="flex justify-center">
            <img src="https://iniaga.id/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcrop_logo.79742657.png&w=828&q=75" alt="logo" className="w-[220px]" />
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Sign in to your account</h2>

          <Form
            form={form}
            layout="vertical"
            className="mt-10 mb-7"
            onFinish={handleLogin}
          >
            <Form.Item
              name="email"
              label={<span className="text-gray-300">E-MAIL</span>}
              required
              hasFeedback
              rules={[general.generalInput, general.emailInput as any]}
            >
              <Input 
                placeholder="Masukkan email Anda" 
                className="w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </Form.Item>
            
            <Form.Item
              name="password"
              label={<span className="text-gray-300">PASSWORD</span>}
              required
              hasFeedback
              rules={[general.generalInput]}
            >
              <Input.Password 
                placeholder="Masukkan password Anda" 
                className="w-full p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </Form.Item>

            <div className="flex justify-between items-center text-sm text-gray-400">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Ingat saya
              </label>
              <a
                href="javascript:void(0)"
                className="text-purple-400 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  setModalForgotPassword(true);
                }}
              >
                Lupa Password?
              </a>
            </div>

            <ButtonAntd 
              block 
              className="bg-purple-600 hover:bg-purple-500 text-white font-semibold p-3 rounded-md mt-6" 
              htmlType="submit"
            >
              MASUK
            </ButtonAntd>
          </Form>
        </div>
      </div>

      {/* Modal Lupa Password */}
      <Modal
        title="Lupa Password"
        open={modalForgotPassword}
        onCancel={() => setModalForgotPassword(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleForgotPassword}>
          <Form.Item
            name="email"
            label="E-MAIL"
            required
            rules={[{ required: true, message: "Harap masukkan email Anda!" }]}
          >
            <Input placeholder="Masukkan email Anda" />
          </Form.Item>
          <ButtonAntd 
            block 
            className="bg-purple-600 hover:bg-purple-500 text-white font-semibold p-3 rounded-md" 
            htmlType="submit" 
            loading={isLoadingForgot}
          >
            Kirim Permintaan Reset
          </ButtonAntd>
        </Form>
      </Modal>
    </div>
  );
};

export default Login;
