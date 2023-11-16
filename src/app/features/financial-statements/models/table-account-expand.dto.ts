import { StandardAccountDto } from "./standard-account.dto";

export interface TableAccountExpandDto {
    data: StandardAccountDto;
    children: TableAccountExpandDto[];
    expanded: boolean;
}