import { BookMarkDatasource, BookMarkMapper, IBookMark } from "../..";
import { makeClientGraphql } from "@/lib";
import { allBookMarkGQL, createBookMarkGQL, findBookMarkGQL, removeBookMarkPostGQL, updateBookMarkGQL } from "./bookmark.graphql";
import { ResponsePropio } from "@/config";



export class BookMarkDatasourceGQL implements BookMarkDatasource {
  
  async all(page = 0, limit = 50, token: string) {
    try {
      const peti = await makeClientGraphql(token);

      const { data } = await peti.query<any>({
        query: allBookMarkGQL,
        fetchPolicy: "no-cache",
        variables: {
          limit: limit,
          offset: page
        },
      });

      return BookMarkMapper.fromJsonList(data["allBookMark"]['items']);
    } catch (e) {
      console.error(`Error => allBookMarkGQL -> ${e}`);
      // throw e
      return [];
    }
  }
  async findById(id: string, token: string) {
    let retorno: IBookMark | ResponsePropio = { msg: 'Error desconocido', error: true }
    try {
      const peti = await makeClientGraphql(token);

      const { data } = await peti.query<any>({
        query: findBookMarkGQL,
        fetchPolicy: "no-cache",
        variables: {
          bookId: Number(id),
        },
      });

      const entity = BookMarkMapper.fromJson(data["book"]);
      if (entity) retorno = entity
    } catch (e) {
      console.error(`Error => findBookMarkGQL -> ${e}`);
    }finally{
      return retorno
    }
  
  }


  async create ( form: IBookMark, token: string ) {
    let retorno: IBookMark | ResponsePropio = { msg: 'Error desconocido > BookMarkDatasourceGQL > create', error: true }
    try {
      const peti = await makeClientGraphql(token);

      const input = {
        id_post: Number(form.post?.id ?? 0),
      }

      const { data } = await peti.mutate<any>({
        mutation: createBookMarkGQL,
        fetchPolicy: "no-cache",
        variables: {
          input: input,
        },
      });

      // console.log("🚀 ~ BookMarkDatasourceGQL ~ create ~ data:", data)
      const entity = BookMarkMapper.fromJson(data["createBookmark"]);
      if (entity) retorno = entity
    } catch (e) {
      console.error(`Error => createBookMarkGQL -> ${e}`);
    } finally {
      return retorno
    }
    
  };

  async update(form: IBookMark, token: string) {
    let retorno: IBookMark | ResponsePropio = { msg: 'Error desconocido, gql impl', error: true }
    try {
      const peti = await makeClientGraphql(token);

      const input = {
        id: Number(form.id),
      }

      const { data } = await peti.mutate<any>({
        mutation: updateBookMarkGQL,
        fetchPolicy: "no-cache",
        variables: {
          input: input,
        },
      });
      const entity = BookMarkMapper.fromJson(data["updateBookMark"]);
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
        mutation: removeBookMarkPostGQL,
        fetchPolicy: "no-cache",
        variables: {
          removeBookmarkId: Number(id),
        },
      });
      const resp = data['removeBookmark']
      if ('message' in resp) retorno =  { msg: resp['message'], error: !resp }
      
    } catch (e) {
      const error = `Error => removeBookMarkPostGQL -> [id:${id}] ${e}`
      console.error(error, e);
      retorno.msg = error
    } finally {
      return retorno
    }
  }

}
