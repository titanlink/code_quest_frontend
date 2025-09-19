import { UserDatasource, UserMapper, IUser } from "../..";
import { makeClientGraphql } from "@/lib";
import { ResponsePropio } from "@/config";
import { allUserGQL, checkProfileGQL, createUserGQL, findUserGQL, removeUserGQL, updateUserGQL } from "./user.graphql";



export class UserDatasourceGQL implements UserDatasource {
  

  async all(page = 0, limit = 50, token: string) {
    let retorno: ResponsePropio = { msg: 'Error desconocido', error: true}
    try {
      const peti = await makeClientGraphql(token);

      const { data } = await peti.query<any>({
        query: allUserGQL,
        fetchPolicy: "no-cache",
        variables: {
          limit: limit,
          offset: page
        },
      });
      const resp = data["allUser"]
      const entities = UserMapper.fromJsonList(resp['items']);
      if (entities) {
        retorno.msg = 'Ok'
        retorno.error = false
        retorno.totalRecords = resp['total']
        retorno.data = entities;
      }
    } catch (e) {
      console.error(`Error => allPostGQL -> ${e}`);
      const error = e as Error;
      if ('error' in retorno){ 
        retorno.msg = error.message
        retorno.devMsg = 'Error de conexión'
      }
    }finally{
      return retorno
    }
  }
  async checkProfile(token: string){
    let retorno: IUser | ResponsePropio = { msg: 'Error desconocido', error: true }
    try {
      const peti = await makeClientGraphql(token);

      const { data } = await peti.query<any>({
        query: checkProfileGQL,
        fetchPolicy: "no-cache",
      });
      const entity = UserMapper.fromJson(data["checkProfile"])
      if (entity) retorno = entity;
    } catch (e) {
      console.error(`Error => findUserGQL -> ${e}`);
    }finally{
      return retorno
    }
  }
  async findById(id: string, token: string){
    let retorno: IUser | ResponsePropio = { msg: 'Error desconocido', error: true }
    try {
      const peti = await makeClientGraphql(token);

      const { data } = await peti.query<any>({
        query: findUserGQL,
        fetchPolicy: "no-cache",
        variables: {
          userId: Number(id),
        },
      });
      const entity = UserMapper.fromJson(data["user"])
      if (entity) retorno = entity;
    } catch (e) {
      console.error(`Error => findUserGQL -> ${e}`);
    }finally{
      return retorno
    }
  }

  async create ( form: IUser, token: string ) {
    let retorno: IUser | ResponsePropio = { msg: 'Error desconocido createUserGQL gql_impl', error: true }
    try {
      const peti = await makeClientGraphql(token);

      const { data } = await peti.mutate<any>({
        mutation: createUserGQL,
        fetchPolicy: "no-cache",
        variables: {
          input: {
            email: form.email,
            name: form.name,
          },
        },
      });
      const entity = UserMapper.fromJson(data["createUser"])
      if (entity) retorno = entity
    } catch (e) {
      console.error(`Error => createUserGQL -> ${e}`);
    } finally {
      return retorno
    }
    
  };

  async update(form: IUser, token: string ){
    let retorno: IUser | ResponsePropio = { msg: 'Error desconocido', error: true }
    try {
      const peti = await makeClientGraphql(token);

      const input = {
        id: Number(form.id),
        name: form.name,
        avatar: form.avatar,
        about: form.about,
        twitter_url: form.twitter_url ? form.twitter_url : null,
        instagram_url: form.instagram_url ? form.instagram_url : null,
        role: form.role,
      }
      console.log("🚀 ~ UserDatasourceGQL ~ update ~ input:", input)

      const { data } = await peti.mutate<any>({
        mutation: updateUserGQL,
        fetchPolicy: "no-cache",
        variables: {
          input: input,
        },
      });
      console.log("🚀 ~ UserDatasourceGQL ~ update ~ data:", data)
      const entity = UserMapper.fromJson(data["updateUser"]);
      if (entity) retorno = entity
    } catch (e) {
      const error = `${e}`
      console.error(error);
      if ('msg' in retorno) retorno.msg = error
    }finally{
      return retorno
    }
  }

  async delete(id: string, token: string) {
    let retorno: ResponsePropio = { msg: 'Error desconocido', error: true }
    try {
      const peti = await makeClientGraphql(token);

      const { data } = await peti.mutate<any>({
        mutation: removeUserGQL,
        fetchPolicy: "no-cache",
        variables: {
          removeUserId: Number(id),
        },
      });
      const resp = data['removeUser']
      if ('message' in resp) retorno =  { msg: resp['message'], error: !resp }
      
    } catch (e) {
      const error = `Error => removeUserGQL -> ${e}`
      console.error(error, e);
      retorno.msg = error
    } finally {
      return retorno
    }
  }

  async changeRole(form: IUser, token: string ){
    const newRole = (form.role == 'user') ? 'admin' : 'user'
    form.role = newRole
    let retorno: IUser | ResponsePropio = { msg: 'Error desconocido', error: true }
    try {
      const peti = await makeClientGraphql(token);

      const { data } = await peti.mutate<any>({
        mutation: updateUserGQL,
        fetchPolicy: "no-cache",
        variables: {
          input: {
            id: Number(form.id),
            role: form.role
          },
        },
      });
      const entity = UserMapper.fromJson(data["updateUser"]);
      if (entity) retorno = entity
    } catch (e) {
      const error = `${e}`
      console.error(error);
      if ('msg' in retorno) retorno.msg = error
    }finally{
      return retorno
    }
  }

}
