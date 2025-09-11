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


export const useCommentStore = create<CommentsState>()((set, get) => ({
  isGridView: true,
  page: 1,
  limit: 50,
  total: 0,
  items: [],
  isLoading: true,
  selected: null,


  setSelected(selected: IComment | null) { set({selected, isLoading: false}) },

  setPage(page?: number){ set({page: page ?? 1}) },
  setLimit(limit?: number){ set({limit: limit ?? 50}) },


  getData: async(page: number = 1, limit: number = 50) => {
    try {
      set({ isLoading: true });
      const resp  = await allCommentAction({ page, limit});
      set({items: resp ?? [],  isLoading: false})
    }catch(error) {
      throw 'Comments > getData > Unauthorized'
    }finally {
      set({ isLoading: false });
    }
  },

  findOne: async( id: string): Promise<IComment | null> => {
    let retorno = null
    try {
      const resp  = await findCommentAction(id);
      retorno = resp
      set({selected: resp.data, isLoading: false})
    }catch(error) {
      throw 'Comments > findOne > Unauthorized'
    }finally {
      set({ isLoading: false });
    }
    return retorno.data ?? null
  },

  createOrUpdate: async( entitdad: IComment): Promise<any> => {
    let retorno:any = { error: true, msg: "No action taken" };
    try {
      if (entitdad.id) retorno = await updateCommentAction(entitdad);
      if (entitdad.id == '0') retorno = await createCommentAction(entitdad);

      set({selected: retorno?.data, isLoading: false})
    }catch(error) {
      throw 'Comments > findOne > Unauthorized'
    }finally {
      set({ isLoading: false });
    }
    return retorno
  
  },
  
  deleteOne: async( id: string ) : Promise<IComment | null> => {
    let retorno = null
    try {
      const resp  = await deleteCommentAction(id);
      retorno = resp
      set({selected: resp.data, isLoading: false})
    }catch(error) {
      throw 'Comments > findOne > Unauthorized'
    }finally {
      set({ isLoading: false });
    }
    return retorno?.data ?? null
  },




  
}));
