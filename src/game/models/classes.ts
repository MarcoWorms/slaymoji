export type gameClass = {
  name: string,
  icon: string,
  healthIcon: string,
  health: number,
  deck: string[],
  validEmojis: string[],
  artifacts: string[],
  validArtifacts: string[],
}

const classes: gameClass[] = [
  {
    name: 'Warrior',
    icon: '🔴',
    healthIcon: '❤️',
    health: 50,
    deck: ['👊','👊','👊','✋','💪'],
    validEmojis: ['👊','👏','✋','💪','🦵'],
    artifacts: ['💖'],
    validArtifacts: ['💖', '🦾'],
  },
  // below are just ideas
  {
    name: 'Ranger',
    icon: '🟢',
    healthIcon: '💚',
    health: 35,
    deck: ['👊','✋','✋','✋','🧪'],
    validEmojis: [],
    artifacts: ['♻️'],
    validArtifacts: ['♻️'],
  },
  {
    name: 'Wizard',
    icon: '🔵',
    healthIcon: '💙',
    health: 25,
    deck: ['👊','👊','✋','✋','🔥'],
    validEmojis: [],
    artifacts: ['🌙'],
    validArtifacts: ['🌙'],
  },
  {
    name: 'Necromancer',
    icon: '🟣',
    healthIcon: '💜',
    health: 30,
    deck: ['👊','✋','✋','💀','💀'],
    validEmojis: [],
    artifacts: ['⚰️'],
    validArtifacts: ['⚰️'],
  },
  {
    name: 'Priest',
    icon: '🟡',
    healthIcon: '💛',
    health: 40,
    deck: ['👊','👊','✋','✋','🙏'],
    validEmojis: [],
    artifacts: ['✝️'],
    validArtifacts: ['✝️'],
  },
]

export default classes