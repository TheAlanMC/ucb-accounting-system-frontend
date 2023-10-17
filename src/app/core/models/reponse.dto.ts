export interface ResponseDto<T> {
    code: string;
    message: string;
    data: T | null;
    totalElements: number | null;
}
