import { create } from "zustand";

import {
  IComment, 
  CommentsState, 
  allCommentAction,
  createCommentAction,
  deleteCommentAction,
  findCommentAction,
  updateCommentAction 
} from "../..";
import { ResponsePropio } from "@/config";


export const useCommentStore = create<CommentsState>()((set, get) => ({
  isGridView: true,
  page: 0,
  limit: 50,
  total: 0,
  items: [],
  isLoading: true,
  selected: null,


  setSelected(selected: IComment | null) { set({selected, isLoading: false}) },

  setPage(page?: number){ set({page: page ?? 1}) },
  setLimit(limit?: number){ set({limit: limit ?? 50}) },


  getData: async(page: number = 0, limit: number = 50, token = 'NO TENGO TOKEN') => {
    try {
      set({ isLoading: true });
      const resp  = await allCommentAction({ page, limit}, token );
      set({items: resp ?? [],  isLoading: false})
    }catch(error) {
      throw new Error('Comments > getData > Unauthorized')
    }finally {
      set({ isLoading: false });
    }
  },

  findOne: async( id: string, token: string): Promise<IComment | ResponsePropio> => {
    let retorno: IComment | ResponsePropio = { error: true, msg: "Error desconocido" };
    try {
      retorno  = await findCommentAction(id, token);
      if ('data' in retorno) set({selected: retorno.data, isLoading: false})
    }catch(error) {
      throw new Error('Comments > findOne > Unauthorized')
    }finally {
      set({ isLoading: false });
    }
    return retorno
  },

  createOrUpdate: async( entitdad: IComment, token: string): Promise<IComment | ResponsePropio> => {
    let retorno: IComment | ResponsePropio = { error: true, msg: "Error desconocido, createOrUpdate" };
    try {
      if (entitdad.id) retorno = await updateCommentAction(entitdad, token);
      if (!entitdad.id) retorno = await createCommentAction(entitdad, token);
      
      if ('data' in retorno) set({selected: retorno?.data, isLoading: false})
    }catch(error) {
      throw new Error('Comments > createOrUpdate > Unauthorized')
    }finally {
      set({ isLoading: false });
      return retorno
    }
  
  },
  
  deleteOne: async( id: string, token: string ) : Promise<ResponsePropio> => {
    let retorno: ResponsePropio = { msg:'Error desconocido', error: true}
    try {
      const resp  = await deleteCommentAction(id, token);
      retorno = resp
    }catch(error) {
      throw new Error('Comments > findOne > Unauthorized')
    }finally {
      set({ isLoading: false });
    }
    return retorno
  },




  
}));
