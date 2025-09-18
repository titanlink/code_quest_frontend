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
import { toast } from "sonner";


export const useUserStore = create<UsersState>()((set, get) => ({
  isGridView: true,
  page: 0,
  limit: 50,
  total: 0,
  items: [],
  isLoading: true,
  selected: null,


  setSelected(selected: IUser | null) { set({selected, isLoading: false}) },

  setPage(page?: number){ set({page: page}) },
  setLimit(limit?: number){ set({limit: limit}) },


  getData: async(page: number = 0, limit: number = 50, token = 'NO TENGO TOKEN') => {
    try {
      set({ isLoading: true });
      const resp  = await allUserAction({ page, limit}, token );
      set({items: resp.data  ?? [], total: resp.totalRecords, isLoading: false})
    }catch(error) {
      throw new Error('Users > getData > Unauthorized')
    }finally {
      set({ isLoading: false });
    }
  },

  findOne: async( id: string, token:string): Promise<IUser | null> => {
    let retorno = null
    try {
      const resp  = await findUserAction(id, token);
      retorno = resp
      set({selected: resp, isLoading: false})
    }catch(error) {
      throw new Error('Users > findOne > Unauthorized')
    }finally {
      set({ isLoading: false });
    }
    return retorno ?? null
  },

  changeRole: async( entitdad: IUser, token:string) => {
    let retorno:any = { error: true, msg: "No action taken" };
    
    try {
      if (entitdad.id) retorno = await updateUserAction(entitdad, token, true);
      const usersUpdated = [ retorno, ...get().items.filter((p) => p.id !== retorno.id) ] 
      // toast.success('testing')
      set({selected: retorno?.data, isLoading: false,  items: usersUpdated})
    }catch(error) {
      throw new Error('Users > findOne > Unauthorized')
    }finally {
      set({ isLoading: false });
    }
    return retorno
  
  },
  createOrUpdate: async( entitdad: IUser, token:string): Promise<any> => {
    let retorno:any = { error: true, msg: "No action taken" };
    try {
      if (entitdad.id) retorno = await updateUserAction(entitdad,token);
      // if (entitdad.id == '0') retorno = await createUserAction(entitdad);

      set({selected: retorno?.data, isLoading: false})
    }catch(error) {
      throw new Error('Users > findOne > Unauthorized')
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
      throw new Error('Users > findOne > Unauthorized')
    }finally {
      set({ isLoading: false });
    }
    return retorno?.data ?? null
  },




  
}));
