import { PostDatasource, PostMapper, IPost } from "../..";
import { makeClientGraphql } from "@/lib";
import { allPostGQL, createPostGQL, findPostGQL, removePostGQL, updatePostGQL } from "./post.graphql";
import { ResponsePropio } from "@/config";



export class PostDatasourceGQL implements PostDatasource {
  

  async all(page = 0, limit = 50) {
    try {
      const peti = await makeClientGraphql();

      const { data } = await peti.query<any>({
        query: allPostGQL,
        fetchPolicy: "no-cache",
        variables: {
          limit: limit,
          offset: page
        },
      });

      return PostMapper.fromJsonList(data["allPost"]);
    } catch (e) {
      console.error(`Error => allPostGQL -> ${e}`);
      // throw e
      return [];
    }
  }
  async findById(id: string) {
    let retorno: IPost | ResponsePropio = { msg: 'Error desconocido', error: true }
    try {
      const peti = await makeClientGraphql();

      const { data } = await peti.query<any>({
        query: findPostGQL,
        fetchPolicy: "no-cache",
        variables: {
          postId: Number(id),
        },
      });

      retorno = PostMapper.fromJson(data["post"]);
    } catch (e) {
      console.error(`Error => findPostGQL -> ${e}`);
    }finally{
      return retorno
    }
  
  }

  async create ( form: IPost ) {
    let retorno: IPost | ResponsePropio = { msg: 'Error desconocido, gql_impl', error: true }
    try {
      const peti = await makeClientGraphql();

      const input = {
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        content: form.content,
        coverImage: form.coverImage ?? '',
        published: form.published ?? false,
        featured: form.featured ?? false,
        tags: form.tags,
        id_category: Number(form.categoryId),
        likesCount: 0, // Campo IN-NECESARIO
      }

      const { data } = await peti.mutate<any>({
        mutation: createPostGQL,
        fetchPolicy: "no-cache",
        variables: {
          input: input,
        },
      });

      retorno =  PostMapper.fromJson(data["createPost"]);
    } catch (e) {
      console.error(`Error => createPostGQL -> ${e}`);
    } finally {
      return retorno
    }
    
  };

  async update(form: IPost) {
    let retorno: IPost | ResponsePropio = { msg: 'Error desconocido, gql impl', error: true }
    try {
      const peti = await makeClientGraphql();

      const input = {
        id: Number(form.id),
        title: form.title,
        slug: form.slug,
        excerpt: form.excerpt,
        content: form.content,
        coverImage: form.coverImage,
        published: form.published,
        featured: form.featured,
        tags: form.tags,
        id_category: Number(form.categoryId),
      }

      const { data } = await peti.mutate<any>({
        mutation: updatePostGQL,
        fetchPolicy: "no-cache",
        variables: {
          input: input,
        },
      });
      retorno = PostMapper.fromJson(data["updatePost"]);
    } catch (e) {
      const error = `${e}`
      console.error(error);
      if ('msg' in retorno) retorno.msg = error
    }finally{
      return retorno
    }
  }

  async delete(id: string) {
    let retorno: ResponsePropio = { msg: 'Error desconocido', error: true }
    try {
      const peti = await makeClientGraphql();

      const { data } = await peti.mutate<any>({
        mutation: removePostGQL,
        fetchPolicy: "no-cache",
        variables: {
          removePostId: Number(id),
        },
      });
      const resp = data['removePost']
      if ('message' in resp) retorno =  { msg: resp['message'], error: !resp }
      
    } catch (e) {
      const error = `Error => updatePostGQL -> ${e}`
      console.error(error, e);
      retorno.msg = error
    } finally {
      return retorno
    }
  }

}
