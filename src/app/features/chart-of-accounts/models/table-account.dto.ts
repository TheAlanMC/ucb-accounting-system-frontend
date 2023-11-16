import { StandardAccountDto } from "./standard-account.dto";

export interface TableAccountDto {
    data: StandardAccountDto;
    children: TableAccountDto[];
}