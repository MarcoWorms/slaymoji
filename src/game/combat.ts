import {MONSTERS, floorMonsterPacks, monster} from './models/monsters.js';
import EMOJIS, { emojiTypes } from './models/emojis.js'
import ARTIFACTS, { artifactTriggers } from './models/artifacts.js'
import CLASSES from './models/classes.js'

// Randomize array in-place using Durstenfeld shuffle algorithm, an optimized version of Fisher-Yate
// lazily stolen from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

const unwrapIcons = (array, dataset) => array.map(icon => dataset.find(entry => entry.icon === icon))
const wrapIcons = (player) => {
  player.deck = player.deck.map(emoji => emoji.icon)
  player.artifacts = player.artifacts.map(artifact => artifact.icon)
  return player
}

// can be overriden on monster and class models
const defaultCombatStatus = { 
  // each stack means it last one turn
  weak: 0, // deal 25% less damage
  vulnerable: 0, // take 25% more damage
  silenced: 0, // skills wont work next turn
  disarmed: 0, // attacks wont work next turn
  stunned: 0, // cant play next turn
  fortified: 0, // block persists next turn
  dazed: 0, // add useless emoji to deck
  // special status
  block: 0, // fully removed on the end of the turn
  attackPower: 0, // lasts the entire floor
  blockPower: 0, // lasts the entire floor
  emojisPerTurn: 1, // emojis cast per turn
  artifacts: [], // artifacts owned
  healthIcon: '🖤', // icon for health
}

export const run = ({ player, floor }) => {

  // get random monster pack for this floor
  const thisFloor = floorMonsterPacks?.find(floorData => floorData?.floor === floor)
  const monstersThisFloor = thisFloor?.monsters?.flatMap(monsterData => {
    return Array.from({ length: monsterData.count }).map(() => {
      shuffleArray(monsterData.allow)
      return monsterData.allow[0]
    })
  })

  // set initial combat state
  let combatState = {
    floor,
    turns: [],
    player: {
      ...defaultCombatStatus,
      ...player,
      // unwrap player deck and artifacts (unwrap = expand string to object)
      deck: unwrapIcons(player.deck, EMOJIS),
      artifacts: unwrapIcons(player.artifacts, ARTIFACTS),
    },
    // unwrap monster pack
    monsters: unwrapIcons(monstersThisFloor, MONSTERS)
      // resolve monster health for this floor
      .map((monster) => ({
        ...defaultCombatStatus,
        ...monster,
        health: monster?.maxHealth(floor),
      }))
      // unwrap monster deck and artifacts
      .map((monster) => ({
        ...monster,
        deck: unwrapIcons(monster.deck, EMOJIS),
        artifacts: unwrapIcons(monster.artifacts, ARTIFACTS),
      }))
  }

  const winConditionMet = ({ player, monsters }) => (
    player.health <= 0
    ||
    monsters.every((monster:monster) => monster.health <= 0)
  )

  // while no one has 0 health we will have another turn, eventually someone has to die (enforced by game-design)
  let turn = 1
  while (!winConditionMet(combatState)) {
    combatState = executeTurn(combatState, turn)
    turn += 1
  }

  // cast player artifacts that has combatWon trigger type
  combatState.player.health > 0
    && combatState.player.artifacts.forEach(artifact => artifact.trigger === artifactTriggers.COMBAT_WON && artifact.cast(player, combatState.monsters))

  const makeLog = combatState => `
Floor ${floor}, Combat ⚔️
Enemies: ${
    combatState.monsters.map(monster => monster.icon).join(' ')
  }${
    combatState.turns.join('\n\n')
  }\n\n${
    true ? 'You won!' : 'You lost!'
  }`

  return combatState.player.health > 0
    ? {
      player: wrapIcons(combatState.player),
      playerWon: true,
      log: makeLog(combatState),
      rewards: {
        gold: 5 + floor,
        pickOneEmoji: Array.from({ length: 3 }).map(() => {
          const clas = CLASSES?.find(clas => clas.name === combatState.player.name)
          return clas?.validEmojis[Math.floor(Math.random() * clas?.validEmojis.length)]
        }),
      }
    }
    : {
      player: wrapIcons(combatState.player),
      playerWon: false,
      log: makeLog(combatState),
    }
}

