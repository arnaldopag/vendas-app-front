export interface Page<t>{
    content: Array<t>,
    size: number,
    number: number,
    totalElements: number,
    first: number
}