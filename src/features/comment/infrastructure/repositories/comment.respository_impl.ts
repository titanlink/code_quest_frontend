import { CommentDatasource, CommentRepository } from "../..";




export class CommentRepositoryImpl extends CommentRepository {
  constructor(private readonly datasource: CommentDatasource, private token: string = '') {
    super();
  }
  
  async findById(id: string): Promise<any> {
    return this.datasource.findById(id, this.token);
  }
  async create(entity: any, _token?:string, isSubComment:boolean = false): Promise<any> {
    if (!_token) _token = this.token
    return this.datasource.create(entity, _token, isSubComment);
  }
  async update(entity: any): Promise<any> {
    return this.datasource.update(entity, this.token);
  }
  async all(page: number, limit: number): Promise<any> {
    return this.datasource.all(page, limit, this.token);
  }
  async delete(id: string): Promise<any> {
    return this.datasource.delete(id, this.token);
  }
  
}

