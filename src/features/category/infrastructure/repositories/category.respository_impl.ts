import { ResponsePropio } from "@/config";
import { CategoryDatasource, CategoryRepository, ICategory } from "../..";




export class CategoryRepositoryImpl extends CategoryRepository {
  constructor(private readonly datasource: CategoryDatasource) {
    super();
  }
  
  async findById(id: string){
    return this.datasource.findById(id);
  }
  async create(entity: any){
    return this.datasource.create(entity);
  }
  async update(entity: any){
    return this.datasource.update(entity);
  }
  async all(page: number, limit: number){
    return this.datasource.all(page, limit);
  }
  async delete(id: string){
    return this.datasource.delete(id);
  }
  
}

