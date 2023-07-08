import { OrderType } from '../shared/enum';

export interface BaseResponse<T> {
  data: T;
  message: string;
  meta?: {
    page: number;
    take: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
}
export class BaseQuery {
  readonly sort?: string = 'created_at';

  readonly order?: OrderType = OrderType.ASC;

  readonly page?: number = 1;

  readonly take?: number = 10;

  readonly q?: string;
}
