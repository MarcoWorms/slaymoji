import {monsters, floorMonsterPacks, monster} from './models/monsters.js';
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

export const run = ({ player, floor }) => {

  // get random monster pack for this floor
  const thisFloor = floorMonsterPacks?.find(floorData => floorData?.floor === floor)
  const monstersThisFloor = thisFloor?.monstersPacks?.[
    // @ts-ignore
    Math.floor(Math.random() * thisFloor?.monstersPacks?.length)
  ]

  // set initial combat state
  let combatState = {
    floor,
    turns: [],
    player: {
      ...player,
      // unwrap player deck and artifacts (unwrap = expand string to object)
      deck: unwrapIcons(player.deck, EMOJIS),
      artifacts: unwrapIcons(player.artifacts, ARTIFACTS),
      block: 0,
    },
    monsters: monstersThisFloor
    // unwrap monster pack
      ?.map(monsterName =>
        monsters.find(monster => monster.name === monsterName)
      )
      // resolve monster health for this floor
      .map((monster) => ({
        ...monster,
        health: monster?.maxHealth(floor),
      }))
      // unwrap monster deck and artifacts
      .map((monster) => ({
        ...monster,
        deck: unwrapIcons(monster.deck, EMOJIS),
        artifacts: unwrapIcons(monster.artifacts, ARTIFACTS),
        block: 0,
      })),
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
  combatState.player.attackPower = 0
  combatState.player.blockPower = 0

  // cast player artifacts that has combatWon trigger type
  combatState.player.health > 0
    && combatState.player.artifacts.forEach(artifact => artifact.trigger === artifactTriggers.COMBAT_WON && artifact.cast(player, monsters))

  const makeLog = combatState => `Floor ${floor}, Enemies: ${
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
        pickOneEmoji: Array.from({ length: 3 }).map(() =>
          CLASSES
            ?.find(clas => clas.name === combatState.player.className)
            ?.validEmojis[Math.floor(Math.random() * EMOJIS.length)]
        ),
      }
    }
    : {
      player: wrapIcons(combatState.player),
      playerWon: false,
      log: makeLog(combatState),
    }
}

const castThisTurnAttacks = (caster, targets) => caster.health > 0 && caster.deck.slice(0, caster.emojisPerTurn).forEach(emoji => 
  emoji.type === emojiTypes.ATTACK && emoji.cast(caster, targets)
)

const castThisTurnSkills = (caster, targets) => caster.health > 0 && caster.deck.slice(0, caster.emojisPerTurn).forEach(emoji => 
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

  // cleans block for next turn
  player.block = 0
  monsters.forEach(monster => {
    monster.block = 0
  })

  // TODO: make logs pretty using emojis descriptions
  combatState.turns[turn] = `Turn ${turn}:\n\n${
    player.icon
    + ' ('
    + player.health
    + '): '
    + player.deck.slice(0, player.emojisPerTurn).map(emoji => emoji.icon)
  }\n\n${
    monsters.map(monster =>
      monster.icon
      + ' ('
      + (monster.health > 0 ? monster.health : 'dead')
      + ')'
      + (monster.health > 0 ? ': ' : '')
      + ((monster.health > 0 && monster.artifacts.length > 0) ? monster.artifacts.map(artifact => artifact.icon).join(' ') + ' ' : '')
      + (monster.health > 0 ? monster.deck.slice(0, monster.emojisPerTurn).map(emoji => emoji.icon) : '')
    ).join('\n')
  }`.trim()

  return combatState
}

const mockPlayer = {
  className: 'Warrior',
  icon: '🔴',
  healthIcon: '❤️',
  health: 50,
  deck: ['👊','👊','👊','✋','💪'],
  emojisPerTurn: 3,
  artifacts: ['💖'],
  attackPower: 0,
  blockPower: 0,
}

// everything below is test and should be removed later
console.log('deck:', mockPlayer.deck)
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