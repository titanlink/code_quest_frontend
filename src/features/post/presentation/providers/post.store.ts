import { create } from "zustand";

import {
  IPost, 
  PostsState, 
  allPostAction,
  createPostAction,
  deletePostAction,
  findPostAction,
  updatePostAction 
} from "../..";
import { ResponsePropio } from "@/config";


export const usePostStore = create<PostsState>()((set, get) => ({
  isGridView: true,
  page: 0,
  limit: 50,
  total: 0,
  items: [],
  isLoading: true,
  selected: null,


  setSelected(selected: IPost | null) { set({selected, isLoading: false}) },

  setPage(page?: number){ set({page: page ?? 1}) },
  setLimit(limit?: number){ set({limit: limit ?? 50}) },


  getData: async(page: number = 0, limit: number = 50) => {
    try {
      set({ isLoading: true });
      const resp  = await allPostAction({ page, limit});
      set({items: resp ?? [],  isLoading: false})
    }catch(error) {
      throw new Error('Posts > getData > Unauthorized')
    }finally {
      set({ isLoading: false });
    }
  },

  findOne: async( id: string): Promise<IPost | ResponsePropio> => {
    let retorno: IPost | ResponsePropio = { error: true, msg: "Error desconocido" };
    try {
      retorno  = await findPostAction(id);
      if ('data' in retorno) set({selected: retorno.data, isLoading: false})
    }catch(error) {
      throw new Error('Posts > findOne > Unauthorized')
    }finally {
      set({ isLoading: false });
    }
    return retorno
  },

  createOrUpdate: async( entitdad: IPost): Promise<IPost | ResponsePropio> => {
    let retorno: IPost | ResponsePropio = { error: true, msg: "Error desconocido, createOrUpdate" };
    try {
      if (entitdad.id) retorno = await updatePostAction(entitdad);
      if (!entitdad.id) retorno = await createPostAction(entitdad);
      
      if ('data' in retorno) set({selected: retorno?.data, isLoading: false})
    }catch(error) {
      throw new Error('Posts > createOrUpdate > Unauthorized')
    }finally {
      set({ isLoading: false });
      return retorno
    }
  
  },
  
  deleteOne: async( id: string ) : Promise<ResponsePropio> => {
    let retorno: ResponsePropio = { msg:'Error desconocido', error: true}
    try {
      const resp  = await deletePostAction(id);
      retorno = resp
    }catch(error) {
      throw new Error('Posts > findOne > Unauthorized')
    }finally {
      set({ isLoading: false });
    }
    return retorno
  },




  
}));
