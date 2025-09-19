

export interface UserDatasource {
  checkProfile(token: string): Promise<any>;
  findById(id: string, token: string): Promise<any>;
  create(entity: any, token: string): Promise<any>;
  update(entity: any, token: string): Promise<any>;
  changeRole(entity: any, token: string): Promise<any>;
  all(page:number, limit:number, token: string): Promise<any>;
  delete(id: string, token: string): Promise<any>;
}
