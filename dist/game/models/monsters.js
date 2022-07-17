export const healthIcon = '🖤';
export default [
    {
        name: 'Rat',
        icon: '🐀',
        health: (floor) => 20 + floor,
        deck: ['👊', '👊', '👊', '✋'],
        artifacts: [''],
    },
    {
        name: 'Snek',
        icon: '🐍',
        health: (floor) => 30 + floor,
        deck: ['👊', '👊', '✋', '✋'],
        artifacts: ['🦾'],
    },
];
//# sourceMappingURL=monsters.js.map