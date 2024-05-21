export interface IApiResponse<T> {
    message: string;
    status: number
    success: boolean;
    data: T;
    info: IInfoPaginator;
}

export interface IInfoPaginator {
    totalCount: number;
    perPage: number;
    page: number;
}