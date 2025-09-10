import { mockCategories } from "@/lib/mock-data";
import { CategoryDatasource, ICategory } from "../../domain";



export class CategoryDatasourceGQL implements CategoryDatasource {
  

  async list(page = 1, limit = 50): Promise<any> {
    return mockCategories
    // const records = await prisma.entity.findMany({
    //   skip: (page - 1) * limit,
    //   take: limit
    // });
    // return { error: false, msg: "Categorys retrieved successfully", data: records };
  }
  async findById(id: number): Promise<any> {
    return mockCategories[0]
    // const record = await prisma.entity.findUnique({ 
    //   where: { id },
    // });
    // if (!record) return { error: true, msg: "Category not found" };
    
    // return { error: false, msg: "Category retrieved successfully", data: record };
  }

  async create ( form: ICategory ): Promise<any> {
    return mockCategories[0]
    // try {
    //   const entidad = await prisma.entity.create({
    //     data: { 
    //       uuid: form.uuid ?? crypto.randomUUID(),
    //       name: form.name,                                         
    //       level: form.level,                                         
    //       displayId: form.displayId ?? 0,                           
    //       active: form.active ?? true,                                     
    //       description: form.description ?? '',
    //     }
    //   })

    //   return { error: false, msg: "Category Creado", };
    // } catch (e) {
    //   console.error(`Error => ${e}`);
    //   const msg = 'getGraphQLErrorMessage(e)';
    //   return {
    //     error: true,
    //     msg: `Error creando Category: ${msg}`,
    //   };
    // }
  };

  async update(form: ICategory): Promise<any> {
    return mockCategories[0]
    // try {
    //   const entidad = await prisma.entity.update({
    //     where: { id: form.id },
    //     data: { 
    //       name       : form.name, 
    //       active     : form.active, 
    //       description: form.description, 
    //     }
    //     ,
    //   })
  
    //   const error = (!entidad)
    //   // revalidatePath(`${AppRouter.adminCategorys}`)
    //   return { error: error, msg: "Category Actualizado", data: entidad };
    // } catch (e) {
    //   console.error(`Error => ${e}`);
    //   const msg = 'getGraphQLErrorMessage(e)';
    //   return { error: true, msg: `Error actualizando Category: ${msg}`, };
    // }
  }

  async delete(id: number): Promise<any> {
    return mockCategories[0]
    // try {

    //   const detalle = 'delete => (NOT IMPLEMENT) '
    //   const deletedCategory = await prisma.entity.delete({
    //     where: { id },
    //   })
    //   let msg = 'Eliminado Correctamente'
    //   let error: boolean = (!deletedCategory)
    //   if (!deletedCategory) msg = ` ${detalle}`

    //   const resp = { error: error, msg: msg };
    //   return resp;
    // } catch (e) {
    //   console.error(`Error => ${e}`);
    //   const msg = 'ERROR (delete) -> removeCategoryAction(e)';
    //   return {
    //     error: true,
    //     msg: `Error eliminando Category: ${msg}`,
    //   };
    // }
  }

}
