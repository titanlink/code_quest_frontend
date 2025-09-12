import { ResponsePropio } from "@/config";
import { ICategory } from "../..";



export interface CategorysState {
  isGridView?: boolean;

  errorMsg?: string;
  isError?: boolean;
  isLastPage?: boolean;
  page: number | undefined;
  limit: number | undefined;
  total: number | undefined;
  isLoading: boolean;
  search?: string;


  items:ICategory[];
  filterItems?:ICategory[];

  setSelected: (selected:ICategory | null) => void;
  selected?:ICategory | null;
  
  setPage: (page: number) =>void;
  setLimit: (limit: number) =>void;

  getData: (page: number, limit: number) => Promise<void>;
  findOne: (id: string) => Promise<ICategory | ResponsePropio>;
  createOrUpdate: (client: ICategory) => Promise<ICategory | ResponsePropio>;
  deleteOne: (id: string) => Promise<ResponsePropio>;
}
