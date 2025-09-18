'use server'

import { writeFile } from "fs/promises"
import path from "path"


export const saveAsset = async ( asset: any): Promise<string | undefined> => {

  const file = asset as File
  let imageUrl = undefined
  if (file){
    // Guardar archivo en /public/uploads
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const fileName = `${new Date().toISOString().split("T")[0]}-${file.name}`
    const filePath = path.join(process.cwd(), "public/uploads", fileName)

    await writeFile(filePath, buffer)
    imageUrl = `/uploads/${fileName}`
  }
  return imageUrl
}

