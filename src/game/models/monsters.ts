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
  },
  {
    floor: 2,
    monstersPacks: [
      ['Rat', 'Rat', 'Rat'],
      ['Snek', 'Snek', 'Snek'],
      ['Rat', 'Rat', 'Snek'],
      ['Rat', 'Snek', 'Snek'],
    ]
  },
]

export type monster = {
  name: string,
  icon: string,
  maxHealth: (floor:number) => number,
  health: number,
  deck: string[],
  emojisPerTurn: number,
  artifacts: string[],
  attackPower: number,
  blockPower: number,
  block?: number,
}

export const monsters = [
  {
    name: 'Rat',
    icon: '🐀',
    maxHealth: (floor:number) => 10 + floor,
    deck: ['👊','👊','👊','✋'],
    emojisPerTurn: 1, // number of emojis that are casted by this monster each turn
    artifacts: [],
    attackPower: 0,
    blockPower: 0,
  },
  {
    name: 'Snek',
    icon: '🐍',
    maxHealth: (floor:number) => 10 + floor,
    deck: ['👊','👊','✋','✋'],
    emojisPerTurn: 1,
    artifacts: ['🦾'],
    attackPower: 0,
    blockPower: 0,
  },
]