var e;
(function (e) {
    e[e["combat"] = 2] = "combat";
    e[e["shop"] = 1] = "shop";
    e[e["fireplace"] = 1] = "fireplace";
    e[e["miniboss"] = 1] = "miniboss";
    e[e["boss"] = 1] = "boss";
    e[e["event"] = 1] = "event";
})(e || (e = {}));
export default {
    1: [e.combat],
    2: [e.combat, e.event],
    3: [e.combat, e.event, e.fireplace],
    4: [e.combat, e.event, e.fireplace, e.shop],
    5: [e.miniboss],
    6: [e.combat, e.event, e.fireplace, e.shop],
    7: [e.combat, e.event, e.fireplace, e.shop],
    8: [e.combat, e.event, e.fireplace, e.shop],
    9: [e.combat, e.event, e.fireplace, e.shop],
    10: [e.miniboss],
    11: [e.combat, e.event, e.fireplace, e.shop],
    12: [e.combat, e.event, e.fireplace, e.shop],
    13: [e.combat, e.event, e.fireplace, e.shop],
    14: [e.combat, e.event, e.fireplace, e.shop],
    15: [e.boss],
};
//# sourceMappingURL=turns.js.map