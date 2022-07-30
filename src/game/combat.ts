import {monsters, floorMonsterPacks, monster} from './models/monsters';
import EMOJIS from './models/emojis'
import ARTIFACTS from './models/artifacts'
import CLASSES from './models/classes'

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

export const run = (player=mockPlayer, floor:number) => {
  // get random monster pack for this floor
  const monstersThisFloor = floorMonsterPacks[floor].monstersPacks[
    Math.floor(Math.random() * floorMonsterPacks[floor].monstersPacks.length)
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
    },
    monsters: monstersThisFloor
      // unwrap monster pack
      .map(monsterName =>
        monsters.find(monster => monster.name === monsterName)
      )
      // resolve monster health for this floor
      .map((monster) => ({
        ...monster,
        health: monster.maxHealth(floor),
      }))
      // unwrap monster deck and artifacts
      .map((monster) => ({
        ...monster,
        deck: unwrapIcons(monster.deck, EMOJIS),
        artifacts: unwrapIcons(monster.artifacts, ARTIFACTS),
      })),
  }

  let turn = 0
  while (!winConditionMet(combatState)) {
    combatState = executeTurn(combatState, turn)
    turn += 1
  }

  return {
    player,
    playerWon: player.health > 0,
    log: `Enemies: ${
      combatState.monsters.map(monster => monster.icon).join(' ')
    }\n\n${
      combatState.turns.join('\n\n')
    }\n\n${
      true ? 'You won!' : 'You lost!'
    }`,
  }

}

const castThisTurnEmojis = (caster, targets) => caster.deck.slice(0, caster.emojisPerTurn).forEach(emoji => emoji.cast(caster, targets))  

function executeTurn (combatState, turn) {

  const player = combatState.player
  const monsters = combatState.monsters

  // shuffle decks to randomize cards played this turn
  shuffleArray(player.deck)
  monsters.forEach(monster => shuffleArray(monster.deck))

  // casts emojis for everyone this turn
  castThisTurnEmojis(player, monsters)
  monsters.forEach(monster => {
    castThisTurnEmojis(monster, [player])
  })

  // TODO: make logs pretty using emojis descriptions
  combatState.turns[turn] = `Turn ${turn}:\n\n${JSON.stringify(player)}\n\n${JSON.stringify(monsters)}`
  return combatState
}

const winConditionMet = ({ player, monsters }) => (
  player.health <= 0
  ||
  monsters.any((monster:monster) => monster.health <= 0)
)