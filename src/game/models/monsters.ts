export const healthIcon =  '🖤'

export default [
  {
    name: 'Rat',
    icon: '🐀',
    health: (floor:number) => 20 + floor,
    deck: ['👊','👊','👊','✋'],
    artifacts: [''],
  },
  {
    name: 'Snek',
    icon: '🐍',
    health: (floor:number) => 30 + floor,
    deck: ['👊','👊','✋','✋'],
    artifacts: ['🦾'],
  },
]