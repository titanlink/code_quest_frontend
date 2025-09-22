'use server'

import axios from "axios";
import { writeFile } from "fs/promises"
import path from "path"


export const saveAsset = async ( asset: any, token?:string): Promise<any> => {

  const file = asset as File
  let imageId = undefined
  if (file){
    // Guardar archivo en /public/uploads
    // const bytes = await file.arrayBuffer()
    // const buffer = Buffer.from(bytes)
    
    // const fileName = `${new Date().toISOString().split("T")[0]}-${file.name}`
    // const filePath = path.join(process.cwd(), "public/uploads", fileName)
    
    // await writeFile(filePath, buffer)
    const cloudy = await uploadImage(file, token) 
    const data = cloudy?.data
    if (data){
      if('id' in data ){
        imageId = data['id']
      }
    }
  }
  return imageId
}

async function uploadImage(file:File, _token?:string) {
  const token = _token ?? ''

  const formData = new FormData();
  formData.append("file-imagen", file); 

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL_GQL}/api/upload`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("✅ Subida exitosa:", response.data);
    return response
  } catch (error) {
    console.error("❌ Error al subir la imagen:", error);
  }
}


