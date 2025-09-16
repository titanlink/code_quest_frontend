import { ResponsePropio } from "@/config";
import { CategoryDatasource, CategoryRepository, ICategory } from "../..";




export class CategoryRepositoryImpl extends CategoryRepository {
  constructor(private readonly datasource: CategoryDatasource, private token: string = '') {
    super();
  }
  
  async findById(id: string){
    return this.datasource.findById(id, this.token);
  }
  async create(entity: any){
    return this.datasource.create(entity, this.token);
  }
  async update(entity: any){
    return this.datasource.update(entity, this.token);
  }
  async all(page: number, limit: number){
    return this.datasource.all(page, limit, this.token);
  }
  async delete(id: string){
    return this.datasource.delete(id, this.token);
  }
  
}

