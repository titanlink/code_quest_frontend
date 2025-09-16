import { ResponsePropio } from "@/config";
import { IPost, PostDatasource, PostRepository } from "../..";




export class PostRepositoryImpl extends PostRepository {
  constructor(private readonly datasource: PostDatasource, private token: string = '') {
    super();
  }

  async findBySlugId(id: string) {
    return this.datasource.findBySlugId(id, this.token);
  }
  
  async findById(id: string) {
    return this.datasource.findById(id, this.token);
  }
  async create(entity: any) {
    return this.datasource.create(entity, this.token);
  }
  async update(entity: any) {
    return this.datasource.update(entity, this.token);
  }
  async all(page: number, limit: number) {
    return this.datasource.all(page, limit, this.token);
  }
  async delete(id: string) {
    return this.datasource.delete(id, this.token);
  }
}

