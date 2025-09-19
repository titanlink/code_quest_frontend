import { create } from "zustand";

import {
  IPost, 
  PostsState, 
  allPostAction,
  createPostAction,
  deletePostAction,
  findPostAction,
  findPostBySlugAction,
  updatePostAction 
} from "../..";
import { ResponsePropio } from "@/config";
import { saveAsset, useAuth } from "@/lib";


export const usePostStore = create<PostsState>()((set, get) => ({
  isGridView: true,
  page: 0,
  limit: 10,
  total: 0,
  items: [],
  isLoading: true,
  selected: undefined,


  setSelected(selected: IPost | undefined) { set({selected, isLoading: false}) },

  setPage(page?: number){ set({page: page}) },
  setLimit(limit?: number){ set({limit: limit}) },


  getData: async(_page: number = 0, _limit: number = 1, token = 'NO TENGO TOKEN') => {
    try {
      set({ isLoading: true });      
      const resp  = await allPostAction({ page: _page, limit: _limit}, token );
      set({items: resp.data  ?? [], total: resp.totalRecords})
    }catch(error) {
      throw new Error('Posts > getData > Unauthorized')
    }finally {
      set({ isLoading: false });
    }
  },

  findOne: async( id: string, token = 'NO TENGO TOKEN'): Promise<IPost | ResponsePropio> => {
    let retorno: IPost | ResponsePropio = { error: true, msg: "Error desconocido" };
    try {
      set({ isLoading: true });
      retorno  = await findPostAction(id, token);
      if ('id' in retorno) set({selected: retorno})
    }catch(error) {
      throw new Error('Posts > findOne > Unauthorized')
    }finally {
      set({ isLoading: false });
    }
    return retorno
  },
  findOneBySlug: async( slug: string, token = 'NO TENGO TOKEN'): Promise<IPost | ResponsePropio> => {
    let retorno: IPost | ResponsePropio = { error: true, msg: "Error desconocido" };
    try {
      set({ isLoading: true });
      retorno  = await findPostBySlugAction(slug, token);
      console.log("🚀 ~ retorno:", retorno)
      if ('id' in retorno) set({selected: retorno})
    }catch(error) {
      throw new Error('Posts > findOne > Unauthorized')
    }finally {
      set({ isLoading: false });
    }
    return retorno
  },

  createOrUpdate: async( entitdad: IPost, token = 'NO TENGO TOKEN'): Promise<IPost | ResponsePropio> => {
    let retorno: IPost | ResponsePropio = { error: true, msg: "Error desconocido, createOrUpdate" };
    try {
      if (entitdad.coverImage){
        const coverImage = await saveAsset(entitdad.coverImage)
        entitdad.coverImage = coverImage
      }
      if (entitdad.id) retorno = await updatePostAction(entitdad, token);
      if (!entitdad.id) retorno = await createPostAction(entitdad, token);
      
      if ('data' in retorno) set({selected: retorno?.data, isLoading: false})
    }catch(error) {
      throw new Error('Posts > createOrUpdate > Unauthorized')
    }finally {
      set({ isLoading: false });
      return retorno
    }
  
  },
  
  deleteOne: async( id: string, token: string  = '') : Promise<ResponsePropio> => {
    let retorno: ResponsePropio = { msg:'Error desconocido', error: true}
    try {
      const resp  = await deletePostAction(id, token);
      retorno = resp
    }catch(error) {
      throw new Error('Posts > findOne > Unauthorized')
    }finally {
      set({ isLoading: false });
    }
    return retorno
  },




  
}));

