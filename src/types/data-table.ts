import { TClassName } from '@/types/common.ts'

export interface IDataTableHeader {
  title: string
  key: string
  className?: TClassName
}

export type TData = Record<
  string,
  string | number | boolean | string[] | number[] | boolean[] | TData[] | any
>

export interface IDataList<T = TData> {
  count: number
  next: null | string
  previous: null | string
  results: T[]
}
