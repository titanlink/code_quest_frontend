export interface ResponsePropio {
  statusCode?: number
  error: boolean
  msg: string
  data?: any
  page?: number
  limit?: number
  totalRecords?: number
  devMsg?: string
}