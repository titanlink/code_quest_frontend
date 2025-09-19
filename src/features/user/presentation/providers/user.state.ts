import { IUser } from "../..";



export interface UsersState {
  isGridView?: boolean;

  errorMsg?: string;
  isError?: boolean;
  isLastPage?: boolean;
  page: number;
  limit: number;
  total: number;
  isLoading: boolean;
  search?: string;


  items:IUser[];
  filterItems?:IUser[];

  setSelected: (selected:IUser | null) => void;
  selected?:IUser | null;
  
  setPage: (page: number) =>void;
  setLimit: (limit: number) =>void;

  getData: (page: number, limit: number, token: string) => Promise<void>;
  findOne: (id: string, token: string) => Promise<IUser | null>;
  changeRole: (client: IUser, token: string) => Promise<any>;
  createOrUpdate: (client: IUser, token: string) => Promise<any>;
  deleteOne: (id: string, token: string) => Promise<IUser | null>;
  dashboard: (token: string) => Promise<any>;
}
