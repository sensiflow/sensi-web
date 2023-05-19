export interface PageOutputDTO <T> {
    totalElements: number
    totalPages: number
    isLast: Boolean
    isFirst: Boolean
    items: Array<T>
}

