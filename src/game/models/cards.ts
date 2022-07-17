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
    description: 'Your emojis have 2x power this turn',
    effect: (combat: any) => ({
      applyAfter: true,
      // force this emoji effect to be applied after others has been computed for this turn
      self: {  
        attack: combat.self.attack * 2,
        block: combat.self.block * 2,
      },
    }),
  },
]
