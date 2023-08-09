import { OrderType } from '../shared/enum';

export interface BaseReadResponse<T> {
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

export interface BaseResponse<T = any> {
  data: T;
  statusCode: number;
  message: string;
  error: string;
}

export class BaseQuery {
  readonly sort?: string = 'created_at';

  readonly order?: OrderType = OrderType.ASC;

  readonly page?: number = 1;

  readonly take?: number = 10;

  readonly q?: string;
}
