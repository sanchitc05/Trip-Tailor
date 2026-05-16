import { http } from "@/services/http";

export const contactApi = {
  sendMessage: (payload) => http.post("/contact", payload),
};