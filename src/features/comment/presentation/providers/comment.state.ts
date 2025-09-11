import { IComment } from "../..";



export interface CommentsState {
  isGridView?: boolean;

  errorMsg?: string;
  isError?: boolean;
  isLastPage?: boolean;
  page: number | undefined;
  limit: number | undefined;
  total: number | undefined;
  isLoading: boolean;
  search?: string;


  items:IComment[];
  filterItems?:IComment[];

  setSelected: (selected:IComment | null) => void;
  selected?:IComment | null;
  
  setPage: (page: number) =>void;
  setLimit: (limit: number) =>void;

  getData: (page: number, limit: number) => Promise<void>;
  findOne: (id: string) => Promise<IComment | null>;
  createOrUpdate: (client: IComment) => Promise<any>;
  deleteOne: (id: string) => Promise<IComment | null>;
}
