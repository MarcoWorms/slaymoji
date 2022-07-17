export default [
  {
    icon: '💖',
    description: 'Heals 5 hp after every combat',
    effect: (_combat: any, _floor: any) => ({
      on: 'combat-won',
      self: {
        heal: 5,
      }
    }),
  },
  {
    icon: '🦾',
    description: 'Deal 1 damage to the enemy every turn',
    effect: (combat: any, _floor: any) => ({
      on: 'turn',
      self: {
        attack: combat.self.attack + 1
      }
    }),
  },
]
