import 'react-table';

declare module 'react-table' {
  export interface TableInstance<D extends object = {}> extends UsePaginationInstanceProps<D>, UseExpandedInstanceProps<D> {}
  export interface TableState<D extends object = {}> extends UsePaginationState<D> {}
  export interface Row<D extends object = {}> extends UseExpandedRowProps<D> {}
}
