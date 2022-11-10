import { BoardColumn } from "./boardColumn";
import { BoardRow } from "./boardRow";

export interface BoardPosition {
    readonly column: BoardColumn;
    readonly row: BoardRow;
}
