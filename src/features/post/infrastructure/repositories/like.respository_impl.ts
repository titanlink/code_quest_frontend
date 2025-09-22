import { LikeDatasource } from "../../domain/datasources/like.datasource";
import { LikeRepository } from "../../domain/repositories/like.repository";

export class LikeRepositoryImpl extends LikeRepository {
  constructor(
    private readonly datasource: LikeDatasource,
    private token: string = ""
  ) {
    super();
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
