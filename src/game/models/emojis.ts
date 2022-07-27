const randomTarget = targets => targets[Math.floor(Math.random() * targets.length)]

export default [
  {
    icon: '👊',
    description: 'Deal 4 damage to the front enemy',
    effect: (caster, targets) => {
      targets[0].health -= 4 + caster.attackPower
    },
  },
  {
    icon: '👏',
    description: 'Deal 2 damage to all enemies',
    effect: (caster, targets) => {
      targets.forEach(target => target.health -= 2 + caster.attackPower)
    },
  }
  {
    icon: '✋',
    description: 'Block 5 damage',
    effect: (caster, targets) => {
      caster.block += 5 + caster.blockPower
    },
  },
  {
    icon: '💪',
    description: 'Increase your attack power by 1 until the end of this floor',
    effect: (caster, targets) => {
      caster.attackPower += 1
    },
  },
  {
    icon: '🦵',
    description: 'Increase your block power by 1 until the end of this floor',
    effect: (caster, targets) => {
      caster.blockPower += 1
    },
  },
]
