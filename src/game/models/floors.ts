
// enum value represents the chance to pick this from the list, so combat has 2 entries in the list 
// so [f.combat, f.event] becomes [f.combat, f.combat, f.event] because combat = 2 and event = 1

enum floorTypes {
  combat = 4, // normal combat
  shop = 1, // trade gold for emojis (or burn emojis with gold)
  rest = 1 , // choose between healing and duplicating an emoji
  miniboss = 1  , // combat but monster is from miniboss pool
  event = 2, // random event (has many sub-types to be described later, can also be combat or miniboss)
  boss, // combat but monster is from boss pool, has fixed turns so no chance factor needed
}
const f = floorTypes

const defaultTurn = [f.combat, f.event, f.rest, f.shop, f.miniboss] 

export const floors = { // possible floor types at specific turn
  1: [f.combat],
  2: [f.combat, f.event], 
  3: [f.combat, f.event, f.shop],
  4: [f.combat, f.event, f.shop, f.rest],
  5: defaultTurn,
  6: defaultTurn,
  7: defaultTurn,
  8: defaultTurn,
  9: defaultTurn,
  10: defaultTurn,
  11: defaultTurn,
  12: defaultTurn,
  13: defaultTurn,
  14: [f.rest],
  15: [f.boss], // boss fight is the harderst moment here, since player heals after it we prevent resting for the next couple floors
  16: [f.combat],
  17: [f.combat, f.event],
  18: [f.combat, f.event, f.shop],
  19: [f.combat, f.event, f.shop, f.rest],
  20: defaultTurn,
  21: defaultTurn,
  22: defaultTurn, 
  23: defaultTurn, 
  24: defaultTurn, 
  25: defaultTurn, 
  26: defaultTurn, 
  27: defaultTurn, 
  28: defaultTurn, 
  29: [f.rest],
  30: [f.boss], // repeat the same logic for boss fight on turn 15
  31: [f.combat],
  32: [f.combat, f.event],
  33: [f.combat, f.event, f.shop],
  34: [f.combat, f.event, f.shop, f.rest],
  35: defaultTurn,
  36: defaultTurn,
  37: defaultTurn, 
  38: defaultTurn, 
  39: defaultTurn, 
  40: defaultTurn, 
  41: defaultTurn, 
  42: defaultTurn, 
  43: defaultTurn, 
  44: [f.rest], 
  45: [f.boss], 
}