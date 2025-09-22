import { ResponsePropio } from "@/config/response-propio";
import { create } from "zustand";
import { allCommentAction } from "../../actions/all";
import { createCommentAction } from "../../actions/create";
import { deleteCommentAction } from "../../actions/delete";
import { findCommentAction } from "../../actions/find";
import { updateCommentAction } from "../../actions/update";
import { IComment } from "../../domain/entities/comment.entity";
import { CommentsState } from "./comment.state";

export const useCommentStore = create<CommentsState>()((set, get) => ({
  isLoading: true,
  isGridView: true,
  page: 0,
  limit: 10,
  total: 0,
  items: [],
  selected: null,

  setSelected(selected: IComment | null) {
    set({ selected, isLoading: false });
  },

  setPage(page?: number) {
    set({ page: page });
  },
  setLimit(limit?: number) {
    set({ limit: limit });
  },

  getData: async (
    page: number = 0,
    limit: number = 50,
    token = "NO TENGO TOKEN"
  ) => {
    try {
      set({ isLoading: true });
      const resp = await allCommentAction({ page, limit }, token);
      set({ items: resp.data ?? [], total: resp.totalRecords });
    } catch (error) {
      throw new Error("Comments > getData > Unauthorized");
    } finally {
      set({ isLoading: false });
    }
    return;
  },

  findOne: async (
    id: string,
    token: string
  ): Promise<IComment | ResponsePropio> => {
    let retorno: IComment | ResponsePropio = {
      error: true,
      msg: "Error desconocido",
    };
    try {
      set({ isLoading: true });
      retorno = await findCommentAction(id, token);
      if ("data" in retorno) set({ selected: retorno.data });
    } catch (error) {
      throw new Error("Comments > findOne > Unauthorized");
    } finally {
      set({ isLoading: false });
    }
    return retorno;
  },

  createOrUpdate: async (
    entitdad: IComment,
    token: string
  ): Promise<IComment | ResponsePropio> => {
    let retorno: IComment | ResponsePropio = {
      error: true,
      msg: "Error desconocido, createOrUpdate",
    };
    try {
      if (entitdad.id) retorno = await updateCommentAction(entitdad, token);
      if (!entitdad.id) retorno = await createCommentAction(entitdad, token);

      if ("data" in retorno) set({ selected: retorno?.data });
    } catch (error) {
      throw new Error("Comments > createOrUpdate > Unauthorized");
    } finally {
      set({ isLoading: false });
      return retorno;
    }
  },

  deleteOne: async (id: string, token: string): Promise<ResponsePropio> => {
    let retorno: ResponsePropio = { msg: "Error desconocido", error: true };
    try {
      const resp = await deleteCommentAction(id, token);
      retorno = resp;
    } catch (error) {
      throw new Error("Comments > findOne > Unauthorized");
    } finally {
      set({ isLoading: false });
    }
    return retorno;
  },
}));
