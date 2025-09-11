import { CommentDatasource, CommentRepository } from "../..";




export class CommentRepositoryImpl extends CommentRepository {
  constructor(private readonly datasource: CommentDatasource) {
    super();
  }
  
  async findById(id: string): Promise<any> {
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
  async delete(id: string): Promise<any> {
    return this.datasource.delete(id);
  }
  
}

