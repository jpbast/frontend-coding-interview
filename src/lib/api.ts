"use server";

import { PexelsPhotoResponse, User } from "@/types/api";
import { handleApiError } from "./handleApiError";
import { cookies } from "next/headers";

export const getPhotos = async () => {
  try {
    const response = await fetch(
      `${process.env.API_URL}/search?query=nature&per_page=10`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: process.env.API_KEY || "",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as PexelsPhotoResponse;

    return data;
  } catch (error) {
    const err = handleApiError(error, "getPhotos");
    throw err;
  }
};

export const isAuthenticated = async () => {
  const cookieStore = await cookies();
  const user = cookieStore.get("user");

  if (user) {
    const userData = JSON.parse(user.value) as User;
    if (
      userData.username === process.env.AUTH_USERNAME &&
      userData.password === process.env.AUTH_PASSWORD
    ) {
      return true;
    }
  }

  return false;
};
