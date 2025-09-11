import { IPost } from "../..";



export interface PostsState {
  isGridView?: boolean;

  errorMsg?: string;
  isError?: boolean;
  isLastPage?: boolean;
  page: number | undefined;
  limit: number | undefined;
  total: number | undefined;
  isLoading: boolean;
  search?: string;


  items:IPost[];
  filterItems?:IPost[];

  setSelected: (selected:IPost | null) => void;
  selected?:IPost | null;
  
  setPage: (page: number) =>void;
  setLimit: (limit: number) =>void;

  getData: (page: number, limit: number) => Promise<void>;
  findOne: (id: string) => Promise<IPost | null>;
  createOrUpdate: (client: IPost) => Promise<any>;
  deleteOne: (id: string) => Promise<IPost | null>;
}
