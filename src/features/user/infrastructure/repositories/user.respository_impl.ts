import { UserDatasource, UserRepository } from "../..";




export class UserRepositoryImpl extends UserRepository {
  constructor(private readonly datasource: UserDatasource, private token: string = '') {
    super();
  }
  
  async dashboard(): Promise<any> {
    return this.datasource.dashboard(this.token);
  }
  async checkProfile(): Promise<any> {
    return this.datasource.checkProfile(this.token);
  }
  async findById(id: string): Promise<any> {
    return this.datasource.findById(id, this.token);
  }
  async create(entity: any): Promise<any> {
    return this.datasource.create(entity, this.token);
  }
  async update(entity: any): Promise<any> {
    return this.datasource.update(entity, this.token);
  }
  async changeRole(entity: any): Promise<any> {
    return this.datasource.changeRole(entity, this.token);
  }
  async all(page: number, limit: number): Promise<any> {
    return this.datasource.all(page, limit, this.token);
  }
  async delete(id: string): Promise<any> {
    return this.datasource.delete(id, this.token);
  }
  
}

