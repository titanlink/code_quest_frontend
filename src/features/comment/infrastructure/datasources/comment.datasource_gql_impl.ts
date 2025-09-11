import { mockComments } from "@/lib/mock-data";
import { CommentDatasource, IComment } from "../..";



export class CommentDatasourceGQL implements CommentDatasource {
  

  async all(page = 0, limit = 50): Promise<any> {
    return mockComments
  }
  async findById(id: string): Promise<any> {
    return mockComments[0]
  }

  async create ( form: IComment ): Promise<any> {
    return mockComments[0]
  };

  async update(form: IComment): Promise<any> {
    return mockComments[0]
  }

  async delete(id: string): Promise<any> {
    return mockComments[0]
  }

}
