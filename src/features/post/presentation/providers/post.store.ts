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

  findOne: async( id: string): Promise<IPost | null> => {
    let retorno = null
    try {
      const resp  = await findPostAction(id);
      retorno = resp
      set({selected: resp.data, isLoading: false})
    }catch(error) {
      throw new Error('Posts > findOne > Unauthorized')
    }finally {
      set({ isLoading: false });
    }
    return retorno.data ?? null
  },

  createOrUpdate: async( entitdad: IPost): Promise<any> => {
    let retorno:any = { error: true, msg: "No action taken" };
    try {
      if (entitdad.id) retorno = await updatePostAction(entitdad);
      if (entitdad.id == '0') retorno = await createPostAction(entitdad);

      set({selected: retorno?.data, isLoading: false})
    }catch(error) {
      throw new Error('Posts > findOne > Unauthorized')
    }finally {
      set({ isLoading: false });
    }
    return retorno
  
  },
  
  deleteOne: async( id: string ) : Promise<IPost | null> => {
    let retorno = null
    try {
      const resp  = await deletePostAction(id);
      retorno = resp
      set({selected: resp.data, isLoading: false})
    }catch(error) {
      throw new Error('Posts > findOne > Unauthorized')
    }finally {
      set({ isLoading: false });
    }
    return retorno?.data ?? null
  },




  
}));
