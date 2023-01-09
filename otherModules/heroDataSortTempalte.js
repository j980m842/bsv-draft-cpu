const heroes = [
    { 
        name: 'Warrior',
        key: 'warrior',
        health: 9
    },
    {
        name: 'Ice Mage',
        key: 'iceMage',
        health: 7
    },
    {
        name: 'Troll',
        key: 'troll',
        health: 14
    }
]




highestHealth = heroes.sort((a,b) => {
    if (a.health < b.health) return 1
    if (a.health > b.health) return -1
    return 0
})

console.log(highestHealth[0].name)