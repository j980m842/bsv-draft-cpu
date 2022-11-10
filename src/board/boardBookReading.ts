import { BoardColumn } from "./boardColumn";
import { BoardPosition } from "./boardPosition";
import { BoardRow } from "./boardRow";

export class BoardBookReading {
    private static numberOfColumns = 3;

    public static rank(row: BoardRow, column: BoardColumn) {
        return column + row * this.numberOfColumns;
    }

    public static traverse(visitHandler: (position: BoardPosition) => void) {
        for (let row = BoardRow.Front; row <= BoardRow.Back; row++) {
            for (let column = BoardColumn.Left; column <= BoardColumn.Right; column++) {
                visitHandler({
                    column: column,
                    row: row,
                });
            }
        }
    }
}
