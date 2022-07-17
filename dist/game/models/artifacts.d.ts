declare const _default: ({
    icon: string;
    description: string;
    effect: (_combat: any, _floor: any) => {
        on: string;
        self: {
            heal: number;
        };
    };
} | {
    icon: string;
    description: string;
    effect: (combat: any, _floor: any) => {
        on: string;
        self: {
            attack: any;
        };
    };
})[];
export default _default;
//# sourceMappingURL=artifacts.d.ts.map