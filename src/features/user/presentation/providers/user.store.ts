import { create } from "zustand";

import {
  IUser, 
  UsersState, 
  allUserAction,
  createUserAction,
  deleteUserAction,
  findUserAction,
  updateUserAction 
} from "../..";


export const useUserStore = create<UsersState>()((set, get) => ({
  isGridView: true,
  page: 0,
  limit: 50,
  total: 0,
  items: [],
  isLoading: true,
  selected: null,


  setSelected(selected: IUser | null) { set({selected, isLoading: false}) },

  setPage(page?: number){ set({page: page ?? 1}) },
  setLimit(limit?: number){ set({limit: limit ?? 50}) },


  getData: async(page: number = 0, limit: number = 50) => {
    try {
      set({ isLoading: true });
      const resp  = await allUserAction({ page, limit});
      set({items: resp ?? [],  isLoading: false})
    }catch(error) {
      throw 'Users > getData > Unauthorized'
    }finally {
      set({ isLoading: false });
    }
  },

  findOne: async( id: string): Promise<IUser | null> => {
    let retorno = null
    try {
      const resp  = await findUserAction(id);
      retorno = resp
      set({selected: resp.data, isLoading: false})
    }catch(error) {
      throw 'Users > findOne > Unauthorized'
    }finally {
      set({ isLoading: false });
    }
    return retorno.data ?? null
  },

  createOrUpdate: async( entitdad: IUser): Promise<any> => {
    let retorno:any = { error: true, msg: "No action taken" };
    try {
      if (entitdad.id) retorno = await updateUserAction(entitdad);
      if (entitdad.id == '0') retorno = await createUserAction(entitdad);

      set({selected: retorno?.data, isLoading: false})
    }catch(error) {
      throw 'Users > findOne > Unauthorized'
    }finally {
      set({ isLoading: false });
    }
    return retorno
  
  },
  
  deleteOne: async( id: string ) : Promise<IUser | null> => {
    let retorno = null
    try {
      const resp  = await deleteUserAction(id);
      retorno = resp
      set({selected: resp.data, isLoading: false})
    }catch(error) {
      throw 'Users > findOne > Unauthorized'
    }finally {
      set({ isLoading: false });
    }
    return retorno?.data ?? null
  },




  
}));
