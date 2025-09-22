import { ResponsePropio } from "@/config/response-propio";
import { makeClientGraphql } from "@/lib/client-graphql";
import { CommentDatasource } from "../../domain/datasources/comment.datasource";
import { CommentMapper, IComment, SubCommentMapper } from "../../domain/entities/comment.entity";
import {
  allCommentGQL,
  findCommentGQL,
  createSubCommentGQL,
  createCommentGQL,
  updateCommentGQL,
  removeCommentGQL,
} from "./comment.graphql";

export class CommentDatasourceGQL implements CommentDatasource {
  async all(page = 0, limit = 50, token: string) {
    const retorno: ResponsePropio = { msg: "Error desconocido", error: true };
    try {
      const peti = await makeClientGraphql(token);

      const { data } = await peti.query<any>({
        query: allCommentGQL,
        fetchPolicy: "no-cache",
        variables: {
          limit: limit,
          offset: page,
        },
      });
      const resp = data["allComment"];
      const entities = CommentMapper.fromJsonList(resp["items"]);
      if (entities) {
        retorno.msg = "Ok";
        retorno.error = false;
        retorno.totalRecords = resp["total"];
        retorno.data = entities;
      }
    } catch (e) {
      console.error(`Error => allCommentGQL -> ${e}`);
      throw e;
    } finally {
      return retorno;
    }
  }
  async findById(id: string, token: string) {
    let retorno: IComment | ResponsePropio = {
      msg: "Error desconocido",
      error: true,
    };
    try {
      const peti = await makeClientGraphql(token);

      const { data } = await peti.query<any>({
        query: findCommentGQL,
        fetchPolicy: "no-cache",
        variables: {
          commentId: Number(id),
        },
      });
      const entity = CommentMapper.fromJson(data["comment"]);
      if (entity && "id" in entity) retorno = entity;
    } catch (e) {
      console.error(`Error => findCommentGQL -> ${e}`);
    } finally {
      return retorno;
    }
  }

  async create(form: IComment, token: string, isSubComment: boolean = false) {
    let retorno: IComment | ResponsePropio = {
      msg: "Error desconocido > CommentDatasourceGQL > create",
      error: true,
    };
    try {
      const peti = await makeClientGraphql(token);

      let input: any = { content: form.content, id_post: Number(form.postId) };
      if (isSubComment)
        input = { content: form.content, id_comment: Number(form.parentId) };

      const { data } = await peti.mutate<any>({
        mutation: isSubComment ? createSubCommentGQL : createCommentGQL,
        fetchPolicy: "no-cache",
        variables: { input: input },
      });
      const key = isSubComment ? 'createSubComment' :'createComment'
      const entity = isSubComment ? SubCommentMapper.fromJson(data[key]) : CommentMapper.fromJson(data[key]);
      if (entity && "id" in entity) retorno = entity;
    } catch (e) {
      console.error(`Error => createCommentGQL -> ${e}`);
    } finally {
      return retorno;
    }
  }

  async update(form: IComment, token: string) {
    let retorno: IComment | ResponsePropio = {
      msg: "Error desconocido",
      error: true,
    };
    try {
      const peti = await makeClientGraphql(token);

      const { data } = await peti.mutate<any>({
        mutation: updateCommentGQL,
        fetchPolicy: "no-cache",
        variables: {
          input: {
            id: Number(form.id),
            content: form.content,
            postId: Number(form.postId),
            authorId: form.authorId,
            author: form.author,
            parentId: form.parentId,
            sub_comment: form.sub_comment,
          },
        },
      });
      const entity = CommentMapper.fromJson(data["updateComment"]);
      if (entity && "id" in entity) retorno = entity;
    } catch (e) {
      const error = `${e}`;
      console.error(error);
      if ("msg" in retorno) retorno.msg = error;
    } finally {
      return retorno;
    }
  }

  async delete(id: string, token: string) {
    let retorno: ResponsePropio = { msg: "Error desconocido", error: true };
    try {
      const peti = await makeClientGraphql(token);

      const { data } = await peti.mutate<any>({
        mutation: removeCommentGQL,
        fetchPolicy: "no-cache",
        variables: {
          removeCommentId: Number(id),
        },
      });
      const resp = data["removeComment"];
      if ("message" in resp) retorno = { msg: resp["message"], error: !resp };
    } catch (e) {
      const error = `Error => updateCommentGQL -> ${e}`;
      console.error(error, e);
      retorno.msg = error;
    } finally {
      return retorno;
    }
  }
}
