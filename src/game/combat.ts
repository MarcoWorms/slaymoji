import {monsters, floorMonsterPacks, monster} from './models/monsters';
import EMOJIS from './models/emojis'
import ARTIFACTS from './models/artifacts'

const mockPlayer = {
  className: 'Warrior',
  icon: '🔴',
  healthIcon: '❤️',
  health: 50,
  deck: ['👊','👊','👊','✋','💪'],
  artifacts: ['💖'],
  attackPower: 0,
  blockPower: 0,
}

const unwrapIcons = (array, dataset) => array.map(icon => dataset.find(entry => entry.icon === icon))

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
    playerWon: true, // TODO: check who won on win condition
    log: `Enemies: ${
      combatState.monsters.map(monster => monster.icon).join(' ')
    }\n\n${
      combatState.turns.join('\n')
    }\n\n${
      true ? 'You won!' : 'You lost!'
    }`,
  }

}

function executeTurn (combatState, turn) {
  combatState.turns[turn] = `Turn ${turn}: result`
  return combatState
}

const winConditionMet = ({ player, monsters }) => (
  player.health <= 0
  ||
  monsters.any((monster:monster) => monster.health <= 0)
)