import { AxiosError } from "axios";
import { axios } from "./axios";

interface ResponseData {
  token: string;
  lifetime: number;
}

export async function login(_username: string, _password: string) {
  try {
    const params = new URLSearchParams();
    params.append("_username", _username);
    params.append("_password", _password);
    params.append("_subdomain", "toko");
    const data = await axios.post<ResponseData>("/security/auth_check", params);
    const { token, lifetime } = await data.data;
    localStorage.setItem("token", token);
    localStorage.setItem("expires_at", String(Date.now() + lifetime));
    return { token, lifetime };
  } catch (error) {
    return {
      error: error as AxiosError,
    };
  }
}
