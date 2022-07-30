enum triggerTypes {
  combatWon,
  everyTurn,
}
const t = triggerTypes

export default [
  {
    icon: '💖',
    description: 'Heals 5 hp after every combat',
    trigger: t.combatWon,
    cast: (caster, targets) => {
      caster.health += 5
    }
  },
  {
    icon: '🦾',
    description: 'Deal 1 damage to the all enemies every turn',
    trigger: t.everyTurn,
    cast: (caster, targets) => {
      targets.forEach(target => target.health -= 1)
    }
  },
]
