
// enum value represents the chance to pick this from the list, so combat has 2 entries in the list 
// so [e.combat, e.event] becomes [e.combat, e.combat, e.event] because combat = 2 and event = 1

enum e {
  combat = 2, // normal combat
  shop = 1, // trade gold for emojis (or burn emojis with gold)
  fireplace = 1 , // choose between healing and duplicating an emoji
  miniboss = 1  , // combat but monster is from miniboss pool
  boss = 1, // combat but monster is from boss pool
  event = 1, // random event (has many sub-types to be described later)
}

export default { // possible encounter type at specific turn
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
}