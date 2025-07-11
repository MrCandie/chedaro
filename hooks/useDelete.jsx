"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const deleteData = async ({ url, message }) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  try {
    const { data } = await axios.delete(url, { headers });
    toast.success(message);
    return data;
  } catch (error) {
    const statusCode = error.response?.status || 500;
    const errorBody = error.response?.data?.message || "Something went wrong";

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

export const useDelete = ({ queryKey, url, title, onSuccess }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteData({ url, title }),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });

      if (onSuccess) onSuccess(data, variables);
    },
  });
};
