
export interface IUser {
  id: string
  email: string
  name: string
  role: "admin" | "user"
  avatar?: string
  provider?: string
  discordId?: string
  createdAt?: Date
  updatedAt?: Date
}

export class UserMapper {
  static fromJson( json: Record<string, any> | undefined ): IUser | undefined {
    if (!json) return
    return {
      id: json['id'],
      name: json['name'],
      email: json['email'],
      role: json['role'],
      avatar: json['avatar'],
      provider: json['provider'],
      createdAt: new Date(json['createAt']),
      updatedAt: new Date(json['updateAt']),
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