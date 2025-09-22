import { PostDatasource } from "../../domain/datasources/post.datasource";
import { PostRepository } from "../../domain/repositories/post.repository";

export class PostRepositoryImpl extends PostRepository {
  constructor(
    private readonly datasource: PostDatasource,
    private token: string = ""
  ) {
    super();
  }

  async findBySlugId(slug: string, _token?:string) {
    return this.datasource.findBySlugId(slug, _token ?? this.token);
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
  async all(page: number, limit: number, _token?: string, categoriId?: number) {
    return this.datasource.all(page, limit, this.token, categoriId);
  }
  async delete(id: string) {
    return this.datasource.delete(id, this.token);
  }
}
