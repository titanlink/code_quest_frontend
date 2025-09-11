import { mockCategories } from "@/lib/mock-data";
import { CategoryDatasource, ICategory } from "../..";



export class CategoryDatasourceGQL implements CategoryDatasource {
  

  async all(page = 1, limit = 50): Promise<any> {
    return mockCategories
  }
  async findById(id: number): Promise<any> {
    return mockCategories[0]
  
  }

  async create ( form: ICategory ): Promise<any> {
    return mockCategories[0]
    
  };

  async update(form: ICategory): Promise<any> {
    return mockCategories[0]
  }

  async delete(id: number): Promise<any> {
    return mockCategories[0]
  }

}
