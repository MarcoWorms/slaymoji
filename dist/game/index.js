import classes from './models/classes';
export default {
    getClasses: classes,
    getInitialClassState: (className) => classes.find(gameClass => gameClass.name === className),
    generateMonster: (turn) => { },
    generateNextRooms: (turn) => { },
    generateRewards: (className) => { },
    executeCombat: (player, monster) => { },
};
//# sourceMappingURL=index.js.map