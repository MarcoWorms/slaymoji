const randomTarget = targets => targets[Math.floor(Math.random() * targets.length)]

const dealDamage = (caster, target, damage) => {
  target.health -= Math.max(((damage + caster.attackPower) - target.block), 0)
}

const pickFirstAlive = targets => targets.find(target => target.health > 0)

export enum emojiTypes {
  ATTACK,
  SKILL, // skills of all combat participants are played before attacks
}
const e = emojiTypes

export default [
  {
    icon: '👊',
    description: 'Deal 4 damage to the front enemy',
    type: e.ATTACK,
    cast: (caster, targets) => {
      dealDamage(caster, pickFirstAlive(targets), 4)
    },
  },
  {
    icon: '👏',
    description: 'Deal 2 damage to all enemies',
    type: e.ATTACK,
    cast: (caster, targets) => {
      targets.forEach(target => dealDamage(caster, target, 2))
    },
  },
  {
    icon: '✋',
    description: 'Block 5 damage',
    type: e.SKILL,
    cast: (caster, _targets) => {
      caster.block += 5 + caster.blockPower
    },
  },
  {
    icon: '💪',
    type: e.SKILL,
    description: 'Increase your attack power by 1 until the end of this floor',
    cast: (caster, _targets) => {
      caster.attackPower += 1
    },
  },
  {
    icon: '🦵',
    type: e.SKILL,
    description: 'Increase your block power by 1 until the end of this floor',
    cast: (caster, _targets) => {
      caster.blockPower += 1
    },
  },
]
