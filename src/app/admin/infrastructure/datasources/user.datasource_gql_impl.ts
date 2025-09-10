import { mockCategories } from "@/lib/mock-data";
import { UserDatasource, IUser } from "../../domain";



export class UserDatasourceGQL implements UserDatasource {
  

  async list(page = 1, limit = 50): Promise<any> {
    return mockCategories
  }
  async findById(id: number): Promise<any> {
    return mockCategories[0]
  }

  async create ( form: IUser ): Promise<any> {
    return mockCategories[0]
  };

  async update(form: IUser): Promise<any> {
    return mockCategories[0]
  }

  async delete(id: number): Promise<any> {
    return mockCategories[0]
  }

}
