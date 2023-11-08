import { StandardAccountDto } from "./standard-account.dto";

export interface TableAccountExpandLevelDto {
    data: StandardAccountDto;
    children: TableAccountExpandLevelDto[];
    expanded: boolean;
    parent?: TableAccountExpandLevelDto;
}