

export interface Page<T>{
    totalPages: number,
    totalElements: number,
    isLast: boolean,
    isFirst: boolean,
    items: Array<T>
}