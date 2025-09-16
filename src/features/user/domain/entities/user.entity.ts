
export interface IUser {
  id: string
  email: string
  name: string
  avatar?: string
  role: "admin" | "user"
  discordId?: string
  createdAt?: Date
}

export class UserMapper {
  static fromJson( json: Record<string, any> | undefined ): IUser | undefined {
    if (!json) return
    return {
      id: json['id'],
      name: json['name'],
      email: json['email'],
      role: 'user'
    }
  }

  static fromJsonList( data: any ) : IUser[] {
    const entities: IUser[] = [];
    if (!data) return entities
    for (const json of data) {
      const entidad = UserMapper.fromJson(json);
      if(entidad) entities.push(entidad);
    }
    return entities;
  }
}