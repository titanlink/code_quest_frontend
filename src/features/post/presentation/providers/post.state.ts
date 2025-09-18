import { ResponsePropio } from "@/config";
import { IPost } from "../..";



export interface PostsState {
  isGridView?: boolean;

  errorMsg?: string;
  isError?: boolean;
  isLastPage?: boolean;
  page: number;
  limit: number;
  total: number;
  isLoading: boolean;
  search?: string;


  items:IPost[];
  filterItems?:IPost[];

  setSelected: (selected:IPost | null) => void;
  selected?:IPost | null;
  
  setPage: (page: number) =>void;
  setLimit: (limit: number) =>void;

  getData: (page: number, limit: number, token: string) => Promise<void>;
  findOne: (id: string) => Promise<IPost | ResponsePropio>;
  createOrUpdate: (client: IPost, token: string) => Promise<IPost | ResponsePropio>;
  deleteOne: (id: string) => Promise<ResponsePropio>;
}
