import { CategoryDatasource, CategoryMapper, ICategory } from "../..";
import { makeClientGraphql, mockCategories } from "@/lib";
import { allCategoryGQL, createCategoryGQL, findCategoryGQL, updateCategoryGQL } from "./category.graphql";



export class CategoryDatasourceGQL implements CategoryDatasource {
  

  async all(page = 1, limit = 50): Promise<any> {
    return mockCategories
    // try {
    //   const peti = await makeClientGraphql();

    //   const { data } = await peti.query<any>({
    //     query: allCategoryGQL,
    //     fetchPolicy: "no-cache",
    //     variables: {
    //       limit: limit,
    //     },
    //   });

    //   return CategoryMapper.fromJsonList(data["allCategory"]);
    // } catch (e) {
    //   console.error(`Error => ${e}`);
    //   return [];
    // }
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
      console.error(`Error => ${e}`);
      return [];
    }
  
  }

  async create ( form: ICategory ): Promise<any> {
    // return mockCategories[0]
    try {
      const peti = await makeClientGraphql();

      const { data } = await peti.mutate<any>({
        mutation: createCategoryGQL,
        fetchPolicy: "no-cache",
      });

      return CategoryMapper.fromJsonList(data["createCategory"]);
    } catch (e) {
      console.error(`Error => ${e}`);
      return [];
    }
    
  };

  async update(form: ICategory): Promise<any> {
    // return mockCategories[0]
    try {
      const peti = await makeClientGraphql();

      const { data } = await peti.mutate<any>({
        mutation: updateCategoryGQL,
        fetchPolicy: "no-cache",
      });

      return CategoryMapper.fromJsonList(data["updateCategory"]);
    } catch (e) {
      console.error(`Error => ${e}`);
      return [];
    }
  }

  async delete(id: string): Promise<any> {
    return mockCategories[0]
  }

}
