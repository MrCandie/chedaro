"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const fetchData = async (url) => {
  const headers = {
    Accept: "application/json",
  };

  try {
    const { data } = await axios.get(url, { headers });
    return data;
  } catch (error) {
    const errMessage = error.response?.data?.message || "Something went wrong";

    throw new Error(errMessage);
  }
};

const useGet = (url, queryKey) => {
  return useQuery({
    queryKey: [queryKey],
    queryFn: () => fetchData(url),
    onError: () => {
      toast.error("An unexpected error occurred");
    },
  });
};

export default useGet;
