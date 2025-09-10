import { mockCategories } from "@/lib/mock-data";
import { PostDatasource, IPost } from "../../domain";



export class PostDatasourceGQL implements PostDatasource {
  

  async list(page = 1, limit = 50): Promise<any> {
    return mockCategories
  }
  async findById(id: number): Promise<any> {
    return mockCategories[0]
  }

  async create ( form: IPost ): Promise<any> {
    return mockCategories[0]
  };

  async update(form: IPost): Promise<any> {
    return mockCategories[0]
  }

  async delete(id: number): Promise<any> {
    return mockCategories[0]
  }

}
