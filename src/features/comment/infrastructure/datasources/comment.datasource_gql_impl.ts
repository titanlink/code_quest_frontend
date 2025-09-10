import { mockComments } from "@/lib/mock-data";
import { CommentDatasource, IComment } from "../../domain";



export class CommentDatasourceGQL implements CommentDatasource {
  

  async all(page = 1, limit = 50): Promise<any> {
    return mockComments
    // const records = await prisma.entity.findMany({
    //   skip: (page - 1) * limit,
    //   take: limit
    // });
    // return { error: false, msg: "Comments retrieved successfully", data: records };
  }
  async findById(id: number): Promise<any> {
    return mockComments[0]
    // const record = await prisma.entity.findUnique({ 
    //   where: { id },
    // });
    // if (!record) return { error: true, msg: "Comment not found" };
    
    // return { error: false, msg: "Comment retrieved successfully", data: record };
  }

  async create ( form: IComment ): Promise<any> {
    return mockComments[0]
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

    //   return { error: false, msg: "Comment Creado", };
    // } catch (e) {
    //   console.error(`Error => ${e}`);
    //   const msg = 'getGraphQLErrorMessage(e)';
    //   return {
    //     error: true,
    //     msg: `Error creando Comment: ${msg}`,
    //   };
    // }
  };

  async update(form: IComment): Promise<any> {
    return mockComments[0]
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
    //   // revalidatePath(`${AppRouter.adminComments}`)
    //   return { error: error, msg: "Comment Actualizado", data: entidad };
    // } catch (e) {
    //   console.error(`Error => ${e}`);
    //   const msg = 'getGraphQLErrorMessage(e)';
    //   return { error: true, msg: `Error actualizando Comment: ${msg}`, };
    // }
  }

  async delete(id: number): Promise<any> {
    return mockComments[0]
    // try {

    //   const detalle = 'delete => (NOT IMPLEMENT) '
    //   const deletedComment = await prisma.entity.delete({
    //     where: { id },
    //   })
    //   let msg = 'Eliminado Correctamente'
    //   let error: boolean = (!deletedComment)
    //   if (!deletedComment) msg = ` ${detalle}`

    //   const resp = { error: error, msg: msg };
    //   return resp;
    // } catch (e) {
    //   console.error(`Error => ${e}`);
    //   const msg = 'ERROR (delete) -> removeCommentAction(e)';
    //   return {
    //     error: true,
    //     msg: `Error eliminando Comment: ${msg}`,
    //   };
    // }
  }

}
