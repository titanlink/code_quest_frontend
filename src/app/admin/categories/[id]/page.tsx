
import type React from "react"


import { allCategoryAction, CategoryForm, findCategoryAction, ICategory, useCategoryStore } from "@/features"
import { Badge, CardContent, CardHeader, CardTitle, CustomCard } from "@/components"
import { notFound } from "next/navigation"
import { mockCategories } from "@/lib"


type Params = Promise<{
  id: string;
}>;

export default async function Page(props: { params: Promise<Params> }) {
  let isNotFound = false
  let entity : ICategory | undefined
  const params = await props.params;
  const categories: ICategory[]  = await allCategoryAction({ page:0, limit:1000 });
  let isNew = true;
  let id = 0
  if (params.id != 'new'){ 
    isNew = false
    id = Number(params.id);
  }
  const actionTitle = isNew ? 'Nueva' : 'Editar'
  if ((id == 0 && !isNew) || isNaN(id)) notFound();



  if (id > 0){
    const response = await findCategoryAction(id.toString());
    if (response && !('id' in response)) isNotFound = true
    if(!isNotFound && ('id' in response)) entity = response;
  } 




  return (
    <div className="space-y-6">
      <div  className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryForm entity={entity}/>
        <CustomCard>
          <CardHeader>
            <CardTitle>Todas las categorias</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-rows-3 gap-2">
            { categories.map((category) => (
              <Badge key={category.id} style={{ backgroundColor: category?.color}} className="text-black/50">
                {category?.name}
              </Badge>
            )) }
          </CardContent>
        </CustomCard>
      </div>
    </div>
  )
}
