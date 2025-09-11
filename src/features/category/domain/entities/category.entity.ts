export interface ICategory {
  id?: string
  name: string
  slug: string
  description?: string
  color?: string
}


export class CategoryMapper {
  static fromJson( json: Record<string, any> ): ICategory {
    console.log("🚀 ~ CategoryMapper ~ fromJson ~ json:", json['name'])
    return {
      id: json['id'],
      name: json['name'],
      slug: json['slug'],
      description: json['description'],
      color: json['color'],
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