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


  getData: async(page: number = 0, limit: number = 50, token = 'NO TENGO TOKEN') => {
    try {
      set({ isLoading: true });
      const resp  = await allCategoryAction({ page, limit}, token );
      set({items: resp ?? [],  isLoading: false})
    }catch(error) {
      throw new Error('Categorys > getData > Unauthorized')
    }finally {
      set({ isLoading: false });
    }
  },

  findOne: async( id: string, token = 'NO TENGO TOKEN'): Promise<ICategory | ResponsePropio> => {
    let retorno: ICategory | ResponsePropio = { error: true, msg: "Error desconocido" };
    try {
      retorno  = await findCategoryAction(id, token);
      if ('data' in retorno) set({selected: retorno.data, isLoading: false})
    }catch(error) {
      throw new Error('Categorys > findOne > Unauthorized')
    }finally {
      set({ isLoading: false });
    }
    return retorno
  },

  createOrUpdate: async( entitdad: ICategory, token = 'NO TENGO TOKEN'): Promise<ICategory | ResponsePropio> => {
    let retorno: ICategory | ResponsePropio = { error: true, msg: "Error desconocido" };
    try {
      if (entitdad.id) retorno = await updateCategoryAction(entitdad, token);
      if (!entitdad.id) retorno = await createCategoryAction(entitdad, token);
      
      if ('data' in retorno) set({selected: retorno?.data, isLoading: false})
    }catch(error) {
      throw new Error('Categorys > createOrUpdate > Unauthorized')
    }finally {
      set({ isLoading: false });
      return retorno
    }
  
  },
  
  deleteOne: async( id: string, token = 'NO TENGO TOKEN' ) : Promise<ResponsePropio> => {
    let retorno: ResponsePropio = { msg:'Error desconocido', error: true}
    try {
      const resp  = await deleteCategoryAction(id, token);
      retorno = resp
    }catch(error) {
      throw new Error('Categorys > findOne > Unauthorized')
    }finally {
      set({ isLoading: false });
    }
    return retorno
  },




  
}));
