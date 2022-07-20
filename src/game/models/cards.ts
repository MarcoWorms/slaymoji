const props = [
  {
    name: 'Exhaust',
    description: 'After played the emoji becomes unplayable until the end of the current floor',
  }
]

export default [
  {
    icon: '👊',
    description: 'Deal 2 damage',
    effect: (combat: any) => ({
      self: {
        attack: combat.self.attack + 2,
      }
    }),
  },
  {
    icon: '✋',
    description: 'Block 6 damage',
    effect: (combat: any) => ({
      self: {
        block: combat.self.block + 6,
      }
    }),
  },
  {
    icon: '💪',
    props: ['Exhaust'],
    description: 'Increase your attack power by 1 until the end of this floor',
    effect: (combat: any) => ({
      applyAfter: true,
      // force this emoji effect to be applied after others has been computed for this turn
      self: {  
        attack_power: combat.self.attack_power + 1,
      },
    }),
  },
]
