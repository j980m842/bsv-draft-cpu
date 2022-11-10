export interface EventType {
    readonly event: String
}

export type Event =
    'initiateDraft' |
    'yourPick'      |
    'yourBan'       |
    'enemyPick'     |
    'enemyBan'


