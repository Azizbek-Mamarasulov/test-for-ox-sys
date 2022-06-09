import _axios, { AxiosInstance } from "axios";

export let axios: AxiosInstance;

export const updateAxios = (token: string | null) => {
  if (token) {
    axios = _axios.create({
      baseURL: "https://toko.ox-sys.com/",
      timeout: 10000,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } else
    axios = _axios.create({
      baseURL: "https://toko.ox-sys.com/",
      timeout: 10000,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
};
