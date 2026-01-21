import axios from "axios";
import { getCsrfToken, getSession, signOut } from "next-auth/react";

const baseURL = `${process.env.NEXT_PUBLIC_API_URL}`;

const api = axios.create({
  baseURL,
});

api.interceptors.request.use(async (request: any) => {
  const session = await getSession();
  if (session) {
    request.headers.Authorization = `Bearer ${session.jwt}`;
  }
  return request;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      const data = await signOut({ redirect: false, callbackUrl: "/login" });
      window.location.href = data.url;
    }

    console.log(`API error: `, error.message);
    return Promise.reject(error);
  }
);

export default api;
