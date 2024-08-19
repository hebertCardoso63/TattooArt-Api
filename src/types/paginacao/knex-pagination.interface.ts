interface IPaginateParams {
    perPage: number,
    currentPage: number,
    isFromStart?: boolean,
    isLengthAware?: boolean,
}

interface IWithPagination<T = any> {
    data: T;
    pagination: IPagination;
}

interface IPagination {
    total?: number;
    lastPage?: number;
    currentPage: number;
    perPage: number;
    from: number;
    to: number;
}