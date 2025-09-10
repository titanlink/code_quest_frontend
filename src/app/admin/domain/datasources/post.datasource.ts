

export interface PostDatasource {
  findById(id: number): Promise<any>;
  create(entity: any): Promise<any>;
  update(entity: any): Promise<any>;
  list(page:number, limit:number): Promise<any>;
  delete(id: number): Promise<any>;
}
