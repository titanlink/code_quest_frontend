
export interface IImage {
  id?: string
  secure_url?: string
  public_id?: string
  createdAt?: Date
  updatedAt?: Date
}


export class ImageMapper {
  static fromJson( json: Record<string, any> ): IImage | undefined {
    if (!json) return
    return {
      id: json['id'],
      secure_url: json['secure_url'],
      public_id: json['public_id'],
    }
  }

  static fromJsonList( data: any ) : IImage[] {
    const entities: IImage[] = [];
    if (!data) return entities
    for (const json of data) {
      const entidad = ImageMapper.fromJson(json);
      if(entidad) entities.push(entidad);
    }
    return entities;
  }
}