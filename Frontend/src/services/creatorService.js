import api from "./api";

export const registerCreator = async (payload) => {
    console.log(payload)
  const { data } = await api.post("/creator/register", payload);

  console.log(data)
  return data;
};