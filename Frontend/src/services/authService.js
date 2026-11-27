
import api from "./api";

export const loginUser = async (credentials) => {
  const { data } = await api.post("/login", credentials);
  return data;
};

export const getCurrentUser = async () => {
  const { data } = await api.get("/me");
  return data;
};

export const registerBrand = async (payload) => {
  const { data } = await api.post("/brand/register", payload);
  return data;
};
