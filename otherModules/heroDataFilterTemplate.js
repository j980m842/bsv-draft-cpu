const heroes = [
    { 
        name: 'Warrior',
        key: 'warrior',
        health: 9,
        armor: 2
    },
    {
        name: 'Ice Mage',
        key: 'iceMage',
        health: 7,
        armor: 1
    },
    {
        name: 'Troll',
        key: 'troll',
        health: 14,
        armor: 0
    }
]




withArmor = heroes.filter(hero => hero.armor > 0)

console.log(withArmor)