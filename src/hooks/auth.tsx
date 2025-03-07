import axios, { AxiosError } from "axios";
import { LoginResponse, UserData } from "../contants/login";
import { useState, useEffect } from "react";
import config from "../config/config";
import router from "next/router";
import { LOCALSTORAGE } from "../contants/localstorage";
import { METHODS, call } from "./baseApi";

interface LoginRequest {
  email: string;
  password: string;
}

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForgot, setIsLoadingForgot] = useState(false);
  const [user, setUser] = useState<UserData | null>(null); // Changed to nullable type
  const [modalForgotPassword, setModalForgotPassword] = useState(false);

  let source = axios.CancelToken.source(); // Create a cancel token source

  const handleLogin = async (data: LoginRequest) => {
    setIsLoading(true);
    const response = await call({
      method: METHODS.POST,
      subUrl: `user/login`,
      data,
    });
    const datas = response?.data?.data;
    setIsLoading(false);
    setUser(datas);
    localStorage.setItem(
      LOCALSTORAGE.USERDATA,
      JSON.stringify({ ...datas, role: "admin" })
    );
    return datas;
  };

  const handleForgotPassword = async (data) => {};

  const getUser = () => {
    setUser(JSON.parse(localStorage.getItem(LOCALSTORAGE.USERDATA)));
  };

  return {
    getUser,
    handleLogin,
    user,
    isLoading,
    isLoadingForgot,
    handleForgotPassword,
    modalForgotPassword,
    setModalForgotPassword,
  };
};

interface RegisterRequest {
  fullname: string;
  email: string;
  password: string;
  password_confirm: string;
  phone_number: string;
}

interface UseRegisterResult {
  doRegister: (data: RegisterRequest, onError?: (error: Error) => void) => void;
  userData: UserData | null;
  isLoading: boolean;
}

export const useRegister = (): UseRegisterResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<UserData | null>(null); // Changed to nullable type

  let source = axios.CancelToken.source(); // Create a cancel token source
  const doRegister = async (
    data: LoginRequest,
    onError?: (error: Error) => void
  ) => {
    if (!data) return; // Ensure data is not undefined

    setIsLoading(true);

    try {
      const res = await axios.post<LoginResponse>(
        config[process.env.NODE_ENV].API_URL + "auth/register",
        data,
        {
          cancelToken: source.token, // Pass the cancel token
        }
      );

      if (res.status === 200) {
        setUser(res.data.data);
        // localStorage.setItem(LOCALSTORAGE.EMAIL_REGISTER, data.email);
        router.push("/confirm-register");
      }
    } catch (error) {
      console.error("Error during register:", error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        onError?.(axiosError);

        if (axiosError.response) {
          console.error("Error during register:", axiosError.response.data);
        } else {
          console.error("Error during register:", axiosError.message);
        }
      } else {
        console.error("Non-Axios error during register:", error);
      }

      // Call the onError callback if it was provided
    } finally {
      setIsLoading(false);
    }
  };

  return { doRegister, userData: user, isLoading };
};

export const useConfirmRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const doConfirmRegister = async (data, onError?: (error: Error) => void) => {
    setIsLoading(true);
    let source = axios.CancelToken.source(); // Create a cancel token source

    try {
      const res = await axios.post(
        config[process.env.NODE_ENV].API_URL + "auth/resend/email",
        data,
        {
          cancelToken: source.token, // Pass the cancel token
        }
      );

      if (res.status === 200) {
        setIsSuccess(true);
        setIsLoading(false);
        // localStorage.removeItem(LOCALSTORAGE.EMAIL_REGISTER);
      }
    } catch (error) {
      console.error("Error during register:", error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        onError?.(axiosError);

        if (axiosError.response) {
          console.error("Error during register:", axiosError.response.data);
        } else {
          console.error("Error during register:", axiosError.message);
        }
      } else {
        console.error("Non-Axios error during register:", error);
      }
      setIsLoading(false);
      setIsSuccess(false);
      // Call the onError callback if it was provided
    } finally {
      setIsLoading(false);
      setIsSuccess(false);
    }
  };
  return { doConfirmRegister, isSuccess, isLoading };
};

interface VerifyRequest {
  code: string;
  email: string;
}

interface UseVerifyEmailResult {
  doVerify: (data: VerifyRequest, onError?: (error: Error) => void) => void;
  result: string;
  isLoading: boolean;
}

export const useVerifyEmail = (): UseVerifyEmailResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string>(""); // Changed to nullable type

  let source = axios.CancelToken.source(); // Create a cancel token source
  const doVerify = async (
    data: VerifyRequest,
    onError?: (error: Error) => void
  ) => {
    if (!data) return; // Ensure data is not undefined

    setIsLoading(true);

    try {
      const res = await axios.get<LoginResponse>(
        config[process.env.NODE_ENV].API_URL +
          "auth/verify/email?email=" +
          data.email +
          "&code=" +
          data.code,
        {
          cancelToken: source.token, // Pass the cancel token
        }
      );

      if (res.status === 200) {
        setResult(res.data.message);
      }
    } catch (error) {
      console.error("Error during register:", error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        onError?.(axiosError);

        if (axiosError.response) {
          console.error("Error during register:", axiosError.response.data);
        } else {
          console.error("Error during register:", axiosError.message);
        }
      } else {
        console.error("Non-Axios error during register:", error);
      }

      // Call the onError callback if it was provided
    } finally {
      setIsLoading(false);
    }
  };

  return { doVerify, result, isLoading };
};
