export class Hero {
    constructor(
        public _name: string,
        public _health: number, 
        public _armor: number,
        public _speed: number,
        public _energy: number,
        ) {
            this._draftable = true;
            this._boardPositionRow = 0;
            this._boardPositionColumn = 0;
            this._bookReadPosition = 10 //I should probably make a type for bookReadPosition that initiatlizes as void or undefined and then goes 1-9 once drafted.
        }

        _draftable: boolean;
        _boardPositionRow: number;
        _boardPositionColumn: number;
        _bookReadPosition: number;


        public get health(): number {
            return this._health
        }

        public get armor(): number {
            return this._armor
        }
}