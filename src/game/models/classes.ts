import { DeepReadonly } from 'ts-essentials'

export type gameClass = {
  name: string,
  icon: string,
  healthIcon: string,
  health: number,
  deck: string[],
  artifacts: string[],
}

const classes: DeepReadonly<gameClass[]> = [
  {
    name: 'Warrior',
    icon: '🔴',
    healthIcon: '❤️',
    health: 50,
    deck: ['👊','👊','👊','✋','💪'],
    artifacts: ['💖'],
  },
  // below are just ideas
  {
    name: 'Ranger',
    icon: '🟢',
    healthIcon: '💚',
    health: 35,
    deck: ['👊','✋','✋','✋','🧪'],
    artifacts: ['♻️'],
  },
  {
    name: 'Wizard',
    icon: '🔵',
    healthIcon: '💙',
    health: 25,
    deck: ['👊','👊','✋','✋','🔥'],
    artifacts: ['🌙'],
  },
  {
    name: 'Necromancer',
    icon: '🟣',
    healthIcon: '💜',
    health: 30,
    deck: ['👊','✋','✋','💀','💀'],
    artifacts: ['⚰️'],
  },
  {
    name: 'Priest',
    icon: '🟡',
    healthIcon: '💛',
    health: 40,
    deck: ['👊','👊','✋','✋','🙏'],
    artifacts: ['✝️'],
  },
]

export default classes