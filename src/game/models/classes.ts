import EMOJIS from "./emojis.js"

export type gameClass = {
  name: string,
  icon: string,
  healthIcon: string,
  health: number,
  maxHealth: number,
  deck: string[],
  validEmojis: string[],
  artifacts: string[],
  validArtifacts: string[],
  emojisPerTurn: number,
}

const classes: gameClass[] = [
  {
    name: 'Warrior',
    icon: '👨🏼‍🔧',
    healthIcon: '❤️',
    health: 50,
    maxHealth: 50,
    deck: ['👊','👊','👊','✋','💪'],
    validEmojis: EMOJIS.filter(emoji => !emoji.disableAsLoot).map(emoji => emoji.icon),
    artifacts: ['💖'],
    validArtifacts: ['💖', '🦾'],
    emojisPerTurn: 3,
  },
  // below are just ideas
  {
    name: 'Ranger',
    icon: '🧝🏼',
    healthIcon: '💚',
    health: 35,
    maxHealth: 35,
    deck: ['👊','✋','✋','✋','🧪'],
    validEmojis: [],
    artifacts: ['♻️'],
    validArtifacts: ['♻️'],
    emojisPerTurn: 3,
  },
  {
    name: 'Wizard',
    icon: '🧙🏼',
    healthIcon: '💙',
    health: 25,
    maxHealth: 25,
    deck: ['👊','👊','✋','✋','🔥'],
    validEmojis: [],
    artifacts: ['🌙'],
    validArtifacts: ['🌙'],
    emojisPerTurn: 3,
  },
  {
    name: 'Necromancer',
    icon: '🧙🏼‍♀️',
    healthIcon: '💜',
    health: 30,
    maxHealth: 30,
    deck: ['👊','✋','✋','💀','💀'],
    validEmojis: [],
    artifacts: ['⚰️'],
    validArtifacts: ['⚰️'],
    emojisPerTurn: 3,
  },
  {
    name: 'Priest',
    icon: '🧚🏼',
    healthIcon: '💛',
    health: 40,
    maxHealth: 40,
    deck: ['👊','👊','✋','✋','🙏'],
    validEmojis: [],
    artifacts: ['✝️'],
    validArtifacts: ['✝️'],
    emojisPerTurn: 3,
  },
]

export default classes
