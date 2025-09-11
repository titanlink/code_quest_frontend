

export interface CategoryDatasource {
  findById(id: string): Promise<any>;
  create(entity: any): Promise<any>;
  update(entity: any): Promise<any>;
  all(page:number, limit:number): Promise<any>;
  delete(id: string): Promise<any>;
}
