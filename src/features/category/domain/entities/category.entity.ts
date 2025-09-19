export interface ICategory {
  id?: string
  name: string
  slug: string
  postCount?: number
  description?: string
  color?: string
  createdAt?: Date
  updatedAt?: Date
}


export class CategoryMapper {
  static fromJson( json: Record<string, any> ): ICategory {
    // if (!json) return
    return {
      id: json['id'],
      name: json['name'],
      postCount: json['postCount'],
      slug: json['slug'],
      description: json['description'],
      color: json['color'],
      createdAt: new Date(json['createAt']),
      updatedAt: new Date(json['updateAt']),
    }
  }

  static fromJsonList( data: any ) : ICategory[] {
    const entities: ICategory[] = [];
    if (!data) return entities
    for (const json of data) {
      const entidad = CategoryMapper.fromJson(json);
      if(entidad) entities.push(entidad);
    }
    return entities;
  }
}