const castThisTurnAttacks = (caster, targets) => caster.health > 0 && caster.stunned === 0 && caster.disarmed === 0 && caster.deck.slice(0, caster.emojisPerTurn).forEach(emoji => 
  emoji.type === emojiTypes.ATTACK && emoji.cast(caster, targets)
)

const castThisTurnSkills = (caster, targets) => caster.health > 0 && caster.stunned === 0 && caster.silenced === 0 && caster.deck.slice(0, caster.emojisPerTurn).forEach(emoji => 
  emoji.type === emojiTypes.SKILL && emoji.cast(caster, targets)
)

const castThisTurnArtifacts = (caster, targets) => caster.health > 0 && caster.artifacts.forEach(artifact => 
  artifact.trigger === artifactTriggers.EVERY_TURN && artifact.cast(caster, targets)
)

function executeTurn (combatState, turn) {

  const player = combatState.player
  const monsters = combatState.monsters

  // shuffle decks to randomize cards played this turn
  shuffleArray(player.deck)
  monsters.forEach(monster => shuffleArray(monster.deck))

  // casts emojis and artiffact effects for everyone this turn, in order

  castThisTurnSkills(player, monsters)
  monsters.forEach(monster => {
    castThisTurnSkills(monster, [player])
  })

  castThisTurnArtifacts(player, monsters)
  monsters.forEach(monster => {
    castThisTurnArtifacts(monster, [player])
  })

  castThisTurnAttacks(player, monsters)
  monsters.forEach(monster => {
    castThisTurnAttacks(monster, [player])
  })

  // remove block from everyone this turn
  const cleanBlock = (caster) => {
    if (caster.fortified === 0) {
      caster.block = 0
    }
  }
  cleanBlock(player)
  monsters.forEach(cleanBlock)

  const displayEmoji = emoji => '\n  ' + emoji.icon + ' ' + emoji.description

  // TODO: make logs pretty using emojis descriptions
  combatState.turns[turn] = `Turn ${turn}:\n\n${
    player.icon
    + ' ('
    + player.healthIcon
    + player.health
    + '): '
    + ((player.health > 0 && player.artifacts.length > 0)
      ? player.artifacts
        .filter(artifact => artifact.trigger === artifactTriggers.EVERY_TURN)
        .map(displayEmoji)
        .join('')
      : '')
    + player.deck.slice(0, player.emojisPerTurn)
      .map(displayEmoji)
      .join('')
  }\n\n${
    monsters.map(monster =>
      monster.icon
      + ' ('
      + (monster.health > 0 ? monster.healthIcon : '💀')
      + (monster.health > 0 ? monster.health : '')
      + ')'
      + (monster.health > 0 ? ': ' : '')
      + ((monster.health > 0 && monster.artifacts.length > 0)
        ? monster.artifacts
          .map(displayEmoji)
          .join('')
        : '')
      + (monster.health > 0 ? monster.deck.slice(0, monster.emojisPerTurn)
        .map(displayEmoji) : '')
    ).join('\n')
  }`.trim()

  return combatState
}

const mockPlayer = CLASSES.find(clas => clas.name === 'Warrior')

// everything below is test and should be removed later
console.log('deck:', mockPlayer?.deck)
const testCombat1 = run({ player: mockPlayer, floor: 1 })
console.log(testCombat1.log)
console.log(testCombat1.rewards)
console.log('remaining health:', testCombat1.player.health)

testCombat1.player.deck.push(testCombat1?.rewards?.pickOneEmoji?.[Math.floor(Math.random() * testCombat1.rewards.pickOneEmoji.length)]) // simulates a reward picked

console.log('deck:', testCombat1.player.deck)
const testCombat2 = run({ player: testCombat1.player, floor: 2 })
console.log(testCombat2.log)
console.log(testCombat2.rewards)
console.log('remaining health:', testCombat2.player.health)