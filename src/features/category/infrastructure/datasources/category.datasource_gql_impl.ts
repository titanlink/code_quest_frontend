import { CategoryDatasource, CategoryMapper, ICategory } from "../..";
import { makeClientGraphql } from "@/lib";
import { allCategoryGQL, createCategoryGQL, findCategoryGQL, removeCategoryGQL, updateCategoryGQL } from "./category.graphql";
import { ResponsePropio } from "@/config";



export class CategoryDatasourceGQL implements CategoryDatasource {
  

  async all(page = 0, limit = 50, token: string) {
    // return mockCategories
    try {
      const peti = await makeClientGraphql(token);

      const { data } = await peti.query<any>({
        query: allCategoryGQL,
        fetchPolicy: "no-cache",
        variables: {
          limit: limit,
          offset: page
        },
      });

      return CategoryMapper.fromJsonList(data["allCategory"]);
    } catch (e) {
      console.error(`Error => allCategoryGQL -> ${e}`);
      // throw e
      return [];
    }
  }
  async findById(id: string, token: string){
    let retorno: ICategory | ResponsePropio = { msg: 'Error desconocido', error: true }
    try {
      const peti = await makeClientGraphql(token);

      const { data } = await peti.query<any>({
        query: findCategoryGQL,
        fetchPolicy: "no-cache",
        variables: {
          categoryId: Number(id),
        },
      });

      retorno = CategoryMapper.fromJson(data["category"]);
    } catch (e) {
      console.error(`Error => findCategoryGQL -> ${e}`);
    }finally{
      return retorno
    }
  
  }

  async create ( form: ICategory, token: string ) {
    let retorno: ICategory | ResponsePropio = { msg: 'Error desconocido createCategoryGQL gql_impl', error: true }
    try {
      const peti = await makeClientGraphql(token);

      const { data } = await peti.mutate<any>({
        mutation: createCategoryGQL,
        fetchPolicy: "no-cache",
        variables: {
          input: {
            slug: form.slug,
            name: form.name,
            description: form.description,
            color: form.color,
          },
        },
      });

      retorno =  CategoryMapper.fromJson(data["createCategory"]);
    } catch (e) {
      console.error(`Error => createCategoryGQL -> ${e}`);
    } finally {
      return retorno
    }
    
  };

  async update(form: ICategory, token: string){
    let retorno: ICategory | ResponsePropio = { msg: 'Error desconocido', error: true }
    try {
      const peti = await makeClientGraphql(token);

      const { data } = await peti.mutate<any>({
        mutation: updateCategoryGQL,
        fetchPolicy: "no-cache",
        variables: {
          input: {
            id: Number(form.id),
            slug: form.slug,
            name: form.name,
            description: form.description,
            color: form.color,
          },
        },
      });
      retorno = CategoryMapper.fromJson(data["updateCategory"]);
    } catch (e) {
      const error = `${e}`
      console.error(error);
      if ('msg' in retorno) retorno.msg = error
    }finally{
      return retorno
    }
  }

  async delete(id: string, token: string) {
    let retorno: ResponsePropio = { msg: 'Error desconocido', error: true }
    try {
      const peti = await makeClientGraphql(token);

      const { data } = await peti.mutate<any>({
        mutation: removeCategoryGQL,
        fetchPolicy: "no-cache",
        variables: {
          removeCategoryId: Number(id),
        },
      });
      const resp = data['removeCategory']
      if ('message' in resp) retorno =  { msg: resp['message'], error: !resp }
      
    } catch (e) {
      const error = `Error => updateCategoryGQL -> ${e}`
      console.error(error, e);
      retorno.msg = error
    } finally {
      return retorno
    }
  }

}
