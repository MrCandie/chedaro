"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const patchData = async ({
  url,
  body,
  message,
  contentType = "application/json",
  logout,
}) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": contentType,
  };

  try {
    const { data } = await axios.patch(url, body, { headers });
    message && toast.success(message);
    return data;
  } catch (error) {
    const statusCode = error.response?.status || 500;
    const errorBody = error.response?.data?.message || "Something went wrong";

    const messages = ["unauthenticated", "authentication failed"];

    if (messages.includes(errorBody.toLowerCase())) logout();

    let message;
    if (typeof errorBody !== "string") {
      message = "Something went wrong";
    } else {
      message = errorBody;
    }

    toast.error(message);

    const customError = new Error(errorBody);
    customError.statusCode = statusCode;
    throw customError;
  }
};

export const usePatch = ({
  queryKey,
  url,
  title,
  onSuccess,
  contentType = "application/json",
}) => {
  const router = useRouter();
  function logout() {
    router.replace("/auth/login");
  }

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body) => patchData({ url, body, title, contentType, logout }),
    onSuccess: (data, variables) => {
      onSuccess(data, variables);
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
};
