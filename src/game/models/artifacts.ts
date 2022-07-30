export enum artifactTriggers {
  COMBAT_WON,
  EVERY_TURN,
}
const t = artifactTriggers

export default [
  {
    icon: '💖',
    description: 'Heals 5 hp after every combat',
    trigger: t.COMBAT_WON,
    cast: (caster, targets) => {
      caster.health += 5
    }
  },
  {
    icon: '🦾',
    description: 'Deal 1 damage to the all enemies every turn',
    trigger: t.EVERY_TURN,
    cast: (caster, targets) => {
      targets.forEach(target => target.health -= 1)
    }
  },
] as artifact[]

export type artifact {
  icon: string,
  description: string,
  trigger: artifactTriggers,
  cast: (caster, targets) => void,
}
