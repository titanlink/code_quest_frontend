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
  findOne: (id: string) => Promise<ICategory | null>;
  createOrUpdate: (client: ICategory) => Promise<any>;
  deleteOne: (id: string) => Promise<ICategory | null>;
}
