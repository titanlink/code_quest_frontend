import { IPost, PostDatasource, PostRepository } from "../..";




export class PostRepositoryImpl extends PostRepository {
  constructor(private readonly datasource: PostDatasource) {
    super();
  }
  
  async findById(id: number): Promise<IPost[]> {
    return this.datasource.findById(id);
  }
  async create(entity: any): Promise<any> {
    return this.datasource.create(entity);
  }
  async update(entity: any): Promise<any> {
    return this.datasource.update(entity);
  }
  async all(page: number, limit: number): Promise<any> {
    return this.datasource.all(page, limit);
  }
  async delete(id: number): Promise<any> {
    return this.datasource.delete(id);
  }
}

