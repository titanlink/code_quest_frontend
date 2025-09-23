"use server";

import axios from "axios";

export const saveAsset = async (asset: any, token?: string): Promise<any> => {
  const file = asset as File;
  let imageId = undefined;
  if (file) {
    const cloudy = await uploadImage(file, token);
    const data = cloudy?.data;
    if (data) {
      if ("id" in data) {
        imageId = data["id"];
      }
    }
  }
  return imageId;
};

async function uploadImage(file: File, _token?: string) {
  const token = _token ?? "";

  const formData = new FormData();
  formData.append("file-imagen", file);

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL_GQL}/api/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("✅ Subida exitosa:", response.data);
    return response;
  } catch (error) {
    console.error("❌ Error al subir la imagen:", error);
  }
}
