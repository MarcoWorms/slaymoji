import {monsters, floorMonsterPacks, monster} from './models/monsters';

const mockPlayer = {
  className: 'Warrior',
  icon: '🔴',
  healthIcon: '❤️',
  health: 50,
  deck: ['👊','👊','👊','✋','💪'],
  artifacts: ['💖'],
}

export const run = (player=mockPlayer, floor:number) => {
  // get random monster pack for this floor
  const monstersThisFloor = floorMonsterPacks[floor].monstersPacks[
    Math.floor(Math.random() * floorMonsterPacks[floor].monstersPacks.length)
  ]

  // set initial combat state
  let combatState = {
    floor,
    player,
    turns: [],
    monsters: monstersThisFloor
      // unwrap monster pack
      .map(monsterName =>
        monsters.find(monster => monster.name === monsterName)
      )
      // resolve monster health for this floor
      .map((monster) => ({
        ...monster,
        health: monster.maxHealth(floor),
      })),
  }

  let turn = 0
  while (!winConditionMet(combatState)) {
    combatState = executeTurn(combatState, turn)
    turn ++
  }

}

function executeTurn (combatState, turn) {
  // each turn result is concatenated in the and for the full combat log
  combatState.turns[turn] = `Turn ${turn}: result`
  return combatState
}

const winConditionMet = ({ player, monsters }) => (
  player.health <= 0
  ||
  monsters.any((monster:monster) => monster.health <= 0)
)