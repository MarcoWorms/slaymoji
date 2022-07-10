import { gameClass } from './models/classes';
declare const _default: {
    getClasses: readonly {
        readonly name: string;
        readonly icon: string;
        readonly healthIcon: string;
        readonly health: number;
        readonly deck: readonly string[];
        readonly artifacts: readonly string[];
    }[];
    getInitialClassState: (className: string) => {
        readonly name: string;
        readonly icon: string;
        readonly healthIcon: string;
        readonly health: number;
        readonly deck: readonly string[];
        readonly artifacts: readonly string[];
    } | undefined;
    generateMonster: (turn: number) => void;
    generateNextRooms: (turn: number) => void;
    generateRewards: (className: string) => void;
    executeCombat: (player: gameClass, monster: gameClass) => void;
};
export default _default;
//# sourceMappingURL=index.d.ts.map