import { LikeDatasource, LikeMapper, ILike } from "../..";
import { makeClientGraphql } from "@/lib";
import { allLikeGQL, createLikePostGQL, findLikeGQL, removeLikePostGQL, updateLikeGQL } from "./like.graphql";
import { ResponsePropio } from "@/config";



export class LikeDatasourceGQL implements LikeDatasource {
  
  async all(page = 0, limit = 50, token: string) {
    try {
      const peti = await makeClientGraphql(token);

      const { data } = await peti.query<any>({
        query: allLikeGQL,
        fetchPolicy: "no-cache",
        variables: {
          limit: limit,
          offset: page
        },
      });

      return LikeMapper.fromJsonList(data["allLike"]['items']);
    } catch (e) {
      console.error(`Error => allLikeGQL -> ${e}`);
      // throw e
      return [];
    }
  }
  async findById(id: string, token: string) {
    let retorno: ILike | ResponsePropio = { msg: 'Error desconocido', error: true }
    try {
      const peti = await makeClientGraphql(token);

      const { data } = await peti.query<any>({
        query: findLikeGQL,
        fetchPolicy: "no-cache",
        variables: {
          postId: Number(id),
        },
      });

      retorno = LikeMapper.fromJson(data["post"]);
    } catch (e) {
      console.error(`Error => findLikeGQL -> ${e}`);
    }finally{
      return retorno
    }
  
  }


  async create ( form: ILike, token: string ) {
    let retorno: ILike | ResponsePropio = { msg: 'Error desconocido > LikeDatasourceGQL > create', error: true }
    try {
      const peti = await makeClientGraphql(token);

      const input = {
        id_post: Number(form.post?.id ?? 0),
      }

      const { data } = await peti.mutate<any>({
        mutation: createLikePostGQL,
        fetchPolicy: "no-cache",
        variables: {
          input: input,
        },
      });

      // console.log("🚀 ~ LikeDatasourceGQL ~ create ~ data:", data)
      retorno =  LikeMapper.fromJson(data["createLikePost"]);
    } catch (e) {
      console.error(`Error => createLikePostGQL -> ${e}`);
    } finally {
      return retorno
    }
    
  };

  async update(form: ILike, token: string) {
    let retorno: ILike | ResponsePropio = { msg: 'Error desconocido, gql impl', error: true }
    try {
      const peti = await makeClientGraphql(token);

      const input = {
        id: Number(form.id),
      }

      const { data } = await peti.mutate<any>({
        mutation: updateLikeGQL,
        fetchPolicy: "no-cache",
        variables: {
          input: input,
        },
      });
      retorno = LikeMapper.fromJson(data["updateLike"]);
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
        mutation: removeLikePostGQL,
        fetchPolicy: "no-cache",
        variables: {
          removeLikePostId: Number(id),
        },
      });
      const resp = data['removeLikePost']
      if ('message' in resp) retorno =  { msg: resp['message'], error: !resp }
      
    } catch (e) {
      const error = `Error => updateLikeGQL -> ${e}`
      console.error(error, e);
      retorno.msg = error
    } finally {
      return retorno
    }
  }

}
