import MONSTERS, { floorMonsterPacks, monster } from './models/monsters.js';
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
const wrapIcons = (player) => ({
  ...player,
  deck: player.deck.map(emoji => emoji.icon),
  artifacts: player.artifacts.map(artifact => artifact.icon),
})

// can be overriden on monster and class models
const defaultCombatStatus = { 
  // each stack means it last one turn
  silenced: 0, // skills wont work next turn
  disarmed: 0, // attacks wont work next turn
  stunned: 0, // cant play next turn
  fortified: 0, // block persists next turn
  // special status
  block: 0, // fully removed on the end of the turn
  attackPower: 0, // lasts the entire floor
  blockPower: 0, // lasts the entire floor
  emojisPerTurn: 1, // emojis cast per turn
  artifacts: [], // artifacts owned
  healthIcon: '🖤', // icon for health
  // dev only
  castedThisTurn: false, // used to track for proper logging when killed
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
  const addInitialPowers = player => ({
    ...player,
    initialAttackPower: player.attackPower,
    initialBlockPower: player.blockPower,
  })
  // set initial combat state
  let combatState = {
    floor,
    turns: [],
    player: addInitialPowers({
      ...defaultCombatStatus,
      ...player,
      // unwrap player deck and artifacts (unwrap = expand string to object)
      deck: unwrapIcons(player.deck, EMOJIS),
      artifacts: unwrapIcons(player.artifacts, ARTIFACTS),
    }),
    // unwrap monster pack
    monsters: unwrapIcons(monstersThisFloor, MONSTERS)
      // resolve monster health for this floor
      .map((monster) => ({
        ...defaultCombatStatus,
        ...monster,
        health: monster?.getMaxHealth(floor),
        maxHealth: monster?.getMaxHealth(floor),
      }))
      // unwrap monster deck and artifacts
      .map((monster) => ({
        ...monster,
        deck: unwrapIcons(monster.deck, EMOJIS),
        artifacts: unwrapIcons(monster.artifacts, ARTIFACTS),
      })),
    initialMonsters: null,
  }
  combatState.initialMonsters = combatState.monsters.slice()

  const playerOrAllMonstersDied = ({ player, monsters }) => (
    player.health <= 0
    ||
    monsters.every((monster:monster) => monster.health <= 0)
  )

  // while no one has 0 health we will have another turn, eventually someone has to die (enforced by game-design)
  let turn = 1
  while (!playerOrAllMonstersDied(combatState)) {
    combatState = executeTurn(combatState, turn)
    turn += 1
  }
  // cast player artifacts that has combatWon trigger type
  combatState.player.health > 0
  && combatState.player.artifacts.forEach(artifact => artifact.trigger === artifactTriggers.COMBAT_WON && artifact.cast(combatState.player, combatState.monsters))

  // return attack and block power to their initial values
  combatState.player.attackPower = combatState.player.initialAttackPower
  combatState.player.blockPower = combatState.player.initialBlockPower

  const makeLog = combatState => `Floor ${floor}, Combat ⚔️\n\nYou${
    ' ('
    + player.healthIcon
    + player.health
    + ') '
    + player.artifacts.join('')
    + player.deck.sort().join('')
  }\n\nEnemies:\n${
    combatState.initialMonsters.map(monster => 
      monster.icon
      + ' ('
      + monster.healthIcon
      + monster?.getMaxHealth(floor)
      + ') '
      + monster.artifacts.map(emoji => emoji.icon).join('')
      + monster.deck.map(emoji => emoji.icon).sort().join('')
    ).join('\n')
  }${
    combatState.turns.join('\n\n')
  }\n\n${
    combatState.player.health > 0 ? 'You won!' : 'You lost!'
  }\n\n${
    combatState.player.artifacts.filter(artifact => artifact.trigger === artifactTriggers.COMBAT_WON)
      .map(artifact =>  artifact.icon + ' ' + artifact.description(combatState.player)).join('\n')
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

const castThisTurnAttacks = (caster, targets) => (caster.health > 0 && caster.stunned === 0 && caster.disarmed === 0) ? caster.deck.slice(0, caster.emojisPerTurn).forEach(emoji => 
  emoji.type === emojiTypes.ATTACK && emoji.cast(caster, targets)
) : true

const castThisTurnSkills = (caster, targets) => (caster.health > 0 && caster.stunned === 0 && caster.silenced === 0) ? caster.deck.slice(0, caster.emojisPerTurn).forEach(emoji => 
  emoji.type === emojiTypes.SKILL && emoji.cast(caster, targets)
) : true

const castThisTurnArtifacts = (caster, targets) => (caster.health > 0) ? caster.artifacts.forEach(artifact => 
  artifact.trigger === artifactTriggers.EVERY_TURN && artifact.cast(caster, targets)
) : true

function executeTurn (combatState, turn) {

  const player = combatState.player
  const monsters = combatState.monsters

  // shuffle decks to randomize cards played this turn
  shuffleArray(player.deck)
  monsters.forEach(monster => shuffleArray(monster.deck))

  monsters.forEach(monster => {
      monster.castedThisTurn = []
      monster.castedArtifactsThisTurn = []
  })

  // casts emojis and artiffact effects for everyone this turn, in order

  castThisTurnSkills(player, monsters)
  monsters.forEach(monster => {
    if (!castThisTurnSkills(monster, [player])) {
      monster.castedThisTurn = monster.castedThisTurn.concat(
        monster.deck.slice(0, monster.emojisPerTurn)
          .filter(emoji => emoji.type === emojiTypes.SKILL)
      )
    }
  })

  castThisTurnArtifacts(player, monsters)
  monsters.forEach(monster => {
    if (!castThisTurnArtifacts(monster, [player])) {
      monster.castedArtifactsThisTurn = monster.artifacts
        .filter(artifact => artifact.trigger === artifactTriggers.EVERY_TURN)
    }
  })

  castThisTurnAttacks(player, monsters)
  monsters.forEach(monster => {
    if (!castThisTurnAttacks(monster, [player])) {
      monster.castedThisTurn = monster.castedThisTurn.concat(
        monster.deck.slice(0, monster.emojisPerTurn)
          .filter(emoji => emoji.type === emojiTypes.ATTACK)
      )
    }
  })

  // remove block from everyone this turn
  const cleanBlockAndStatus = (caster) => {
    if (caster.fortified === 0) {
      caster.block = 0
    }
    if (caster.weak > 0) {
      caster.weak -= 1
    }
    if (caster.vulnerable > 0) {
      caster.vulnerable -= 1
    }
    if (caster.silenced > 0) {
      caster.silenced -= 1
    }
    if (caster.disarmed > 0) {
      caster.disarmed -= 1
    }
    if (caster.stunned > 0) {
      caster.stunned -= 1
    }
    if (caster.fortified > 0) {
      caster.fortified -= 1
    }
  }
  cleanBlockAndStatus(player)
  monsters.forEach(cleanBlockAndStatus)

  const displayEmoji = (emoji, caster) => '\n  ' + emoji.icon + ' ' + emoji.description(caster)

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
        .map(artifact => displayEmoji(artifact, player))
        .join('')
      : '')
    + player.deck.slice(0, player.emojisPerTurn)
      .map(emoji => displayEmoji(emoji, player))
      .join('')
  }\n\n${
    monsters.map(monster =>
      monster.icon
      + ' ('
      + (monster.health > 0 ? monster.healthIcon : '💀')
      + (monster.health > 0 ? monster.health : '')
      + ')'
      + (monster.health > 0 ? ': ' : '')
      + ((monster.castedArtifactsThisTurn.length > 0)
        ? monster.castedArtifactsThisTurn.map(artifact => displayEmoji(artifact, monster)).join('')
        : '')
      + (monster.castedThisTurn.length > 0 ? monster.deck.slice(0, monster.emojisPerTurn)
        .map(emoji => displayEmoji(emoji, monster)) : '')
    ).join('\n')
  }`.trim()

  return combatState
}

const mockPlayer = CLASSES.find(clas => clas.name === 'Warrior')

// everything below is test and should be removed later
const testCombat1 = run({ player: mockPlayer, floor: 1 })
console.log(testCombat1.log)
console.log(testCombat1.rewards)
console.log('player health:', testCombat1.player.health)

testCombat1.player.deck.push(testCombat1?.rewards?.pickOneEmoji?.[Math.floor(Math.random() * testCombat1.rewards.pickOneEmoji.length)]) // simulates a reward picked

const testCombat2 = run({ player: testCombat1.player, floor: 2 })
console.log(testCombat2.log)
console.log(testCombat2.rewards)
console.log('player health:', testCombat2.player.health)