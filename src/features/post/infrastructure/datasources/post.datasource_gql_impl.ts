import { PostDatasource, PostMapper, IPost } from "../..";
import { makeClientGraphql } from "@/lib";
import { allPostGQL, createPostGQL, findPostBySlugGQL, findPostGQL, removePostGQL, updatePostGQL } from "./post.graphql";
import { ResponsePropio } from "@/config";



export class PostDatasourceGQL implements PostDatasource {
  async all(page = 0, limit = 50, token: string) {
    let retorno: IPost[] | ResponsePropio = { msg: 'Error desconocido', error: true }
    try {
      const peti = await makeClientGraphql(token);

      const { data } = await peti.query<any>({
        query: allPostGQL,
        fetchPolicy: "no-cache",
        variables: {
          limit: limit,
          offset: page
        },
      });
      const resp = data["allPost"]
      const entities = PostMapper.fromJsonList(resp['items']);
      if (entities) retorno = entities;
    } catch (e) {
      console.error(`Error => allPostGQL -> ${e}`);
      const error = e as Error;
      if ('error' in retorno){ 
        retorno.msg = error.message
        retorno.devMsg = 'Error de conexión'
      }
    } finally {
      return retorno
    }
  }
  async findById(id: string, token: string) {
    let retorno: IPost | ResponsePropio = { msg: 'Error desconocido > PostDatasourceGQL > findById', error: true }
    try {
      const peti = await makeClientGraphql(token);

      const { data } = await peti.query<any>({
        query: findPostGQL,
        fetchPolicy: "no-cache",
        variables: {
          postId: Number(id),
        },
      });

      console.log("🚀 ~ PostDatasourceGQL ~ findById ~ data:", data)
      retorno = PostMapper.fromJson(data["post"]);
    } catch (e) {
      console.error(`Error => findPostGQL -> ${e}`);
    }finally{
      return retorno
    }
  
  }

  async findBySlugId(slug: string, token: string): Promise<IPost | ResponsePropio> {
    let retorno: IPost | ResponsePropio = { msg: 'Error desconocido', error: true }
    try {
      const peti = await makeClientGraphql(token);

      const { data } = await peti.query<any>({
        query: findPostBySlugGQL,
        fetchPolicy: "no-cache",
        variables: {
          slug: slug
        },
      });
      
      const resp = data["postBySlug"]
      retorno = PostMapper.fromJson(resp['item'], resp['is_like']);
    } catch (e) {
      console.error(`Error => findBySlugId -> ${e}`);
    }finally{
      return retorno
    }
  }

  async create ( form: IPost, token: string ) {
    let retorno: IPost | ResponsePropio = { msg: 'Error desconocido > PostDatasourceGQL > create', error: true }
    try {
      const peti = await makeClientGraphql(token);

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

  async update(form: IPost, token: string) {
    let retorno: IPost | ResponsePropio = { msg: 'Error desconocido, gql impl', error: true }
    try {
      const peti = await makeClientGraphql(token);

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

  async delete(id: string, token: string) {
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
