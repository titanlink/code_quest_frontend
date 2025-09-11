import { mockPosts } from "@/lib/mock-data";
import { PostDatasource, IPost } from "../..";



export class PostDatasourceGQL implements PostDatasource {
  

  async all(page = 1, limit = 50): Promise<IPost[]> {
    return mockPosts
  }
  async findById(id: string): Promise<any> {
    return mockPosts[0]
  }

  async create ( form: IPost ): Promise<any> {
    return mockPosts[0]
  };

  async update(form: IPost): Promise<any> {
    return mockPosts[0]
  }

  async delete(id: string): Promise<any> {
    return mockPosts[0]
  }

}
