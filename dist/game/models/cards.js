export default [
    {
        icon: '👊',
        description: 'Deal 2 damage',
        effect: (combat) => ({
            self: {
                attack: combat.self.attack + 2,
            }
        }),
    },
    {
        icon: '✋',
        description: 'Block 6 damage',
        effect: (combat) => ({
            self: {
                block: combat.self.block + 6,
            }
        }),
    },
    {
        icon: '💪',
        description: 'Your emojis have 2x power this turn',
        effect: (combat) => ({
            applyAfter: true,
            self: {
                attack: combat.self.attack * 2,
                block: combat.self.block * 2,
            },
        }),
    },
];
//# sourceMappingURL=cards.js.map