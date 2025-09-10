import { PostDatasource, PostRepository } from "../../domain";




export class PostRepositoryImpl extends PostRepository {
  constructor(private readonly datasource: PostDatasource) {
    super();
  }
  
  async findById(id: number): Promise<any> {
    return this.datasource.findById(id);
  }
  async create(entity: any): Promise<any> {
    return this.datasource.create(entity);
  }
  async update(entity: any): Promise<any> {
    return this.datasource.update(entity);
  }
  async list(page: number, limit: number): Promise<any> {
    return this.datasource.list(page, limit);
  }
  async delete(id: number): Promise<any> {
    return this.datasource.delete(id);
  }
  async execute({page = 1, limit = 50}): Promise<any> {
    return await this.datasource.list(page, limit);
  }
}

