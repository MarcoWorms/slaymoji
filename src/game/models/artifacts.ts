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
  // artifact ideas
  { description: 'Deal x damage to a random target every turn' },
  { description: 'Win x block every turn' },
  { description: 'Increase gold gained every combat by X' },
  { description: 'Rewards show 1 more option' },
  { description: 'Random Events will no longet be combats' },
  { description: 'Permanently increase attack power by 1' },
  { description: 'Permanently increase block power by 1' },
  { rare: true,description: 'Purge all curse cards from deck, can no longer be cursed' }, // curse cards are emojis that are added to your deck on bad event
  { rare: true, description: 'Cast 1 extra emoji every turn' },
] as artifact[]

export type artifact = {
  icon: string,
  description: string,
  trigger: artifactTriggers,
  cast: (caster, targets) => void,
}
