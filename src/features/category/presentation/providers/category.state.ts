import { ResponsePropio } from "@/config";
import { ICategory } from "../..";



export interface CategorysState {
  isGridView?: boolean;

  errorMsg?: string;
  isError?: boolean;
  isLastPage?: boolean;
  page: number | undefined;
  limit: number;
  total: number;
  isLoading: boolean;
  search?: string;


  items:ICategory[];
  filterItems?:ICategory[];

  setSelected: (selected:ICategory | undefined) => void;
  selected?:ICategory | undefined;
  
  setPage: (page: number) =>void;
  setLimit: (limit: number) =>void;

  getData: (page: number, limit: number, token: string) => Promise<void>;
  findOne: (id: string, token: string) => Promise<ICategory | ResponsePropio>;
  createOrUpdate: (client: ICategory, token: string) => Promise<ICategory | ResponsePropio>;
  deleteOne: (id: string, token: string) => Promise<ResponsePropio>;
}
