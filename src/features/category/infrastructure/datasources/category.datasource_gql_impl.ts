import { CategoryDatasource, CategoryMapper, ICategory } from "../..";
import { makeClientGraphql, mockCategories } from "@/lib";
import { allCategoryGQL, createCategoryGQL, findCategoryGQL, removeCategoryGQL, updateCategoryGQL } from "./category.graphql";
import { ResponsePropio } from "@/config";



export class CategoryDatasourceGQL implements CategoryDatasource {
  

  async all(page = 0, limit = 50): Promise<any> {
    // return mockCategories
    try {
      const peti = await makeClientGraphql();

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
  async findById(id: string): Promise<any> {
    // return mockCategories[0]
    try {
      const peti = await makeClientGraphql();

      const { data } = await peti.query<any>({
        query: findCategoryGQL,
        fetchPolicy: "no-cache",
      });

      return CategoryMapper.fromJsonList(data["findCategory"]);
    } catch (e) {
      console.error(`Error => findCategoryGQL -> ${e}`);
      return [];
    }
  
  }

  async create ( form: ICategory ): Promise<ICategory | ResponsePropio> {
    // return mockCategories[0]
    try {
      const peti = await makeClientGraphql();

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

      console.log("🚀 ~ CategoryDatasourceGQL ~ create ~ data:", data)
      return CategoryMapper.fromJson(data["createCategory"]);
    } catch (e) {
      console.error(`Error => createCategoryGQL -> ${e}`);
      const resp:ResponsePropio = { error: true, msg:`${e}` }
      return resp;
    }
    
  };

  async update(form: ICategory): Promise<ICategory | ResponsePropio> {
    // return mockCategories[0]
    try {
      const peti = await makeClientGraphql();

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

      return CategoryMapper.fromJson(data["updateCategory"]);
    } catch (e) {
      const error = `Error => updateCategoryGQL -> ${e}`
      console.error(error);
      return {error: true, msg:error};
    }
  }

  async delete(id: string): Promise<ResponsePropio> {
    let retorno: ResponsePropio = { msg: 'Error desconocido', error: true }
    try {
      const peti = await makeClientGraphql();

      const { data } = await peti.mutate<any>({
        mutation: removeCategoryGQL,
        fetchPolicy: "no-cache",
        variables: {
          removeCategoryId: Number(id),
        },
      });
      const resp = data['removeCategory']
      if ('message' in resp) return { msg: resp['message'], error: !resp }
      return retorno
      

    } catch (e) {
      const error = `Error => updateCategoryGQL -> ${e}`
      console.error(error, e);
      return {error: true, msg:error};
    }
  }

}
