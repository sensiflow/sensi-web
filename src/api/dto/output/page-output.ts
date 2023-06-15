export interface PageOutputDTO <T> {
    totalElements: number
    totalPages: number
    isLast: boolean
    isFirst: boolean
    items: Array<T>
}

