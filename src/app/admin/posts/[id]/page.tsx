
import type React from "react"


import { allPostAction, PostForm, findPostAction, IPost, usePostStore } from "@/features"
import { Badge, CardContent, CardHeader, CardTitle, CustomCard } from "@/components"
import { notFound } from "next/navigation"
import { mockCategories } from "@/lib"


type Params = Promise<{
  id: string;
}>;

export default async function Page(props: { params: Promise<Params> }) {
  let isNotFound = false
  let entity : IPost | undefined
  const params = await props.params;
  let isNew = true;
  let id = 0
  if (params.id != 'new'){ 
    isNew = false
    id = Number(params.id);
  }
  if ((id == 0 && !isNew) || isNaN(id)) notFound();



  if (id > 0){
    const response = await findPostAction(id.toString());
    if (response && !('id' in response)) isNotFound = true
    if(!isNotFound && ('id' in response)) entity = response;
  } 




  return (
    <div className="space-y-6">
      <div  className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <PostForm entity={entity}/>
      </div>
    </div>
  )
}
