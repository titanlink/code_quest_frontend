import { create } from "zustand";

import {
  ICategory, 
  CategorysState, 
  allCategoryAction,
  createCategoryAction,
  deleteCategoryAction,
  findCategoryAction,
  updateCategoryAction 
} from "../..";
import { ResponsePropio } from "@/config";


export const useCategoryStore = create<CategorysState>()((set, get) => ({
  isGridView: true,
  page: 0,
  limit: 50,
  total: 0,
  items: [],
  isLoading: true,
  selected: null,


  setSelected(selected: ICategory | null) { set({selected, isLoading: false}) },

  setPage(page?: number){ set({page: page ?? 1}) },
  setLimit(limit?: number){ set({limit: limit ?? 50}) },


  getData: async(page: number = 0, limit: number = 50) => {
    try {
      set({ isLoading: true });
      const resp  = await allCategoryAction({ page, limit});
      console.log("🚀 ~ resp.......:", resp)
      set({items: resp ?? [],  isLoading: false})
    }catch(error) {
      throw new Error('Categorys > getData > Unauthorized')
    }finally {
      set({ isLoading: false });
    }
  },

  findOne: async( id: string): Promise<ICategory | null> => {
    let retorno = null
    try {
      const resp  = await findCategoryAction(id);
      retorno = resp
      set({selected: resp.data, isLoading: false})
    }catch(error) {
      throw 'Categorys > findOne > Unauthorized'
    }finally {
      set({ isLoading: false });
    }
    return retorno.data ?? null
  },

  createOrUpdate: async( entitdad: ICategory): Promise<ICategory | ResponsePropio> => {
    let retorno:any = { error: true, msg: "No action taken" };
    try {
      if (entitdad.id) retorno = await updateCategoryAction(entitdad);
      if (!entitdad.id) retorno = await createCategoryAction(entitdad);
      
      set({selected: retorno?.data, isLoading: false})
    }catch(error) {
      throw new Error('Categorys > createOrUpdate > Unauthorized')
    }finally {
      set({ isLoading: false });
      return retorno
    }
  
  },
  
  deleteOne: async( id: string ) : Promise<ICategory | null> => {
    let retorno = null
    try {
      const resp  = await deleteCategoryAction(id);
      retorno = resp
      set({selected: resp.data, isLoading: false})
    }catch(error) {
      throw 'Categorys > findOne > Unauthorized'
    }finally {
      set({ isLoading: false });
    }
    return retorno?.data ?? null
  },




  
}));
