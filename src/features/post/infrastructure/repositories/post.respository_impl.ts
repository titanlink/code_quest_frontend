import { ResponsePropio } from "@/config";
import { IPost, PostDatasource, PostRepository } from "../..";




export class PostRepositoryImpl extends PostRepository {
  constructor(private readonly datasource: PostDatasource) {
    super();
  }

  async findBySlugId(id: string) {
    return this.datasource.findBySlugId(id);
  }
  
  async findById(id: string) {
    return this.datasource.findById(id);
  }
  async create(entity: any) {
    return this.datasource.create(entity);
  }
  async update(entity: any) {
    return this.datasource.update(entity);
  }
  async all(page: number, limit: number) {
    return this.datasource.all(page, limit);
  }
  async delete(id: string) {
    return this.datasource.delete(id);
  }
}

