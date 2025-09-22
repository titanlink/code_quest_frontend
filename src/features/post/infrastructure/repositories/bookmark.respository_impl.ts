import { BookMarkDatasource } from "../../domain/datasources/bookmark.datasource";
import { BookMarkRepository } from "../../domain/repositories/bookmark.repository";

export class BookMarkRepositoryImpl extends BookMarkRepository {
  constructor(
    private readonly datasource: BookMarkDatasource,
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
