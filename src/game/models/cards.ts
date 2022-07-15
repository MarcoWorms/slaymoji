export default [
  {
    icon: '👊',
    description: 'Deal 2 damage',
    effect: (turn) => ({
      self: {
        attack: turn.self.attack + 2,
      }
    }),
  },
  {
    icon: '✋',
    description: 'Block 6 damage',
    effect: (turn) => ({
      self: {
        block: turn.self.block + 6,
      }
    }),
  },
  {
    icon: '💪',
    description: 'Your emojis have 2x power this turn',
    effect: (turn) => ({
      applyAfter: true,
      // force this emoji effect to be applied after others has been computed for this turn
      self: {  
        attack: turn.self.attack * 2,
        block: turn.self.block * 2,
      },
    }),
  },
]