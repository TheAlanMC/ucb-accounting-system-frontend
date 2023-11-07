import { StandardAccountDto } from './standar-account.dto';

export interface TableAccountExpandDto {
    data: StandardAccountDto;
    children: TableAccountExpandDto[];
    expanded: boolean;
}