

export interface Page<T>{
    totalPages: number,
    totalElements: number,
    isLast: Boolean,
    isFirst: Boolean,
    items: Array<T>
}