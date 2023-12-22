export interface IFilterDto {
    sort?: string,
    sortDirection?: number,
    filterItems: IFilterItemDto[],
    searchText: string,
    skipCount: number,
    maxResultCount: number
}

export interface IFilterItemDto {
    propertyName: string,
    value: number,
    comparison: number
}