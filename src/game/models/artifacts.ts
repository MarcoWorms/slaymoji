export default [
  {
    icon: '💖',
    description: 'Heals 5 hp after every combat',
    effect: (combat, floor) => ({
      on: 'combat-won',
      self: {
        heal: 5,
      }
    }),
  },
  {
    icon: '🦾',
    description: 'Deal 1 damage to the enemy every turn',
    effect: (combat, floor) => ({
      on: 'turn',
      self: {
        attack: combat.self.attack + 1
      }
    }),
  },
]