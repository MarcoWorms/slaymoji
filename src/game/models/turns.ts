enum encounter {
  combat, // normal combat
  shop, // trade gold for emojis (or burn emojis with gold)
  fireplace, // choose between healing and duplicating an emoji
  miniboss, // combat but monster is from miniboss pool
  boss, // combat but monster is from boss pool
  event, // random event (has many sub-types to be described later)
}

export default { // possible encounter type at specific turn
  1: [encounter.combat],
  2: [encounter.combat, encounter.event],
  3: [encounter.combat, encounter.event, encounter.fireplace],
  4: [encounter.combat, encounter.event, encounter.fireplace],
  5: [encounter.combat, encounter.miniboss],
}