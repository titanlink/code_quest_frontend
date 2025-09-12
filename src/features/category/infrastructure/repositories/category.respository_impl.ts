import { ResponsePropio } from "@/config";
import { CategoryDatasource, CategoryRepository, ICategory } from "../..";




export class CategoryRepositoryImpl extends CategoryRepository {
  constructor(private readonly datasource: CategoryDatasource) {
    super();
  }
  
  async findById(id: string): Promise<any> {
    return this.datasource.findById(id);
  }
  async create(entity: any): Promise<ICategory | ResponsePropio> {
    return this.datasource.create(entity);
  }
  async update(entity: any): Promise<ICategory | ResponsePropio> {
    return this.datasource.update(entity);
  }
  async all(page: number, limit: number): Promise<any> {
    return this.datasource.all(page, limit);
  }
  async delete(id: string): Promise<ResponsePropio> {
    return this.datasource.delete(id);
  }
  
}

