import { mockUsers } from "@/lib/mock-data";
import { UserDatasource, IUser } from "../../domain";



export class UserDatasourceGQL implements UserDatasource {
  

  async all(page = 1, limit = 50): Promise<any> {
    return mockUsers
  }
  async findById(id: number): Promise<any> {
    return mockUsers[0]
  }

  async create ( form: IUser ): Promise<any> {
    return mockUsers[0]
  };

  async update(form: IUser): Promise<any> {
    return mockUsers[0]
  }

  async delete(id: number): Promise<any> {
    return mockUsers[0]
  }

}
