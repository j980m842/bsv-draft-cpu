import { BoardColumn } from "./boardColumn";
import { BoardRow } from "./boardRow";

export class BoardInversion {
    public static invertRow(row: BoardRow): BoardRow {
        return BoardRow.Back - row;
    }

    public static invertColumn(column: BoardColumn): BoardColumn {
        return BoardColumn.Right - column;
    }
}
