export default [
    {
        icon: '💖',
        description: 'Heals 5 hp after every combat',
        effect: (_combat, _floor) => ({
            on: 'combat-won',
            self: {
                heal: 5,
            }
        }),
    },
    {
        icon: '🦾',
        description: 'Deal 1 damage to the enemy every turn',
        effect: (combat, _floor) => ({
            on: 'turn',
            self: {
                attack: combat.self.attack + 1
            }
        }),
    },
];
//# sourceMappingURL=artifacts.js.map