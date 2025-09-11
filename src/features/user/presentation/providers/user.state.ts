import { IUser } from "../..";



export interface UsersState {
  isGridView?: boolean;

  errorMsg?: string;
  isError?: boolean;
  isLastPage?: boolean;
  page: number | undefined;
  limit: number | undefined;
  total: number | undefined;
  isLoading: boolean;
  search?: string;


  items:IUser[];
  filterItems?:IUser[];

  setSelected: (selected:IUser | null) => void;
  selected?:IUser | null;
  
  setPage: (page: number) =>void;
  setLimit: (limit: number) =>void;

  getData: (page: number, limit: number) => Promise<void>;
  findOne: (id: string) => Promise<IUser | null>;
  createOrUpdate: (client: IUser) => Promise<any>;
  deleteOne: (id: string) => Promise<IUser | null>;
}
