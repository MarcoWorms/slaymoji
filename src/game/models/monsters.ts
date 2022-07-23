export const healthIcon =  '🖤'

// turn packs contains group of enemies that can be used to serve a floor combat.
export const floorMonsterPacks = [
  {
    floor: 1,
    monstersPacks: [ // in this example, floor 1 combat can be one of the 3 below:
      ['Rat', 'Rat'],
      ['Snek', 'Snek'],
      ['Rat', 'Snek'],
    ]
  }
]

export const monsters = [
  {
    name: 'Rat',
    icon: '🐀',
    health: (floor:number) => 10 + floor,
    deck: ['👊','👊','👊','✋'],
    artifacts: [''],
  },
  {
    name: 'Sneak',
    icon: '🐍',
    health: (floor:number) => 30 + floor,
    deck: ['👊','👊','✋','✋'],
    artifacts: ['🦾'],
  },
]
