export enum artifactTriggers {
  COMBAT_WON,
  EVERY_TURN,
}
const t = artifactTriggers

const dealDamageWithoutAttackPower = (_caster, target, damage) => {
  const dmgAfterBlock = damage - target.block
  if (dmgAfterBlock > 0) {
    target.health -= dmgAfterBlock
  } else {
    target.block -= damage
  }
}

export default [
  {
    icon: '💖',
    description: 'Heals 5 hp after every combat',
    trigger: t.COMBAT_WON,
    cast: (caster, _targets) => {
      caster.health += 5
    }
  },
  {
    icon: '🦾',
    description: 'Deal 1 damage to the all enemies every turn',
    trigger: t.EVERY_TURN,
    cast: (caster, targets) => {
      targets.forEach(target => dealDamageWithoutAttackPower(caster, target, 1))
    }
  },
] as artifact[]

export type artifact = {
  icon: string,
  description: string,
  trigger: artifactTriggers,
  cast: (caster, targets) => void,
}
